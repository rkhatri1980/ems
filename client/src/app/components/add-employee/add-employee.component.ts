import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  model = new Employee();
  constructor(
    public _employeeService: EmployeeService,
    public _router: Router,
    public _route: ActivatedRoute,
    public _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  // add employee method
  addEmployee(){
    this._employeeService.addEmployee(this.model)
        // .subscribe(() => this.goBack());
        .subscribe(() => {
          this._flashMessagesService.show('Employee added successfully',
            {cssClass: 'alert-success', timeout: 3000 });
            this.goBack();
        });
  }

  goBack() {
    this._router.navigate(['dashboard']);
  }

}
