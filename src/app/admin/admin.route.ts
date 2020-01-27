import { Router, Routes } from "@angular/router";
import { ViewManagerComponent } from './view-manager/view-manager.component';
import { AdminComponent } from './admin.component';
import { TownComponent } from './town/town.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { AddLandMeasuringComponent } from './add-land-measuring/add-land-measuring.component';
import { LandComponent } from './land/land.component';

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
        ]
    }
]