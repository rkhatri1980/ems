import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  model = new Employee();
  id = this._route.snapshot.params['id'];

  constructor(
    public _employeeService: EmployeeService, 
    public _router: Router,
    public _route: ActivatedRoute,
    public _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getEmployee();
  }

  // first get data
  getEmployee(){
    this._employeeService.getEmployee(this.id)
        .subscribe(employees => {
          this.model = employees;
        })
  }
   // update employee method
   updateEmployee(){
    this._employeeService.updateEmployee(this.id, this.model)
    .subscribe(() => {
      this._flashMessagesService.show('Employee updated successfully',
        {cssClass: 'alert-success', timeout: 3000 });
        this.goBack();
    });
  }


  goBack(){
    this._router.navigate(['employee/manage-employee']);
  }

}
