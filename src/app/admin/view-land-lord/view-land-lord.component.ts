import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLandLordComponent } from '../add-land-lord/add-land-lord.component';
import { EditLandLordComponent } from '../edit-land-lord/edit-land-lord.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-land-lord',
  templateUrl: './view-land-lord.component.html',
  styleUrls: ['./view-land-lord.component.css']
})
export class ViewLandLordComponent implements OnInit {
  public landLordList = [];
  public isLoaded = false;
  constructor(private adminService: AdminService, private dataService: DataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getLandLord();
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
    const modelRef = this.modalService.open(AddLandLordComponent, { size: 'lg' });
    modelRef.result.then((data) => {
      if (data) {
        this.getLandLord();
      }
    });
  }
  openEditModel(landLordId) {
    this.dataService.saveLandLordId(landLordId);
    const modelRef = this.modalService.open(EditLandLordComponent, { size: 'lg' });
    modelRef.result.then((data) => {
      if (data) {
        this.getLandLord();
      }
    });
  }
}
