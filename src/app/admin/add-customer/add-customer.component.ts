import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  public payload = {

    name: null,
    cnic: null,
    dob: null,
    contact: null,
    address: null,
    registered_at: new Date(),
    userRole: 'customer',
  };
  public isLoading = false;
  public bsConfig: Partial<BsDatepickerConfig>;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    this.bsConfig = Object.assign(
      {},
      {
        adaptivePosition: true,
        containerClass: 'theme-green',
        maxDate: new Date()
      }
    );
  }
  onSubmit() {
    this.isLoading = true;
    // this.payload.phone = Number(this.payload.phone);
    this.adminService.addCustomer(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
  }
}
