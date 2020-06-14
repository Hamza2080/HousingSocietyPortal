import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-expense-type',
  templateUrl: './add-expense-type.component.html',
  styleUrls: ['./add-expense-type.component.css']
})
export class AddExpenseTypeComponent implements OnInit {
public settings = null;
public isAdded = false;
public isLoading = false;
public isLoaded = false;
public expenseTypesList = [];
public payload = {
  type:null,
}
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    this.getExpenseTypes();
  }
  getExpenseTypes() {
    this.isLoaded = true;
    this.adminService.getAllExpenseTypes().then(res => {
      this.expenseTypesList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }
onSubmit(){
  this.isLoading = true;
  this.adminService.addExpenseType(this.payload).then(res =>{
    console.log(res);
    this.isLoading = false;
    this.isAdded = false;
    this.getExpenseTypes()
    // this.relatedModal.close(true);
  }) .catch(err =>{
    console.log(err);
    this.isLoading = false;
  })
}
}
