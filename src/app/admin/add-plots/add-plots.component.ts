import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

class Installment {
  public srNo: number;
  public installmentName: string;//"downPayment | installmentNumber, (notrequired)"
  public installmentAmount: number;
  public dueDate = new Date();
  public status: string;
  public receivedByName: string;
  public receivedByNumber: string;
  public receiveDate = new Date();
  public paidBy: string;
  public receiptNumber: string;
  public attachment: Array<string>;
}

@Component({
  selector: 'app-add-plots',
  templateUrl: './add-plots.component.html',
  styleUrls: ['./add-plots.component.css']
})
export class AddPlotsComponent implements OnInit {

  // url = ;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  public payload = {
    plotNumber: null,
    size: null,
    plotcategoriesId: null,
    measuringUnit: null,
    street : null,
    reference: null,
    townId: null,
    townPhase: null,
    description: null,
    additionalNotes: null,
    planningDate: new Date(),
    installmentStartDate: null,
    installmentGap: null,
    totalPayment: null,
    downPayment: null,
    noOfInstallment: null,
    installmentAmount: null,
    isOnInstallment: true,
    isSold : false,
    installments: [],
    attachment: []
  };
  private installmentsCreated = false;
  attachments = [];
  public selectTown = null;
  // public cutomerList = [];
  public measurementsList = [];
  public paymentPlan = [];
  public landLordList = [];
  public plotcategories = [];
  public townList = [];
  public isLoading = false;
  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 10000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };

  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTowns();
    this.getMeasurements();
    this.getPlotCategories();
    // this.getCustomers();
    // this.getPaymentPlan();

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
  onSubmit() {
    this.isLoading = true;
    console.log(this.payload)
    // this.payload.total_land = Number(this.payload.total_land);
    // this.payload.phone = Number(this.payload.phone);
    // this.adminService.addPlots(this.payload).then(res => {
    //   console.log(res);
    //   this.isLoading = false;
    //   this.relatedModal.close(true);
    // }).catch(err => {
    //   console.log(err);
    //   this.isLoading = false;
    // });
  }
  createInstallment() {
    // if (this.payload.totalPayment == Number(this.payload.downPayment) + Number(this.payload.noOfInstallment * this.payload.installmentAmount)){
    this.payload.installments = [];
    for (let i = 0; i < this.payload.noOfInstallment; i++) {
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
  getMeasurements() {
    this.adminService.getAllMeasurement().then(res => {
      this.measurementsList = res as any[];
      if (this.measurementsList.length) {
        this.payload.measuringUnit = this.measurementsList[0].id;
      }

    }).catch(err => {
      console.log(err);
    })
  }
  
  getPlotCategories() {
    this.isLoading = true;
    this.adminService.getAllPlotCategories().then(res => {
      this.plotcategories = res as any[];
      this.isLoading = false;
      if (this.plotcategories.length) {
        this.payload.plotcategoriesId = this.plotcategories[0].id;
      }
    }).catch(err => {
      console.log(err);
      // this.isLoaded = false;
    });
  }
  townSelectionUpdated(event) {
    for (let i =0 ; i< this.townList.length; i++) {
      if (this.townList[i].id == event)
      this.selectTown = this.townList[i];
    }
  }
}
