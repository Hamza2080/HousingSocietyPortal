import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { AddExpenseTypeComponent } from '../add-expense-type/add-expense-type.component';
import { UpdateExpenseComponent } from '../update-expense/update-expense.component';
import { UpdateExpenseStatusComponent } from '../update-expense-status/update-expense-status.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  public isLoaded = false;
  selectExpense = "";
  public expenseList = []
  attachmentArr = [];
  modelRef: any;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private modelService:NgbModal,private adminService: AdminService) { }

  ngOnInit() {
    this.getExpense();
  }

  getExpense() {
    this.isLoaded = true;
    this.adminService.getAllExpenses().then(res => {
      this.expenseList = res as any[];
      this.isLoaded = false;
      console.log(this.expenseList)
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }

  openAttachmentDetail(item, attachmentModal) {
    this.selectExpense = item;
    this.attachmentArr = [];

    this.selectExpense["attachment"].map(fileName => {
      this.attachmentArr.push(`http://localhost:3000/attachment/downloadFile/${fileName}`);
    })
    this.modalRef = this.modalService.show(attachmentModal, {class: 'modal-lg'});
  }

  openNewExpenseFormModal () {
    const modelRef = this.modelService.open(AddExpenseComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    // modelRef.componentInstance.name = "data goind inside";
    modelRef.result.then((data) => {
      if (data) {
        this.getExpense();
      }
    });
  }

  openModelExpenseType(){
    const modelRef = this.modelService.open(AddExpenseTypeComponent, { size: 'lg', backdrop : 'static', keyboard : false });
  }

  openModelUpdateExpense(expense){
    const modelRef = this.modelService.open(UpdateExpenseComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.componentInstance.expenseDetail = expense;
  }
  openPaidModel(item){
    const modelRef = this.modelService.open(UpdateExpenseStatusComponent, { size: 'sm', backdrop : 'static', keyboard : false });
    modelRef.componentInstance.expense = item;
    modelRef.result.then((data) => {
      if (data) {
        this.getExpense();
      }
    });
    // modelRef.componentInstance.expenseDetail = expense; 
  }
}
