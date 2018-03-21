
import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';


@Component({
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.css']
})
export class ManageEmployeesComponent implements OnInit {

  employees: Employee[];

  constructor(
    public _employeeService: EmployeeService,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(){
    this._employeeService.getEmployees()
        .subscribe(data => {
          this.employees = data;
        })
  }

  // Delete single employee
  deleteEmployee(id){
    this._employeeService.deleteEmployee(id)
        .subscribe(() => {
          this._flashMessagesService.show('Employee deleted successfully',
            {cssClass: 'alert-success', timeout: 3000 });
          this.getEmployees();
        });
  }
}
