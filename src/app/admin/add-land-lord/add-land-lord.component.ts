import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-land-lord',
  templateUrl: './add-land-lord.component.html',
  styleUrls: ['./add-land-lord.component.css']
})
export class AddLandLordComponent implements OnInit {
  public payload = {
    name: null,
    phone: null,
    cnic: null,
    address: null,
    id: null,
    townId: null
  }
  public townList = [];
  public isLoading = false;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    this.getTowns();
  }
  onSubmit() {
    this.isLoading = true;
    this.payload.cnic = Number(this.payload.cnic);
    this.payload.phone = Number(this.payload.phone);
    this.adminService.addLandLord(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
  }
  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
      if (this.townList.length) {
        this.payload.townId = this.townList[0].id;
      }

    }).catch(err => {
      console.log(err);
    })
  }
}
