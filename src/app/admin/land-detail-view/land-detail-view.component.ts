import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-land-detail-view',
  templateUrl: './land-detail-view.component.html',
  styleUrls: ['./land-detail-view.component.css']
})
export class LandDetailViewComponent implements OnInit {

  @Input() public landInstance;
  public khasraNumberList = [];
  public mozaList = [];
  public khewatList = [];
  public townList = [];
  public landLordList = [];
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private toastr: ToastrService) {
  }

  ngOnInit() {
    console.log(this.landInstance)
    this.khasraNumberList = this.landInstance.khasranNumber;
    this.mozaList = this.landInstance.murabba;
    this.khewatList = this.landInstance.khewat;
    this.getLandLord();
    this.getTowns();
  }
  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
      // if (this.townList.length) {
      //   // this.payload.townId = this.townList[0].id;
      // }

    }).catch(err => {
      console.log(err);
    })
  }
  getLandLord() {
    this.adminService.getLandLord().then(res => {
      this.landLordList = res as any[];
      if (this.landLordList.length) {
        // this.payload.landlordId = this.landLordList[0].id;
      }

    }).catch(err => {
      console.log(err);
    })
  }
}
