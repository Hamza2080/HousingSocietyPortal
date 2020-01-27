import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ViewManagerComponent } from './view-manager/view-manager.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.route';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { AddLandMeasuringComponent } from './add-land-measuring/add-land-measuring.component';
import { TownComponent } from './town/town.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { LandComponent } from './land/land.component';
@NgModule({
  entryComponents:[
    AddManagerComponent
  ],
  declarations: [AdminComponent, ViewManagerComponent, SideBarComponent, NavBarComponent, AddManagerComponent, AddLandMeasuringComponent, TownComponent, PaymentPlanComponent, LandComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
