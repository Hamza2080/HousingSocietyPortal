import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public receiveDate = null;
  public paidBy: string;
  public receiptNumber: string;
  public attachment: Array<string>;
  public extraCharges = null;
}

@Component({
  selector: 'app-add-plots',
  templateUrl: './add-plots.component.html',
  styleUrls: ['./add-plots.component.css']
})
export class AddPlotsComponent implements OnInit {
  @ViewChild('shareableLink') private myScrollContainer: ElementRef;
  public isUpdate = false;
  // url = ;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  errorInInstallmetnValues = false;
  public streetList = null;
  public payload = {
    plotNumber: null,
    plotType: null,
    size: null,
    plotcategoriesId: null,
    measuringUnit: null,
    kanal: null,
    marla: null,
    sarsai: null,
    feet: null,
    streetId: null,
    reference: null,
    townId: null,
    townPhase: null,
    additionalNotes: null,
    planningDate: new Date(),
    installmentStartDate: null,
    installmentGap: null,
    totalPayment: null,
    downPayment: null,
    noOfInstallment: null,
    installmentAmount: null,
    isOnInstallment: true,
    isSold: false,
    installments: [],
    attachment: []
  };
  public totalAmount = null
  public totalPayment = null
  public installmentsCreated = false;
  public plotCategoryExtraCharge = 0;
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

