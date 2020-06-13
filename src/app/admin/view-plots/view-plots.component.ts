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

  public salePlotItem = null;
  private salePayload = {
    customerId : null,
    date : new Date(),
    plotId : null
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
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    })
  }
  openModel() {
    const modelRef = this.modalService.open(AddPlotsComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.result.then((data) => {
      if (data) {
        this.getPlots();
      }
    });
  }
  openModelPlotCategories(){
    const modelRef = this.modalService.open(PlotCategoriesComponent, { size: 'lg', backdrop : 'static', keyboard : false });
  }
  openInstallment(item){
    const modelRef = this.modalService.open(InstallmentComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.componentInstance.installment = item.installments;
    modelRef.componentInstance.plotId = item.id;
    modelRef.componentInstance.isplotSide = true;
    modelRef.result.then((data) => {
      if (data) {
        this.getPlots();
      }
    });
  }
  openSalePlot(){
    this.isLoaded = true;
    this.salePlotItem.customerId = this.salePayload.customerId;
    this.salePlotItem.saleDate = this.salePayload.date;
    this.salePlotItem.plotStatus = "Sold";
    this.adminService.salePlot(this.salePlotItem).then(res => {
      this.plotsList = res as any[];
      this.isLoaded = false;
      this.getPlots();
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    })
  }

  openModelMeasurement(){
    const modelRef = this.modalService.open(AddLandMeasuringComponent, { size: 'lg', backdrop : 'static', keyboard : false });
  }

  viewPlotDetailModal(item){
    const modelRef = this.modalService.open(ViewPlotDetailModalComponent, { size: 'lg'});
    modelRef.componentInstance.payload = item;
  }
  
  getCustomerList() {
    this.isLoaded = true;
    this.adminService.getAllCustomers().then(res => {
      this.customerList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    })
  }

  openSalePlotModel(item, model) {
    this.getCustomerList();
    this.salePlotItem = item;
    this.salePayload.plotId = item.id;
    this.modalRef = this.modelService.show(model);
  }
}
