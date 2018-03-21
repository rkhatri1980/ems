import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from './guards/auth-guard.service';

import { HomeComponent } from "./components/home/home.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { ManageEmployeesComponent } from "./components/manage-employees/manage-employees.component";
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";
import { EmployeeDetailComponent } from "./components/employee-detail/employee-detail.component";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'employee/create', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employee/manage-employee', component: ManageEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'edit-employee-detail/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employee-detail/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
