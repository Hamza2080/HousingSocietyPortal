import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddParkComponent } from '../add-park/add-park.component';
import { UpdateParkComponent } from '../update-park/update-park.component';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent implements OnInit {

  public isLoaded = false;
  selectPark = "";
  public parkList = []
  attachmentArr = [];
  modelRef: any;
  modalRef: BsModalRef;
  townList: any[];
  constructor(private modalService: BsModalService, private modelService:NgbModal,private adminService: AdminService) { 
    this.getTowns();
  }

  ngOnInit() {
    this.getParks();
  }

  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
    }).catch(err => {
      console.log(err);
    })
  }
  
  getParks() {
    this.isLoaded = true;
    this.adminService.getAllParks().then(res => {
      this.parkList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }

  openAttachmentDetail(item, attachmentModal) {
    this.selectPark = item;
    this.attachmentArr = [];

    this.selectPark["attachment"].map(fileName => {
      this.attachmentArr.push(`http://localhost:3000/attachment/downloadFile/${fileName}`);
    })
    this.modalRef = this.modalService.show(attachmentModal, {class: 'modal-lg'});
  }

  openNewParkFormModal () {
    const modelRef = this.modelService.open(AddParkComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    // modelRef.componentInstance.name = "data goind inside";
    modelRef.result.then((data) => {
      if (data) {
        this.getParks();
      }
    });
  }

  getTownFromTownId(townId){
    if (this.townList && this.townList.length > 0) {
    let elem = this.townList.find(element => { if (element.id == townId) return element});
    return(elem.name)
    }
  }

  openModelUpdatePark(park){
    const modelRef = this.modelService.open(UpdateParkComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.componentInstance.parkDetail = park;
  }
  
}
