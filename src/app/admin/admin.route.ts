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
        }
        ]
    }
];
