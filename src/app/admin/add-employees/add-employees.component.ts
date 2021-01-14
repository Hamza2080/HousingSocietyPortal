import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {
  public payload = {
    name: null,
    cnic: null,
    registerDate: null,
    age: null,
    contact: null,
    salary: null,
    designation: null,
    id: null,
    townId: null
  };
  public isEdit = false;
  public isLoading = false;
  public townList = [];
  public townid;
  public phase;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private dataservice: DataService) { 
    this.townid = this.dataservice.getTwonId();
    this.phase = this.dataservice.getPhaseName();
    this.payload.townId = this.townid;
  }

  ngOnInit() {
    this.getTowns();
    if(this.isEdit){
      this.payload.registerDate = new Date(this.payload.registerDate);
    }
  }
  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];

    }).catch(err => {
      console.log(err);
    });
  }
  onSubmit() {
    console.log(this.payload)
    this.isLoading = true;
    if (!this.isEdit) {
      this.adminService.addEmployee(this.payload).then(res => {
        this.relatedModal.close();
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      });
    } else {
      this.adminService.updateEmployee(this.payload).then(res => {
        this.relatedModal.close(true);
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      });
    }
  }
}
