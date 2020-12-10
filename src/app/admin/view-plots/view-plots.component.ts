import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPlotsComponent } from '../add-plots/add-plots.component';
import { PlotCategoriesComponent } from '../plot-categories/plot-categories.component';
import { AddLandMeasuringComponent } from '../add-land-measuring/add-land-measuring.component';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ViewPlotDetailModalComponent } from '../view-plot-detail-modal/view-plot-detail-modal.component';
import { InstallmentComponent } from '../installment/installment.component';

@Component({
  selector: 'app-view-plots',
  templateUrl: './view-plots.component.html',
  styleUrls: ['./view-plots.component.css']
})
export class ViewPlotsComponent implements OnInit {
  public plotsList = [];
  public customerList = [];
  public isLoaded = false;
  public date = new Date();
  public isResale = false;
  public isLoading = false;
  public salePlotItem = null;
  public transferHistory = []
  public resalePayload = {
    customerId: null,
    purchaseDate: new Date(),
    modifiedBy: null,
    plotId: null,
    modifiedOn: new Date(),
    purchaseFrom: null
  }
  public authDealerList = [];
  public selectedDealer = null;
  public salePayload = {
    customerId: null,
    percentage: null,
    dealerId: null,
    date: new Date(),
    plotId: null
  }

  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 10000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };
  modalRef: BsModalRef;

  constructor(private adminService: AdminService, private modelService: BsModalService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    // this.getLandLord();
    this.getPlots();
  }
  getPlots() {
    this.isLoaded = true;
    this.adminService.getAllPlots().then(res => {
      this.plotsList = res as any[];
      console.log(this.plotsList)
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    })
  }
  openModel() {
    const modelRef = this.modalService.open(AddPlotsComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modelRef.result.then((data) => {
      if (data) {
        this.getPlots();
      }
    });
  }
  openModelPlotCategories() {
    const modelRef = this.modalService.open(PlotCategoriesComponent, { size: 'lg', backdrop: 'static', keyboard: false });
  }
  openInstallment(item) {
    const modelRef = this.modalService.open(InstallmentComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modelRef.componentInstance.installment = item.installments;
    modelRef.componentInstance.plotId = item.id;
    modelRef.componentInstance.isplotSide = true;
    modelRef.result.then((data) => {
      if (data) {
        this.getPlots();
      }
    });
  }
  openSalePlot() {
    // this.resalePayload.purchaseData = ''
    if(!this.isResale){
    this.resalePayload.customerId = this.salePayload.customerId;
    this.resalePayload.modifiedBy = localStorage.getItem('userId');
    this.resalePayload.purchaseFrom = 'Town Management';
    this.salePlotItem.TransferHistory.push(this.resalePayload);
    this.isLoading = true;
    this.salePlotItem.customerId = this.salePayload.customerId;
    this.salePlotItem.saleDate = this.salePayload.date;
    this.salePlotItem.plotStatus = 'Sold';
    this.salePlotItem.isSold = true;
    this.salePlotItem.percentage = this.salePayload.percentage;
    this.salePlotItem.dealerId = this.salePayload.dealerId;
    this.adminService.salePlot(this.salePlotItem).then(res => {
      this.plotsList = res as any[];
      this.resalePayload.customerId = null;
      this.resalePayload.purchaseDate = new Date();
      this.resalePayload.modifiedBy = null;
      this.resalePayload.plotId = null;
      this.resalePayload.modifiedOn = new Date();
      this.resalePayload.purchaseFrom = null;
      this.isLoading = false;
      this.modalRef.hide();
      this.getPlots();
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  } else {
    this.reSalePlot();
  }
}
  reSalePlot(){
    this.isLoading = true;
    const payload = {
      data:this.resalePayload
    }
    this.resalePayload.purchaseFrom = this.salePlotItem.customerId;
    this.adminService.resalePlot(payload).then(res => {
      this.isLoading = false;
      this.modalRef.hide();
    }) .catch(err =>{
      console.log(err)
      this.isLoading = false;
    })
  }
  getAuthDealers() {
    // this.isLoaded = true;
    this.adminService.getAllAuthDealers().then(res => {
      this.authDealerList = res as any[];
      // this.isLoaded = false;
      console.log(this.authDealerList);
    }).catch(err => {
      console.log(err);
      // this.isLoaded = false;
    });
  }
  openModelMeasurement() {
    const modelRef = this.modalService.open(AddLandMeasuringComponent, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  viewPlotDetailModal(item) {
    const modelRef = this.modalService.open(ViewPlotDetailModalComponent, { size: 'lg' });
    modelRef.componentInstance.payload = item;
  }
  updatePlotDetailModal(item) {
    const modelRef = this.modalService.open(AddPlotsComponent, { size: 'lg' });
    modelRef.componentInstance.payload = item;
    modelRef.componentInstance.isUpdate = true;
  }
  updateTransferHistoryModal(item,templete) {
    const modelRef = this.modalService.open(templete, { size: 'lg' });
    this.transferHistory = item;
  }
  getCustomerList() {
    // this.isLoaded = true;
    this.adminService.getAllCustomers().then(res => {
      this.customerList = res as any[];
      // this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    })
  }

  openSalePlotModel(item, model) {
    this.getCustomerList();
    this.getAuthDealers();
    this.salePlotItem = item;
    this.salePayload.plotId = item.id;
    this.modalRef = this.modelService.show(model);
  }
  openResalePlotModel(item, model) {
    this.getCustomerList();
    // this.getAuthDealers();
    this.isResale = true;
    this.resalePayload.modifiedBy = localStorage.getItem('userId');
    this.resalePayload.plotId = item.id;
    this.salePlotItem = item;
    // this.salePayload.plotId = item.id;
    this.modalRef = this.modelService.show(model);
  }
  onchange(item) {
    this.salePayload.percentage = item.commision_percentage;
    this.salePayload.dealerId = item.id;
  }
}
