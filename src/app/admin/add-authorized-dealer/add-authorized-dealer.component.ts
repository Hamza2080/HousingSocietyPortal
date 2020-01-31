import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-authorized-dealer',
  templateUrl: './add-authorized-dealer.component.html',
  styleUrls: ['./add-authorized-dealer.component.css']
})
export class AddAuthorizedDealerComponent implements OnInit {
  public payload = {
    name: null,
    office_name: null,
    office_address: null,
    office_contact: null,
    personal_contact: null,
    authorized_on: new Date(),
    authorized_with: null,
    cnic: null,
    commision_percentage: 0,
    id: null
  };
  public isLoading = false;
  // public bsConfig: Partial<BsDatepickerConfig>;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.isLoading = true;
    // this.payload.phone = Number(this.payload.phone);
    this.adminService.addAuthDealers(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
  }
}
