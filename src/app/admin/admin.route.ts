import { Router, Routes } from "@angular/router";
import { ViewManagerComponent } from './view-manager/view-manager.component';
import { AdminComponent } from './admin.component';
import { TownComponent } from './town/town.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { AddLandMeasuringComponent } from './add-land-measuring/add-land-measuring.component';
import { LandComponent } from './land/land.component';
import { ViewLandLordComponent } from './view-land-lord/view-land-lord.component';
import { AuthorizedDealerComponent } from './authorized-dealer/authorized-dealer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewPlotsComponent } from './view-plots/view-plots.component';
import { ExpenseComponent } from './expense/expense.component';
import { StreetComponent } from './street/street.component';
import { ParkComponent } from './park/park.component';
import { PublicBuildingComponent } from './public-building/public-building.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [{
            path: 'manager',
            component: ViewManagerComponent
        },
        {
            path: 'Town',
            component: TownComponent
        },
        {
            path: 'payment-plan',
            component: PaymentPlanComponent
        },
        {
            path: 'land',
            component: LandComponent
        },
        {
            path: 'landlord',
            component: ViewLandLordComponent
        },
        {
            path: 'authorized-dealer',
            component: AuthorizedDealerComponent
        },
        {
            path: 'customers',
            component: ViewCustomerComponent
        },
        {
            path: 'plots',
            component: ViewPlotsComponent
        },
        {
            path: 'street',
            component: StreetComponent
        },
        {
            path: 'park',
            component: ParkComponent
        },
        {
            path: 'public-building',
            component: PublicBuildingComponent
        },
        {
            path: 'expense',
            component: ExpenseComponent
        }
        ]
    }
];
