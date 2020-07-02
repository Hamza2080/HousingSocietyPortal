import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  public isLoaded = false;
  public employeesList = []
  public p = 1;
  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllEployees();
  }
  getAllEployees() {
    this.isLoaded = true;
    this.adminService.getAllEmployees().then(res => {
      this.employeesList = res as any[];
      this.isLoaded = false;
    }).catch(err => {
      console.log(err);
      this.isLoaded = false;
    });
  }
  removeEployees(item) {
    this.adminService.deleteEmployee(item.townId,item.id).then(res => {
      this.getAllEployees();
    }).catch(err => {
      console.log(err);
    });
  }
  openAddModel() {
    const modelRef = this.modalService.open(AddEmployeesComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.result.then((data) => {
      if (data) {
        this.getAllEployees();
      }
    });
  }
  openUpdateModel(item) {
    const modelRef = this.modalService.open(AddEmployeesComponent, { size: 'lg', backdrop : 'static', keyboard : false });
    modelRef.componentInstance.payload = item;
    modelRef.componentInstance.isEdit = true;
    modelRef.result.then((data) => {
      if (data) {
        this.getAllEployees();
      }
    });
  }
}
