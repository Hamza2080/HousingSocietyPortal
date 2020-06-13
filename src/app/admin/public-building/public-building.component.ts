import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddPublicBuildingComponent } from '../add-public-building/add-public-building.component';
import { UpdatePublicBuildingComponent } from '../update-public-building/update-public-building.component';
// import { AddPublicBuildingComponent } from '../add-publicBuilding/add-publicBuilding.component';
// import { UpdatePublicBuildingComponent } from '../update-publicBuilding/update-publicBuilding.component';

@Component({
  selector: 'app-public-building',
  templateUrl: './public-building.component.html',
  styleUrls: ['./public-building.component.css']
})
export class PublicBuildingComponent implements OnInit {

  public isLoaded = false;
  selectPublicBuilding = "";
  public publicBuildingList = []
  attachmentArr = [];
  modelRef: any;
  modalRef: BsModalRef;
  townList: any[];
  constructor(private modalService: BsModalService, private modelService:NgbModal,private adminService: AdminService) { 
    this.getTowns();
  }

  ngOnInit() {
    this.getPublicBuildings();
  }

  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
    }).catch(err => {
      console.log(err);
    })
  }
  
  getPublicBuildings() {
    this.isLoaded = true;
    this.adminService.getAllPublicBuildings().then(res => {
      this.publicBuildingList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }

  openAttachmentDetail(item, attachmentModal) {
    this.selectPublicBuilding = item;
    this.attachmentArr = [];

    this.selectPublicBuilding["attachment"].map(fileName => {
      this.attachmentArr.push(`http://localhost:3000/attachment/downloadFile/${fileName}`);
    })
    this.modalRef = this.modalService.show(attachmentModal, {class: 'modal-lg'});
  }

  openNewPublicBuildingFormModal () {
    const modelRef = this.modelService.open(AddPublicBuildingComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    // modelRef.componentInstance.name = "data goind inside";
    modelRef.result.then((data) => {
      if (data) {
        this.getPublicBuildings();
      }
    });
  }

  getTownFromTownId(townId){
    if (this.townList && this.townList.length > 0) {
      let elem = this.townList.find(element => { if (element.id == townId) return element});
      if (elem) return(elem.name)
      else return;
    }
  }

  openModelUpdatePublicBuilding(publicBuilding){
    const modelRef = this.modelService.open(UpdatePublicBuildingComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.componentInstance.publicBuildingDetail = publicBuilding;
  }
  
}
