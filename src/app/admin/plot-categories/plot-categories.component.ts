import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-plot-categories',
  templateUrl: './plot-categories.component.html',
  styleUrls: ['./plot-categories.component.css']
})
export class PlotCategoriesComponent implements OnInit {
  public settings = null;
  public isAdded = false;
  public isLoading = false;
  public isLoaded = false;
  public categoryList = [];
  public payload = {
    "categoryName": "",
    "residentialPercentage": null,
    "commercialPercentage": null 
  }
  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit() {
    this.getPlotCategories();
  }
  getPlotCategories() {
    this.isLoaded = true;
    this.adminService.getAllPlotCategories().then(res => {
      this.categoryList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }
  onSubmit() {
    this.isLoading = true;
    this.adminService.addPlotCategories(this.payload).then(res => {
      console.log(res);
      this.isLoading = false;
      this.isAdded = false;
      this.getPlotCategories();
      // this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  }

  deletePlotCategory(plotId) {
    this.isLoading = true;
    this.adminService.deletePlotCategory(plotId).then(res => {
      console.log(res);
      this.isLoading = false;
      this.getPlotCategories();
      // this.relatedModal.close(true);
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  }
}
