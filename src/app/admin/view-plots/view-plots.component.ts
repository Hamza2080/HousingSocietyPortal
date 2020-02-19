import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPlotsComponent } from '../add-plots/add-plots.component';
import { PlotCategoriesComponent } from '../plot-categories/plot-categories.component';
import { InstallmentComponent } from '../installment/installment.component';

@Component({
  selector: 'app-view-plots',
  templateUrl: './view-plots.component.html',
  styleUrls: ['./view-plots.component.css']
})
export class ViewPlotsComponent implements OnInit {
  public plotsList = [];
  public isLoaded = false;
  public date = new Date();
  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit() {
    // this.getLandLord();
    this.getPlots();
  }
  getPlots() {
    this.isLoaded = true;
    this.adminService.getAllPlots().then(res => {
      this.plotsList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    })
  }
  openModel() {
    const modelRef = this.modalService.open(AddPlotsComponent, { size: 'lg' });
    modelRef.result.then((data) => {
      if (data) {
        this.getPlots();
      }
    });
  }
  openModelPlotCategories(){
    const modelRef = this.modalService.open(PlotCategoriesComponent, { size: 'sm' });
  }
  openInstallment(item){
    const modelRef = this.modalService.open(InstallmentComponent, { size: 'lg' });
    modelRef.componentInstance.installment = item.installments;
    modelRef.componentInstance.plotId = item.id;
    modelRef.componentInstance.isplotSide = true;
    modelRef.result.then((data) => {
      if (data) {
        this.getPlots();
      }
    });
  }
  openSalePlot(item){
    console.log(item)
    const payload = {
      plotId:item.id,
      customerId:item.customerData.id
    };

    // payload.append("plotId", item.id);
    // payload.append('customerId', item.customerData.id);
    this.adminService.salePlot(payload).then(res => {
      // this.plotsList = res as any[];
      // this.isLoaded = false;
      this.getPlots();
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    })
  }
}
