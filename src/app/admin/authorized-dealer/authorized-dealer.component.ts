import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { AddAuthorizedDealerComponent } from '../add-authorized-dealer/add-authorized-dealer.component';

@Component({
  selector: 'app-authorized-dealer',
  templateUrl: './authorized-dealer.component.html',
  styleUrls: ['./authorized-dealer.component.css']
})
export class AuthorizedDealerComponent implements OnInit {
  public isLoaded = false;
  public authDealerList = [];
  constructor(private modelService: NgbModal, private adminService: AdminService) { }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.isLoaded = true;
    this.adminService.getAllAuthDealers().then(res => {
      this.authDealerList = res as any[];
      this.isLoaded = false;
      console.log(this.authDealerList);
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }
  openModel() {
    const modelRef = this.modelService.open(AddAuthorizedDealerComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.result.then((data) => {
      // console.log('modal is closed', data);
      if (data) {
        this.getCustomers();
      }

    });
  }

}
