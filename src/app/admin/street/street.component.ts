import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddStreetComponent } from '../add-street/add-street.component';
import { UpdateStreetComponent } from '../update-street/update-street.component';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.css']
})
export class StreetComponent implements OnInit {

  public isLoaded = false;
  selectStreet = "";
  public streetList = []
  attachmentArr = [];
  modelRef: any;
  modalRef: BsModalRef;
  townList: any[];
  constructor(private modalService: BsModalService, private modelService:NgbModal,private adminService: AdminService) { 
    this.getTowns();
  }

  ngOnInit() {
    this.getStreet();
  }

  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
    }).catch(err => {
      console.log(err);
    })
  }
  
  getStreet() {
    this.isLoaded = true;
    this.adminService.getAllStreet().then(res => {
      this.streetList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }

  openAttachmentDetail(item, attachmentModal) {
    this.selectStreet = item;
    this.attachmentArr = [];

    this.selectStreet["attachment"].map(fileName => {
      this.attachmentArr.push(`http://localhost:3000/attachment/downloadFile/${fileName}`);
    })
    this.modalRef = this.modalService.show(attachmentModal, {class: 'modal-lg'});
  }

  openNewStreetFormModal () {
    const modelRef = this.modelService.open(AddStreetComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    // modelRef.componentInstance.name = "data goind inside";
    modelRef.result.then((data) => {
      if (data) {
        this.getStreet();
      }
    });
  }

  getTownFromTownId(townId){
    if (this.townList && this.townList.length > 0) {
    let elem = this.townList.find(element => { if (element.id == townId) return element});
    return(elem.name)
    }
  }

  openModelUpdateStreet(street){
    const modelRef = this.modelService.open(UpdateStreetComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.componentInstance.streetDetail = street;
  }
  
}
