import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ManageEmployeesComponent } from './components/manage-employees/manage-employees.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';

import { AppRoutingModule } from "./app-routing.module";
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {UserService} from "./user.service";
import {EmployeeService} from "./employee.service";
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManageEmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeDetailComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    LandingPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [UserService, EmployeeService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
