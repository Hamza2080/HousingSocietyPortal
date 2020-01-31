import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-land',
  templateUrl: './add-land.component.html',
  styleUrls: ['./add-land.component.css']
})
export class AddLandComponent implements OnInit {
  public payload = {
    name: null,
    total_land: null,
    measuring_unit: null,
    acquired_date: new Date(),
    landlordId: null,
    landMeasuringUnitId: null,
    townId: null
  };
  public measurementsList = [];
  public landLordList = []
  public townList = [];
  public isLoading = false;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    this.getTowns();
    this.getMeasurements();
    this.getLandLord();
  }
  onSubmit() {
    this.isLoading = true;
    this.payload.total_land = Number(this.payload.total_land);
    // this.payload.phone = Number(this.payload.phone);
    this.adminService.addLand(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
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
  getLandLord() {
    this.adminService.getLandLord().then(res => {
      this.landLordList = res as any[];
      if (this.landLordList.length) {
        this.payload.landlordId = this.landLordList[0].id;
      }

    }).catch(err => {
      console.log(err);
    })
  }
}
