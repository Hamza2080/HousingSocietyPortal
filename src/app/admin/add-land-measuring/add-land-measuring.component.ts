import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-land-measuring',
  templateUrl: './add-land-measuring.component.html',
  styleUrls: ['./add-land-measuring.component.css']
})
export class AddLandMeasuringComponent implements OnInit {
public settings = null;
public isAdded = false;
public isLoading = false;
public isLoaded = false;
public measurmentsList = [];
public payload = {
  measuring_unit:null,
}
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    this.getMeasurmentsUnit();
  }
  getMeasurmentsUnit() {
    this.isLoaded = true;
    this.adminService.getAllMeasurement().then(res => {
      this.measurmentsList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }
onSubmit(){
  this.isLoading = true;
  this.adminService.addLandMeasurement(this.payload).then(res =>{
    console.log(res);
    this.isLoading = false;
    this.isAdded = false;
    this.getMeasurmentsUnit()
    // this.relatedModal.close(true);
  }) .catch(err =>{
    console.log(err);
    this.isLoading = false;
  })
}
}
