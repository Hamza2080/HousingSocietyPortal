import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  // @Input() name;

  // url = ;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;

  attachments = [];
  public expenseTypesList = [];

  public payload = {
      expenseName:  null ,
      expenseType: null ,
      amount: null,
      expenseDate: new Date(),
      status: 'Paid', // Paid | Due
      paidBy: null,
      attachment: [],
      additionalNotes: null,
  };

  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 7000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };

  public isLoading = false;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private toastr: ToastrService) {
    this.uploader  = new FileUploader({url: 'http://localhost:3000/api/attachments/attachment/upload', itemAlias: 'file', removeAfterUpload: true});

    this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        response = JSON.parse(response);
        this.attachments.push(response.data.result.files.file[0].name);
        console.log(this.attachments)
        this.toastr.success('Success!', response.data.result.files.file[0].name + " file uploaded", this.toastserviceConfig);
    };
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
  }

  ngOnInit() {
    this.getExpenseTypes();
  }
  getExpenseTypes() {
    this.isLoading = true;
    this.adminService.getAllExpenseTypes().then(res => {
      this.expenseTypesList = res as any[];
      console.log(this.expenseTypesList)
      this.isLoading = false;
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  onSubmit() {
    this.isLoading = true;
    this.payload.amount = Number(this.payload.amount);
    this.payload.attachment = this.attachments;
    this.adminService.addExpense(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
  }
}
