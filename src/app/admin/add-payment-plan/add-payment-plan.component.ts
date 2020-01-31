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
    payment_plan_duration: 1,
    is_monthly_plan_type: true,
    first_payment: null,
    installment_gap: "1 Month",
    total_no_of_installment: 12,
    total_amount: null,
    installment_amount: 0,
    created_by: 'admin',
    created_at: new Date(),
    id: null
  }
  public isLoading = false;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {

  }
  onSubmit() {
    this.payload.total_amount = Number(this.payload.total_amount)
    this.payload.first_payment = Number(this.payload.first_payment)
    this.isLoading = true;
    this.adminService.addPaymentPlans(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
  }
}
