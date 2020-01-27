import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';

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
  }
  getManager() {
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
    const modelRef = this.modelService.open(LandComponent, { size: 'lg' });
    // modelRef.componentInstance.providerId = providerId;
  }
  openModelMeasurement(){

  }
}
