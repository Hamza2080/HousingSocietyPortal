import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTownsComponent } from '../add-towns/add-towns.component';

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.css']
})
export class TownComponent implements OnInit {
  public townList = []
  public isLoaded = false;
  constructor(private adminService: AdminService,private modalService:NgbModal) { }

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
      const modelRef = this.modalService.open(AddTownsComponent, { size: 'lg' });
      // modelRef.componentInstance.providerId = providerId
      modelRef.result.then((data) => {
        // console.log('modal is closed', data);
        if(data){
          this.getTowns();
        }
    
      })
  }
}
