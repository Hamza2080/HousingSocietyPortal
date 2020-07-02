import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

class Installment {
  public srNo: number;
  public installmentName: string;//"downPayment | installmentNumber, (notrequired)"
  public installmentAmount: number;
  public dueDate = new Date();
  public status: string;
  public receivedByName: string;
  public receivedByNumber: string;
  public receiveDate = null;
  public paidBy: string;
  public receiptNumber: string;
  public attachment: Array<string>;
}

@Component({
  selector: 'app-add-land',
  templateUrl: './add-land.component.html',
  styleUrls: ['./add-land.component.css']
})
export class AddLandComponent implements OnInit {
  @ViewChild('shareableLink') private myScrollContainer: ElementRef;

  // url = ;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  private installmentsCreated = false;
  attachments = [];
  errorInInstallmetnValues = false;
  public khasraNumberList = [];
  public mozaList = [];
  public khewatList = [];
  public khasra = null;
  public moza = null;
  public khewat = null;
  public isUpdate = false;
  // public area = ['village','city']
  public payload = {
    description: null,
    totalLand: 0,
    khasranNumber: [],
    murabba: [],
    khewat: [],
    kanal: null,
    marla: null,
    sarsai: null,
    feet: null,
    moza:null,
    areaName:null,
    measuringUnit: null,
    acquired_date: new Date(),
    installmentStartDate: null,
    installmentGap: null,
    totalPayment: null,
    downPayment: null,
    noOfInstallment: null,
    installmentAmount: null,
    isOnInstallment: true,
    additionalNotes: null,
    landlordId: null,
    townId: null,
    installments: [],
    attachment: []
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

  constructor(public relatedModal: NgbActiveModal,private modelService:NgbModal, private adminService: AdminService, private toastr: ToastrService) {
    this.initializeAttahmentCode();
  }

  ngOnInit() {
    this.getTowns();
    this.getMeasurements();
    this.getLandLord();
    if(this.isUpdate){
      this.khasraNumberList = this.payload.khasranNumber;
      this.mozaList = this.payload.murabba;
      this.khewatList = this.payload.khewat;
      this.installmentsCreated = true;
    }
  }

  initializeAttahmentCode() {
    this.uploader = new FileUploader({ url: 'http://localhost:3000/api/attachments/attachment/upload', itemAlias: 'file', removeAfterUpload: true });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
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
    this.payload.installments = [];
    let startdate = new Date(this.payload.installmentStartDate);
    let iinstallment = new Installment();
    iinstallment.srNo = 1;
    iinstallment.installmentName = "DownPayment";
    iinstallment.installmentAmount = this.payload.installmentAmount;
    iinstallment.dueDate = new Date(startdate.setMonth(startdate.getMonth() + (this.payload.installmentGap * 1)));
    iinstallment.status = 'Paid'; // Due / Paid
    this.payload.installments.push(iinstallment);
    for (let i = 1; i < this.payload.noOfInstallment; i++) {
      let startDate = new Date(this.payload.installmentStartDate);
      let installment = new Installment();
      installment.srNo = i + 1;
      installment.installmentName = "installment_" + i + 1;
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
    if (this.checkTotalAmount()) {
      if(this.khewatList.length && this.khasraNumberList.length && this.mozaList.length) {
        this.payload.totalLand = Number(this.payload.totalLand);
        this.payload.installmentGap = Number(this.payload.installmentGap);
        this.payload.totalPayment = Number(this.payload.totalPayment);
        this.payload.downPayment = Number(this.payload.downPayment);
        this.payload.noOfInstallment = Number(this.payload.noOfInstallment);
        this.payload.installmentAmount = Number(this.payload.installmentAmount);
        this.payload.attachment = this.attachments;
        this.payload.kanal = Number(this.payload.kanal);
        this.payload.feet = Number(this.payload.feet);
        this.payload.sarsai = Number(this.payload.sarsai);
        this.payload.marla = Number(this.payload.marla);
        this.payload.khasranNumber = this.khasraNumberList;
        this.payload.khewat = this.khewatList;
        this.payload.murabba = this.mozaList;
        if(this.isUpdate){
          this.adminService.updateLand(this.payload).then(res => {
            console.log(res);
            this.isLoading = false;
            document.getElementById('closebtn').click();
            this.relatedModal.close(true);
          }).catch(err => {
            console.log(err);
            this.isLoading = false;
          })
        } else {
          this.adminService.addLand(this.payload).then(res => {
            console.log(res);
            this.isLoading = false;
            document.getElementById('closebtn').click();
            this.relatedModal.close(true);
          }).catch(err => {
            console.log(err);
            this.isLoading = false;
          })
        }
      } else {
      this.toastr.error('Error!', `Atleast one Entry Requried in Khewat,khasra Number and Moza `);
      }
   
    } else {
      this.toastr.error('Error!', `Kindly check payment details, Total payment not equal to downPayment plus installments.`);
      this.isLoading = false;
    }
  }

  checkTotalAmount() {
    let totalPayment = this.payload.totalPayment;
    let calculatedPayment = Number(this.payload.downPayment);
    for (let i = 0; i < this.payload.installments.length; i++) {
      calculatedPayment += Number(this.payload.installments[i].installmentAmount);
    }

    if (calculatedPayment == totalPayment) return true;
    else return false;
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
  updateList(index, name, $event) {
    this.errorInInstallmetnValues = false;
    if ($event.target.value == '' || $event.target.value == null || $event.target.value == undefined) {
      this.errorInInstallmetnValues = true;
      this.isLoading = false;
      this.toastr.error('Error!', `Error in installment value, some values are missing`);
    }
    else if (name == 'installmentAmount') {
      this.payload.installments[index].installmentAmount = $event.target.value;
    } else if (name == 'dueDate') {
      this.payload.installments[index].dueDate = $event.target.value;
    } else if (name == 'status') {
      this.payload.installments[index].status = $event.target.value;
    }
  }

  changeValue(index, name, $event) {
  }

  updateInstallment(installment, index) {
    console.log(installment, index);
    this.payload.installments[index] = installment;

    console.log(this.payload);
  }
  addKhasraNumberList() {
    if (this.khasra !== null && this.khasra !== '') {
        this.khasraNumberList.push(this.khasra);
        this.khasra = null;
    }
  }
  addMozaList() {
    if (this.moza !== null && this.moza !== '') {
      this.mozaList.push(this.moza);
      this.moza = null;
  }
  }
  addKhewatList() {
    if (this.khewat !== null && this.khewat !== '') {
      this.khewatList.push(this.khewat);
      this.khewat = null;
  }
  }
  removeMozaItem(item) {
    console.log(item)
    const i = this.mozaList.indexOf(item);
    // if(i > 0){
      this.mozaList.splice(i,1);
    // }
  }
  removeKhasraNumberItem(item) {
    console.log(item)
    const i = this.khasraNumberList.indexOf(item);
    // if(i > 0){
      this.khasraNumberList.splice(i,1);
    // }
  }
  removekhewatItem(item) {
    console.log(item)
    const i = this.khewatList.indexOf(item);
    // if(i > 0){
      this.khewatList.splice(i,1);
    // }
  }
  openModel() {
    // console.log(item);
    // this.refundItem = item;
    this.modelService.open(this.myScrollContainer, { size: 'sm', centered: true, backdrop: 'static' });
  }
}
