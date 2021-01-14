import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-park',
  templateUrl: './add-park.component.html',
  styleUrls: ['./add-park.component.css']
})
export class AddParkComponent implements OnInit {

  public selectTown;
  public payload = {
    name: null,
    area_covered: null,
    measuringUnit: null,
    townPhase: null,
    townId: null,
    kanal: null,
    marla: null,
    sarsai: null,
    feet: null,
    additionalNotes: null
  };

  townList: any[];
  measurementsList: any[];

  public townid = null;
  public phase = null;

  public isLoading = false;
  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 10000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };

  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private toastr: ToastrService, private dataservice: DataService) {
    // this.initializeAttahmentCode();
    this.townid = this.dataservice.getTwonId();
    this.phase = this.dataservice.getPhaseName();
    this.payload.townId = this.townid;
    this.payload.townPhase = this.phase;
  }

  ngOnInit() {
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

      this.adminService.addPark(this.payload).then(res => {
        console.log(res);
        this.isLoading = false;
        this.relatedModal.close(true);
      }).catch(err => {
        console.log(err);
        this.toastr.error("There is some error while adding park " + err.Message || err);
        this.isLoading = false;
      })
  }


  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
      if (this.townList.length) {
        // this.payload.townId = this.townList[0].id;
          this.townSelectionUpdated(this.payload.townId);
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