  constructor(public relatedModal: NgbActiveModal, private modelService: NgbModal, private adminService: AdminService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getTowns();
    this.getMeasurements();
    this.getPlotCategories();
    if (this.isUpdate) {
      this.installmentsCreated = true;
      this.payload.installmentStartDate = new Date(this.payload.installmentStartDate);
      this.payload.installments.forEach(data => {
        data.dueDate = new Date(data.dueDate);
      })
 
    }
    // this.getStreet();
    // this.getCustomers();
    // this.getPaymentPlan();

    // tslint:disable-next-line: max-line-length
    this.uploader = new FileUploader({ url: 'http://localhost:3000/api/attachments/attachment/upload', itemAlias: 'file', removeAfterUpload: true });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      this.attachments.push(response.data.result.files.file[0].name);
      this.toastr.success('Success!', response.data.result.files.file[0].name + ' file uploaded', this.toastserviceConfig);
    };

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

  }
  onSubmit() {
    this.isLoading = true;
    if (this.checkTotalAmount()) {

      this.payload.kanal = Number(this.payload.kanal);
      this.payload.marla = Number(this.payload.marla);
      this.payload.sarsai = Number(this.payload.sarsai);
      this.payload.feet = Number(this.payload.feet);
      this.payload.installmentGap = Number(this.payload.installmentGap);
      this.payload.totalPayment = Number(this.payload.totalPayment);
      this.payload.downPayment = Number(this.payload.downPayment);
      this.payload.noOfInstallment = Number(this.payload.noOfInstallment);
      this.payload.installmentAmount = Number(this.payload.installmentAmount);
      this.payload.attachment = this.attachments;
      if(this.isUpdate){
        this.adminService.updatePlots(this.payload).then(res => {
          this.isLoading = false;
          document.getElementById('closebtn').click();
          this.relatedModal.close(true);
        }).catch(err => {
          console.log(err);
          this.isLoading = false;
        });
      } else {
      this.adminService.addPlots(this.payload).then(res => {
        this.isLoading = false;
        document.getElementById('closebtn').click();
        this.relatedModal.close(true);
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      });
    }
    } else {
      this.toastr.error('Error!', `Kindly check payment details, Total payment not equal to downPayment plus installments.`);
      this.isLoading = false;
    }
  }
  getStreet(townId) {
    // this.isLoaded = true;
    this.adminService.getStreetsByTownId(townId).then(res => {
      this.streetList = res as any[];
      // this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      // this.isLoaded = false;
    });
  }
  checkTotalAmount() {
    let totalPayment = this.payload.totalPayment;
    let calculatedPayment = 0;
    for (let i = 0; i < this.payload.installments.length; i++) {
      calculatedPayment += Number(this.payload.installments[i].installmentAmount);
    }

    if (calculatedPayment == Number(totalPayment) + this.plotCategoryExtraCharge) return true;
    else return false;
  }

  createInstallment() {
    let categoryObject = this.plotcategories.find(element => element.id == this.payload.plotcategoriesId);
    // if (this.payload.totalPayment == Number(this.payload.downPayment) + Number(this.payload.noOfInstallment * this.payload.installmentAmount)){
    this.payload.installments = [];
    // let startdate = new Date();
    let iinstallment = new Installment();
    iinstallment.srNo = 1;
    iinstallment.installmentName = "DownPayment";
    iinstallment.installmentAmount = this.payload.installmentAmount;
    iinstallment.dueDate = new Date();
    iinstallment.status = 'Paid'; // Due / Paid
    this.payload.installments.push(iinstallment);
    for (let i = 0; i < this.payload.noOfInstallment; i++) {
      let startDate = new Date(this.payload.installmentStartDate);
      let installment = new Installment();
      installment.srNo = i + 1;
      installment.installmentName = "installment_" + (i + 1);
      installment.installmentAmount = this.payload.installmentAmount;
      installment.dueDate = new Date(startDate.setMonth(startDate.getMonth() + (this.payload.installmentGap * (i))));
      installment.status = 'Due'; // Due / Paid
      this.payload.installments.push(installment);
    }

    let percentageVal = this.payload.plotType == '0' ? categoryObject.residentialPercentage : categoryObject.commercialPercentage;
    let calculateExtraCharge = (percentageVal / 100) * this.payload.totalPayment;
    let installment = new Installment();
    installment.srNo = this.payload.installments.length + 1;
    installment.installmentName = "Category_Extras";
    installment.installmentAmount = calculateExtraCharge;
    let startDate = new Date(this.payload.installmentStartDate);
    installment.dueDate = new Date(startDate.setMonth(startDate.getMonth() + (this.payload.installmentGap * this.payload.installments.length)));
    installment.status = 'Due'; // Due / Paid
    this.plotCategoryExtraCharge = calculateExtraCharge;
    this.totalPayment = Number(this.payload.totalPayment) + Number(this.plotCategoryExtraCharge)
    console.log(this.totalPayment, 'total payments');
    this.totalAmount = this.totalPayment;
    this.payload.installments.push(installment);

    this.installmentsCreated = true;

    // } else this.toastr.error('Error!', `Kindly check payment details, Total payment not equal to downPayment plus installments.`);
  }
  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
      if (this.townList.length) {
        this.payload.townId = this.townList[0].id;
        this.getStreet(this.payload.townId);
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
    // this.isLoading = true;
    this.adminService.getAllPlotCategories().then(res => {
      this.plotcategories = res as any[];
      // this.isLoading = false;
      if (this.plotcategories.length) {
        this.payload.plotcategoriesId = this.plotcategories[0].id;
        if(this.isUpdate) {
          let categoryObject = this.plotcategories.find(element => element.id == this.payload.plotcategoriesId);
          let percentageVal = this.payload.plotType == '0' ? categoryObject.residentialPercentage : categoryObject.commercialPercentage;
          let calculateExtraCharge = (percentageVal / 100) * this.payload.totalPayment;
          this.plotCategoryExtraCharge = calculateExtraCharge;
          this.totalPayment = Number(this.payload.totalPayment) + Number(this.plotCategoryExtraCharge)
          console.log(this.totalPayment, 'total payments');
          this.totalAmount = this.totalPayment;
        }
      }
    }).catch(err => {
      console.log(err);
      // this.isLoaded = false;
    });
  }
  townSelectionUpdated(event) {
    for (let i = 0; i < this.townList.length; i++) {
      if (this.townList[i].id == event)
        this.selectTown = this.townList[i];
    }
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
    this.payload.installments[index] = installment;
  }
  checkPlotNumber(value) {
    const payload = {
      plotNumber: value
    }
    this.adminService.checkPlotNumber(payload).then(res => {
      // this.measurementsList = res as any[];
    }).catch(err => {
      console.log(err);
    })
  }
  openModel() {
    // console.log(item);
    // this.refundItem = item;
    this.modelService.open(this.myScrollContainer, { size: 'sm', centered: true, backdrop: 'static' });
  }
}
