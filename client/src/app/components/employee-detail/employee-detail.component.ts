import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';

import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee;
  id = this._route.snapshot.params['id'];
  constructor(
    public _employeeService: EmployeeService, 
    public _router: Router,
    public _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getEmployee();
  }

  // Show employee details
  getEmployee(){
    this._employeeService.getEmployee(this.id)
        .subscribe(employees => {
          this.employee = employees;
        })
  }

  goBack(){
    this._router.navigate(['employee/manage-employee']);
  }

}
