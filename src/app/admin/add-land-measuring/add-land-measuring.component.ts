import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-land-measuring',
  templateUrl: './add-land-measuring.component.html',
  styleUrls: ['./add-land-measuring.component.css']
})
export class AddLandMeasuringComponent implements OnInit {
public settings = null;
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
  }
onSubmit(){

}
}
