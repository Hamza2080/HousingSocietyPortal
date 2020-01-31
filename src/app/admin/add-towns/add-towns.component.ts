import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-towns',
  templateUrl: './add-towns.component.html',
  styleUrls: ['./add-towns.component.css']
})
export class AddTownsComponent implements OnInit {
public payload =  {
   name :  null ,
   description :  null ,
   owned_by :  null ,
   adminId :  null,
   developed_on: new Date()
}
public isLoading = false;
  constructor(private relatedModal:NgbActiveModal,private adminService:AdminService) { }

  ngOnInit() {

  }
onSubmit(){
  this.isLoading = true;
  this.payload.adminId = localStorage.getItem('userId');
  this.adminService.addTown(this.payload).then(res =>{
    console.log(res);
    this.isLoading = false;
    this.relatedModal.close(true);
  }) .catch(err =>{
    console.log(err);
    this.isLoading = false;
  })
}
}
