import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-street',
  templateUrl: './update-street.component.html',
  styleUrls: ['./update-street.component.css']
})
export class UpdateStreetComponent implements OnInit {

  @Input() streetDetail;
  public selectTown;
  public payload;

  townList: any[];
  measurementsList: any[];

  public isLoading = false;
  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 10000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };

  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private toastr: ToastrService) {
    // this.initializeAttahmentCode();
  }

  ngOnInit() {
    this.payload = this.streetDetail;
    this.getTowns();
    this.getMeasurements();
  }

  onSubmit() {
    this.isLoading = true;

      this.adminService.updateStreet(this.payload).then(res => {
        console.log(res);
        this.isLoading = false;
        this.relatedModal.close(true);
      }).catch(err => {
        console.log(err);
        this.toastr.error("There is some error while adding street " + err.Message || err);
        this.isLoading = false;
      })
  }


  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
      if (this.townList.length) {
        this.payload.townId = this.townList[0].id;
          this.townSelectionUpdated(this.townList[0].id);
      }

    }).catch(err => {
      console.log(err);
    })
  }

  townSelectionUpdated(event) {
    for (let i = 0; i < this.townList.length; i++) {
      if (this.townList[i].id == event)
        this.selectTown = this.townList[i];
    }
  }

  getMeasurements() {
    this.adminService.getAllMeasurement().then(res => {
      this.measurementsList = res as any[];
      if (this.measurementsList.length) {
        this.payload.measuringUnit = this.measurementsList[0].measuring_unit;
      }

    }).catch(err => {
      console.log(err);
    })
  }
}
