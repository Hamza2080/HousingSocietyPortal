import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { AddPaymentPlanComponent } from '../add-payment-plan/add-payment-plan.component';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})
export class PaymentPlanComponent implements OnInit {
  public isLoaded = false;
  public paymentPlansList = []
    constructor(private modelService:NgbModal,private adminService: AdminService) { }
  
    ngOnInit() {
      this.getLand();
    }
    getLand() {
      this.isLoaded = true;
      this.adminService.getAllPaymentPlans().then(res => {
        this.paymentPlansList = res as any[];
        this.isLoaded = false;
        console.log(this.paymentPlansList)
      }).catch(err => {
        console.log(err);
        this.isLoaded = false;
      });
    }
    openModel() {
      const modelRef = this.modelService.open(AddPaymentPlanComponent, { size: 'lg' });
      modelRef.result.then((data) => {
        // console.log('modal is closed', data);
        if(data){
          this.getLand();
        }
    
      })
    }
}
