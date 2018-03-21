import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Employee } from './employee';

@Injectable()
export class EmployeeService {

  private _employeeUrl = 'http://localhost:8080/employee/';

  constructor(private _http: Http) {
    console.log('Service is running ..');
  }

  // Get all employees method
  getEmployees() {
    return this._http.get(this._employeeUrl)
                .map(res => res.json());
  }

  // Get single employee method
  getEmployee(id) {
    return this._http.get(this._employeeUrl + id)
                .map(res => res.json());
  }

  // Insert Employee method
  addEmployee(info) {
    return this._http.post(this._employeeUrl, info)
                .map(res => res.json());
  }

  // Delete employee method
  deleteEmployee(id) {
    return this._http.delete(this._employeeUrl + id)
                .map(res => res.json());
  }

  // Update employee method
  updateEmployee(id, info) {
    return this._http.put(this._employeeUrl + id, info)
                .map(res => res.json());
  }



  // getEmployees():Observable<Employee[]>{
  //   return this._http.get(this._employeeUrl)
  //               .map((response: Response) => <Employee[]> response.json())
  //               .catch(this.handleError);
  // }

  // private handleError(error:Response){
  //   return Observable.throw(error.json().error)
  // }


}
