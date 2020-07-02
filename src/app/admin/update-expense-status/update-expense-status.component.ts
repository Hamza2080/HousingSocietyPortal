import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-expense-status',
  templateUrl: './update-expense-status.component.html',
  styleUrls: ['./update-expense-status.component.css']
})
export class UpdateExpenseStatusComponent implements OnInit {
  public expense = null;
  public employees = [];
  public payload = {
    amount: null,
    status: 'Paid', // Paid | Due
    employeeId: null,
  };
  public isLoading = false;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    console.log(this.expense)
    this.getAllEmplyees();
    this.payload.amount = this.expense.amount;
    this.payload.employeeId = this.expense.employeeId;
  }
  onSubmit() {
    this.isLoading  = true;
    this.adminService.updateExpenseStatus(this.payload, this.expense.id).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
  }
  getAllEmplyees() {
    this.adminService.getAllEmployees().then(res => {
      this.employees = res as any[];
    })
      .catch(err => {
        console.log(err);
      });
  }
}
