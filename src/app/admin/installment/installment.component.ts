import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.css']
})
export class InstallmentComponent implements OnInit {
  // url = ;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;

  attachments = [];
  installment = [];
  isAdded = false;
  isplotSide = false;
  plotId = null;
  landId = null;
  payload = {
    receivedByName: '',
    receivedByNumber: '',
    receiveDate: new Date(),
    paidBy : '',
    receiptNumber : '-',
    attachment : [],
    plotId: '',
  }
  landPayload = {
    receivedByName: '',
    receivedByNumber: '',
    receiveDate: new Date(),
    paidBy : '',
    receiptNumber : '-',
    attachment : [],
    landId: '',
  }
  public isLoading = false;

  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 10000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };
  
  constructor(private adminService: AdminService, public relatedModal: NgbActiveModal, private toastr: ToastrService) {
    this.uploader  = new FileUploader({url: 'https://housing-society-backend.herokuapp.com/api/attachments/attachment/upload', itemAlias: 'file', removeAfterUpload: true});

    this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        response = JSON.parse(response);
        this.attachments.push(response.data.result.files.file[0].name);
        this.toastr.success('Success!', response.data.result.files.file[0].name + " file uploaded", this.toastserviceConfig);
    };
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
    }

  ngOnInit() {
    this.payload.plotId = this.plotId;
    this.landPayload.landId = this.landId;
    this.installment.forEach(element =>{
      if (new Date(element.dueDate).getTime() <= new Date().getTime() && element.status === 'Due'){
        element.status = 'Upcoming Due';
      }
    })
  }
  onSubmitPlotInstallment(item) {
    // this.payload.plotId = item.plotId;
    this.isAdded = true;
  }
  onSubmit(){
    this.isLoading = true;
    this.payload.attachment = this.attachments;

    if (this.uploader.queue.length > 0) {
      this.toastr.error('Error!', "Please upload all attachments before saving record.");
      this.isLoading = false;
    } else {
      this.adminService.submitPlotInstallment({data : this.payload}).then(res =>{
        this.isLoading = false;
        this.isAdded = false;
        this.relatedModal.close(true);
        // this.getMeasurmentsUnit()
        // this.relatedModal.close(true);
      }) .catch(err =>{
        console.log(err);
        this.isLoading = false;
      })
    }
  }
  onSubmitLand(){
    this.isLoading = true;
    this.landPayload.attachment = this.attachments;
    if (this.uploader.queue.length > 0) {
      this.toastr.error('Error!', "Please upload all attachments before saving record.");
      this.isLoading = false;
    } else {
      this.adminService.submitLandInstallment({data : this.landPayload}).then(res =>{
        this.isLoading = false;
        this.isAdded = false;
        this.relatedModal.close(true);
        // this.getMeasurmentsUnit()
        // this.relatedModal.close(true);
      }) .catch(err =>{
        console.log(err);
        this.isLoading = false;
      })
    }
  }

  isDueDatePassed(item) {
    if (new Date() > new Date(item.dueDate)) return true;
    else return false;
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
