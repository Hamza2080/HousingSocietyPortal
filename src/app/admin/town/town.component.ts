import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTownsComponent } from '../add-towns/add-towns.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.css']
})
export class TownComponent implements OnInit {
  public townList = [];
  public selectedTown = null;
  public isLoaded = false;
  public isLoading= false;
  modalRef: BsModalRef;
  public payload = {
    phase : null
  };
  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 10000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };

  constructor(private adminService: AdminService,private modelService: BsModalService,private toastr: ToastrService,private modalService:NgbModal) { }

  ngOnInit() {
    this.getTowns();
  }
  getTowns() {
    this.isLoaded = true;
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    })
  }
  openModel(){
      const modelRef = this.modalService.open(AddTownsComponent, { size: 'lg', backdrop : 'static', keyboard : false });
      // modelRef.componentInstance.providerId = providerId
      modelRef.result.then((data) => {
        // console.log('modal is closed', data);
        if(data){
          this.getTowns();
        }
    
      })
  }

  openAddTownPhaseModal(town, phaseModal) {
    this.selectedTown = town;
    this.modalRef = this.modelService.show(phaseModal, {class: 'modal-lg'});
  }

  addTownPhase(){
    this.isLoading = true;
    if ( this.selectedTown.phases) {
      this.selectedTown.phases = this.selectedTown.phases.concat(this.payload.phase);
    }
    else {
      this.selectedTown.phases = [];
      this.selectedTown.phases.push(this.payload.phase)
    }
    this.adminService.updatePhaseInTown (this.selectedTown).then(res => {
      console.log(res);
      this.isLoading = false;
      this.getTowns();
      // this.toastr.success('Success!', "Phase successfully added in town", this.toastserviceConfig);
    }).catch(err => {
      console.log(err);
      this.isLoading = false
      // this.toastr.error('Error!', err.error.error.message);
    })
  }

  removeTownPhase(item, phase) {
    this.isLoading = true;
    let index = item.phases.indexOf(phase);
    item.phases.slice(index, index+1);
    this.adminService.updatePhaseInTown (item).then(res => {
      console.log(res);
      this.isLoading = false;
      this.getTowns();
      // this.toastr.success('Success!', "Phase successfully added in town", this.toastserviceConfig);
    }).catch(err => {
      console.log(err);
      this.isLoading = false
      // this.toastr.error('Error!', err.error.error.message);
    })
  }
}
