import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  public isLoaded = false;
  public customerList = [];
  constructor(private modelService: NgbModal, private adminService: AdminService) { }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.isLoaded = true;
    this.adminService.getAllCustomers().then(res => {
      this.customerList = res as any[];
      this.isLoaded = false;
      console.log(this.customerList);
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }
  openModel() {
    const modelRef = this.modelService.open(AddCustomerComponent, { size: 'lg' });
    modelRef.result.then((data) => {
      // console.log('modal is closed', data);
      if (data) {
        this.getCustomers();
      }

    });
  }
}
