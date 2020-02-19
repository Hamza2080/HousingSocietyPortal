import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-payment-plan',
  templateUrl: './add-payment-plan.component.html',
  styleUrls: ['./add-payment-plan.component.css']
})
export class AddPaymentPlanComponent implements OnInit {
  public payload = {
    payment_plan_name: null,
    description: null,
    downPayment: null,
    installmentGap: null,
    noOfInstallment: null,
    totalAmount: null,
    installmentAmount: null,
    created_at: new Date(),
    id: null,
    created_by_Id: null
  }
  public isLoading = false;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    this.payload.created_by_Id = localStorage.getItem('userId');
  }
  onSubmit() {
    this.payload.downPayment = Number(this.payload.downPayment);
    this.payload.installmentGap = Number(this.payload.installmentGap);
    this.payload.installmentAmount = Number(this.payload.installmentAmount);
    this.isLoading = true;
    this.adminService.addPaymentPlans(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  }
}
