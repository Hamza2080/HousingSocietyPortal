import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-update-public-building',
  templateUrl: './update-public-building.component.html',
  styleUrls: ['./update-public-building.component.css']
})
export class UpdatePublicBuildingComponent implements OnInit {

  @Input() publicBuildingDetail;

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
    this.payload = this.publicBuildingDetail;
    console.log(this.payload)
    this.getTowns();
    this.getMeasurements();
  }

  // initializeAttahmentCode() {
  //   this.uploader = new FileUploader({ url: 'http://localhost:3000/api/attachments/attachment/upload', itemAlias: 'file', removeAfterUpload: true });

  //   this.uploader.onBeforeUploadItem = (item) => {
  //     item.withCredentials = false;
  //   }

  //   this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //     response = JSON.parse(response);
  //     this.attachments.push(response.data.result.files.file[0].name);
  //     this.toastr.success('Success!', response.data.result.files.file[0].name + " file uploaded", this.toastserviceConfig);
  //   };

  //   this.hasBaseDropZoneOver = false;
  //   this.hasAnotherDropZoneOver = false;

  //   this.response = '';
  // }

  onSubmit() {
    this.isLoading = true;

      this.adminService.updatePublicBuilding(this.payload).then(res => {
        console.log(res);
        this.isLoading = false;
        this.relatedModal.close(true);
      }).catch(err => {
        console.log(err);
        this.toastr.error("There is some error while updating publicBuilding " + err.Message || err);
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
