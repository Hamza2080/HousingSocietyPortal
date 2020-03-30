import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.css']
})
export class InstallmentComponent implements OnInit {
  installment = [];
  isAdded = false;
  isplotSide = false;
  plotId = null;
  landId = null;
  payload = {
    submittedBy: '',
    submittedTo: '',
    contact: '',
    plotId: '',
  }
  landPayload = {
    submittedBy: '',
    submittedTo: '',
    contact: '',
    landId: '',
  }
  public isLoading = false;
  constructor(private adminService: AdminService, public relatedModal: NgbActiveModal) { }

  ngOnInit() {
    this.payload.plotId = this.plotId;
    this.landPayload.landId = this.landId;
  }
  onSubmitPlotInstallment(item) {
    // this.payload.plotId = item.plotId;
    this.isAdded = true;
  }
  onSubmit(){
    this.isLoading = true;
    this.adminService.submitPlotInstallment(this.payload).then(res =>{
      console.log(res);
      this.isLoading = false;
      this.isAdded = false;
      this.relatedModal.close(true);
      // this.getMeasurmentsUnit()
      // this.relatedModal.close(true);
    }) .catch(err =>{
      console.log(err);
      this.isLoading = false;
    })
  }
  onSubmitLand(){
    this.isLoading = true;
    this.adminService.submitLandInstallment(this.landPayload).then(res =>{
      console.log(res);
      this.isLoading = false;
      this.isAdded = false;
      this.relatedModal.close(true);
      // this.getMeasurmentsUnit()
      // this.relatedModal.close(true);
    }) .catch(err =>{
      console.log(err);
      this.isLoading = false;
    })
  }

  isDueDatePassed(item) {
    if (new Date(item.dueDate) > new Date()) return false;
    else return false;
  }
}
