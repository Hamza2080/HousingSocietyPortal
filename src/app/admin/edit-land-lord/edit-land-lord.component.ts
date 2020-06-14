import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-land-lord',
  templateUrl: './edit-land-lord.component.html',
  styleUrls: ['./edit-land-lord.component.css']
})
export class EditLandLordComponent implements OnInit {
  public payload = {
    name: null,
    phone: null,
    cnic: null,
    address: null,
    id: null
  }
  public townList = [];
  public isLoading = false;
  private landLord: any;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private dataService: DataService) { }

  ngOnInit() {
    this.adminService.getLandLordById(this.dataService.getLandLordId())
    .then(landlordData => {
      this.landLord = landlordData,
      this.payload.name = this.landLord.name;
      this.payload.phone = this.landLord.phone;
      this.payload.cnic = this.landLord.cnic;
      this.payload.address = this.landLord.address;
      this.payload.id = this.landLord.id;
    })
    .catch(error => console.error(error))

  }
  onSubmit() {
    this.isLoading = true;
    this.payload.cnic = Number(this.payload.cnic);
    this.payload.phone = Number(this.payload.phone);
    this.adminService.updateLandLord(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
  }
}
