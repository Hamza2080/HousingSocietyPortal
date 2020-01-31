import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPlotsComponent } from '../add-plots/add-plots.component';

@Component({
  selector: 'app-view-plots',
  templateUrl: './view-plots.component.html',
  styleUrls: ['./view-plots.component.css']
})
export class ViewPlotsComponent implements OnInit {
  public landLordList = [1];
  public isLoaded = false;
  public date = new Date();
  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit() {
    // this.getLandLord();
  }
  getLandLord() {
    this.isLoaded = true;
    this.adminService.getLandLord().then(res => {
      this.landLordList = res as any[];
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
        this.getLandLord();
      }
    });
  }
}
