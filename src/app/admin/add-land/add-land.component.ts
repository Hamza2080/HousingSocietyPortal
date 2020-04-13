import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

class Installment {
    public srNo : number;
    public installmentName : string;//"downPayment | installmentNumber, (notrequired)"
    public installmentAmount : number;
    public dueDate = new Date();
    public status : string;
    public receivedByName : string;
    public receivedByNumber : string;
    public receiveDate = new Date();
    public paidBy : string;
    public receiptNumber : string;
    public attachment : Array<string>;
}

@Component({
  selector: 'app-add-land',
  templateUrl: './add-land.component.html',
  styleUrls: ['./add-land.component.css']
})
export class AddLandComponent implements OnInit {
  
  // url = ;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  
  private installmentsCreated = false;
  attachments = [];

  public payload = {
      description:  null ,
      totalLand: 0,
      khasraNumber: null,
      moza: null,
      khewat: null,
      measuringUnit: null ,
      acquired_date: new Date(),
      installmentStartDate: null,
      installmentGap: null,
      totalPayment: null,
      downPayment: null,
      noOfInstallment: null,
      installmentAmount: null,
      isOnInstallment: true,
      additionalNotes: null,
      landlordId: null ,
      townId: null,
      installments: [],
      attachment : []
  };
  townList: any[];
  measurementsList: any[];
  landLordList: any[];

  public isLoading = false;
  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 10000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };

  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private toastr: ToastrService) {
    this.initializeAttahmentCode();
  }

  ngOnInit() {
    this.getTowns();
    this.getMeasurements();
    this.getLandLord();
  }

  initializeAttahmentCode() {
    this.uploader  = new FileUploader({url: 'http://localhost:3000/api/attachments/attachment/upload', itemAlias: 'file', removeAfterUpload: true});

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

  createInstallment() {
    // if (this.payload.totalPayment == Number(this.payload.downPayment) + Number(this.payload.noOfInstallment * this.payload.installmentAmount)){

      for (let i = 0; i < this.payload.noOfInstallment; i++) {
        let startDate = new Date(this.payload.installmentStartDate);
        let installment = new Installment();
        installment.srNo = i+1;
        installment.installmentName = "installment_" + i+1;
        installment.installmentAmount = this.payload.installmentAmount;
        installment.dueDate = new Date(startDate.setMonth(startDate.getMonth() + (this.payload.installmentGap * i))),
        installment.status = 'Due'; // Due / Paid

        this.payload.installments.push(installment);
        this.installmentsCreated = true;
      }
    // } else this.toastr.error('Error!', `Kindly check payment details, Total payment not equal to downPayment plus installments.`);
  }


  onSubmit() {
    this.isLoading = true;
    this.payload.totalLand = Number(this.payload.totalLand);
    this.payload.installmentGap = Number(this.payload.installmentGap);
    this.payload.totalPayment = Number(this.payload.totalPayment);
    this.payload.downPayment = Number(this.payload.downPayment);
    this.payload.noOfInstallment = Number(this.payload.noOfInstallment);
    this.payload.installmentAmount = Number(this.payload.installmentAmount);
    this.payload.attachment = this.attachments;

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
        this.payload.measuringUnit = this.measurementsList[0].measuring_unit;
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
