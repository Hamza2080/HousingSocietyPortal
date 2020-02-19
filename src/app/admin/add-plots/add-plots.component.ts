import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-plots',
  templateUrl: './add-plots.component.html',
  styleUrls: ['./add-plots.component.css']
})
export class AddPlotsComponent implements OnInit {

  public payload = {
    plotNumber: 0,
    size: 0,
    measuring_unit: null,
    totalPayment: 0,
    isOnInstallment: false,
    id: null,
    plotcategoriesId: null,
    landMeasuringUnitId: null,
    townId: null,
    plotPaymentPlanId: null,
    customerId: null
  };
  public cutomerList = [];
  public measurementsList = [];
  public paymentPlan = [];
  public landLordList = [];
  public plotcategories = [];
  public townList = [];
  public isLoading = false;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    this.getTowns();
    this.getMeasurements();
    this.getPlotCategories();
    this.getCustomers();
    this.getPaymentPlan();
  }
  onSubmit() {
    this.isLoading = true;
    // this.payload.total_land = Number(this.payload.total_land);
    // this.payload.phone = Number(this.payload.phone);
    this.adminService.addPlots(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  }
  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
      if (this.townList.length) {
        this.payload.townId = this.townList[0].id;
      }

    }).catch(err => {
      console.log(err);
    })
  }
  getMeasurements() {
    this.adminService.getAllMeasurement().then(res => {
      this.measurementsList = res as any[];
      if (this.measurementsList.length) {
        this.payload.landMeasuringUnitId = this.measurementsList[0].id;
      }

    }).catch(err => {
      console.log(err);
    })
  }
  getPaymentPlan() {
    this.adminService.getAllPaymentPlans().then(res => {
      this.paymentPlan = res as any[];
      if (this.paymentPlan.length) {
        this.payload.landMeasuringUnitId = this.paymentPlan[0].id;
      }

    }).catch(err => {
      console.log(err);
    });
  }
  getPlotCategories() {
    // this.isLoaded = true;
    this.adminService.getAllPlotCategories().then(res => {
      this.plotcategories = res as any[];
      // this.isLoaded = false;
      if (this.plotcategories.length) {
        this.payload.plotcategoriesId = this.plotcategories[0].id;
      }
    }).catch(err => {
      console.log(err);
      // this.isLoaded = false;
    });
  }
  getCustomers() {
    // this.isLoaded = true;
    this.adminService.getAllCustomers().then(res => {
      this.cutomerList = res as any[];
      // this.isLoaded = false;
      if (this.cutomerList.length) {
        this.payload.customerId = this.cutomerList[0].id;
      }
    }).catch(err => {
      console.log(err);
      // this.isLoaded = false;
    });
  }
}
