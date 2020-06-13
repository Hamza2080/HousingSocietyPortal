import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddManagerComponent } from '../add-manager/add-manager.component';

@Component({
  selector: 'app-view-manager',
  templateUrl: './view-manager.component.html',
  styleUrls: ['./view-manager.component.css']
})
export class ViewManagerComponent implements OnInit {
  public managers = [];
  public searchText = null;
  public isLoaded = false;
  constructor(private modelService:NgbModal,private adminService: AdminService) { }

  ngOnInit() {
    this.getManager();
  }
  getManager() {
    this.isLoaded = true;
    this.adminService.getAllManager().then(res => {
      this.managers = res as any[];
      this.isLoaded = false;
      console.log(this.managers)
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }
  openModel() {
    const modelRef = this.modelService.open(AddManagerComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    // modelRef.componentInstance.providerId = providerId;
  }
}
