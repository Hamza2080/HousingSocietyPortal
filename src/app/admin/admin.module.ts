import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ViewManagerComponent } from './view-manager/view-manager.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.route';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { AddLandMeasuringComponent } from './add-land-measuring/add-land-measuring.component';
import { TownComponent } from './town/town.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { LandComponent } from './land/land.component';
import { AddTownsComponent } from './add-towns/add-towns.component';
import { ViewLandLordComponent } from './view-land-lord/view-land-lord.component';
import { AddLandLordComponent } from './add-land-lord/add-land-lord.component';
import { AddLandComponent } from './add-land/add-land.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { AuthorizedDealerComponent } from './authorized-dealer/authorized-dealer.component';
import { AddAuthorizedDealerComponent } from './add-authorized-dealer/add-authorized-dealer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddPaymentPlanComponent } from './add-payment-plan/add-payment-plan.component';
import { ViewPlotsComponent } from './view-plots/view-plots.component';
import { AddPlotsComponent } from './add-plots/add-plots.component';
import { PlotCategoriesComponent } from './plot-categories/plot-categories.component';
import { InstallmentComponent } from './installment/installment.component';
import { EditLandLordComponent } from './edit-land-lord/edit-land-lord.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ExpenseComponent } from './expense/expense.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { DataTablesModule } from 'angular-datatables';
import { LandDetailViewComponent } from './land-detail-view/land-detail-view.component';
import { AddExpenseTypeComponent } from './add-expense-type/add-expense-type.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';

@NgModule({
  entryComponents: [
    AddManagerComponent,
    AddTownsComponent,
    AddLandMeasuringComponent,
    AddExpenseTypeComponent,
    UpdateExpenseComponent,
    AddLandLordComponent,
    AddExpenseComponent,
    AddLandComponent,
    AddAuthorizedDealerComponent,
    AddCustomerComponent,
    AddPaymentPlanComponent,
    AddPlotsComponent,
    PlotCategoriesComponent,
    LandDetailViewComponent,
    InstallmentComponent,
    EditLandLordComponent,
    ExpenseComponent
  ],
  declarations: [AdminComponent, ViewManagerComponent, SideBarComponent, NavBarComponent, UpdateExpenseComponent, AddExpenseComponent, LandDetailViewComponent, ExpenseComponent, AddManagerComponent, AddLandMeasuringComponent, AddExpenseTypeComponent, TownComponent, PaymentPlanComponent, LandComponent, AddTownsComponent, ViewLandLordComponent, AddLandLordComponent, AddLandComponent, ViewCustomerComponent, AuthorizedDealerComponent, AddAuthorizedDealerComponent, AddCustomerComponent, AddPaymentPlanComponent, ViewPlotsComponent, AddPlotsComponent, PlotCategoriesComponent, InstallmentComponent, EditLandLordComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BsDatepickerModule,
    NgbModule,
    RouterModule.forChild(AdminRoutes),
    FileUploadModule,
    DataTablesModule
  ]
})
export class AdminModule { }