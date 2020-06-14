import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-plot-detail-modal-component',
  templateUrl: './view-plot-detail-modal.component.html',
  styleUrls: ['./view-plot-detail-modal.component.css']
})
export class ViewPlotDetailModalComponent implements OnInit {

  @Input() payload;
  townList: any[];
  measurementsList: any[];
  plotcategories: any[];

  constructor( public relatedModal: NgbActiveModal, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTowns();
    this.getMeasurements();
    this.getPlotCategories();
  }

  getTowns() {
    this.adminService.getAllTowns().then(res => {
      this.townList = res as any[];
    }).catch(err => {
      console.log(err);
    })
  }
  getMeasurements() {

    this.adminService.getAllMeasurement().then(res => {
      this.measurementsList = res as any[];
    }).catch(err => {
      console.log(err);
    })
  }
  
  getPlotCategories() {
    this.adminService.getAllPlotCategories().then(res => {
      this.plotcategories = res as any[];
    }).catch(err => {
      console.log(err);
      // this.isLoaded = false;
    });
  }
}
