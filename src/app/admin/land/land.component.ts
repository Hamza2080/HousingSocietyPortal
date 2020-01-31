import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { AddLandMeasuringComponent } from '../add-land-measuring/add-land-measuring.component';
import { AddLandComponent } from '../add-land/add-land.component';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.css']
})
export class LandComponent implements OnInit {
public isLoaded = false;
public landList = []
  constructor(private modelService:NgbModal,private adminService: AdminService) { }

  ngOnInit() {
    this.getLand();
  }
  getLand() {
    this.isLoaded = true;
    this.adminService.getAllLand().then(res => {
      this.landList = res as any[];
      this.isLoaded = false;
      console.log(this.landList)
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }
  openModel() {
    const modelRef = this.modelService.open(AddLandComponent, { size: 'lg' });
    modelRef.result.then((data) => {
      // console.log('modal is closed', data);
      if(data){
        this.getLand();
      }
  
    })
  }
  openModelMeasurement(){
    const modelRef = this.modelService.open(AddLandMeasuringComponent, { size: 'sm' });
  }
}
