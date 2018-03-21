import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employees: Employee[];

  constructor(public _employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(){
    this._employeeService.getEmployees()
        .subscribe(employeees => {
          this.employees = employeees;
        })
  }
}
