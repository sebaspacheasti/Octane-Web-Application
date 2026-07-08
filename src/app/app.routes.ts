import { Routes } from '@angular/router';
import {DashboardOwnerPage} from '@app/public/presentation/views/dashboard-owner-page/dashboard-owner-page';
import {VehiclesPage} from '@app/vehiclemanagement/presentation/views/vehicles-page/vehicles-page';
import {VehicleDetailsPage} from '@app/vehiclemanagement/presentation/views/vehicle-details-page/vehicle-details-page';
import {SignInPage} from '@app/iam/presentation/views/sign-in/sign-in.page';
import {SignUpPage} from '@app/iam/presentation/views/sign-up/sign-up.page';
import {DashboardMechanicPage} from '@app/public/presentation/views/dashboard-mechanic-page/dashboard-mechanic-page';
import {RoleSelectionPage} from '@app/iam/presentation/views/role-selection/role-selection.page';
import {VerifyOwner} from '@app/iam/presentation/views/verify-owner/verify-owner';
// TODO: Uncomment when vehicle-wellness module is fully implemented
// import {WellnessMetricPage} from '@app/vehicle-wellness/presentation/views/wellness-metric-page/wellness-metric-page';
import {ComparePageComponent} from '@app/comparatives/pages/compare-page/compare-page.component';
import {CompareMechanicComponent} from '@app/comparatives/pages/compare-mechanic/compare-mechanic.component';
import {authenticationGuard} from '@app/iam/services/authentication.guard';
import {MembershipPage} from '@app/membership/presentation/components/membership-page/membership-page';

const assignmentsRoutes = () => import('@app/assignments/presentation/assignments.routes').then(m => m.assignmentsRoutes);
const expensesRoutes = () => import('@app/maintenance-and-operations/presentation/expense.routes').then(m => m.expenseRoutes);
const maintenanceRoutes = () => import('@app/maintenance-and-operations/presentation/maintenance.routes').then(m => m.maintenanceRoutes);

export const routes: Routes = [
  { path: '', redirectTo: "/sign-in", pathMatch: 'full' },
  { path: "selection", component: RoleSelectionPage },
  { path: "sign-in", component: SignInPage },
  { path: "sign-up", component: SignUpPage },
  { path: "verify", component: VerifyOwner },
  { path: "owner-dashboard", component: DashboardOwnerPage, canActivate: [authenticationGuard]},
  { path: "mechanic-dashboard", component: DashboardMechanicPage, canActivate: [authenticationGuard]},
  { path: "compare", component: ComparePageComponent, canActivate: [authenticationGuard] },
  { path: "compare-mechanic", component: CompareMechanicComponent, canActivate: [authenticationGuard] },
  { path: "assignments", loadChildren: assignmentsRoutes, canActivate: [authenticationGuard] },
  { path: "maintenances", loadChildren: maintenanceRoutes, canActivate: [authenticationGuard] },
  { path : "expenses", loadChildren: expensesRoutes, canActivate: [authenticationGuard]},
  { path: "membership", component: MembershipPage, canActivate: [authenticationGuard] },
  { path: "vehicles", component: VehiclesPage, canActivate: [authenticationGuard] },
  { path: "vehicle/:vehicleId/:role", component: VehicleDetailsPage, canActivate: [authenticationGuard] },
  // TODO: Uncomment when vehicle-wellness module is ready
  // {path: 'wellness-metrics',component: WellnessMetricPage, canActivate: [authenticationGuard] }
];
