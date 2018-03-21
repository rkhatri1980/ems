import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class UserService {
  private registerUrl = 'http://localhost:8080/users/register';
  private loginUrl = 'http://localhost:8080/users/login';
  user: any;
  token: any;

  constructor(private  _http: Http) { }

// validate email
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

// Register User method
  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.registerUrl, user, {headers: headers})
      .map(res => res.json());
  }

//  Login authenticate user
  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.loginUrl, user, {headers: headers})
      .map(res => res.json());

  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  // JWT authentication token check for can-activate
  isAuthenticated(): boolean {
    // Check whether the token is expired and return
    // true or false
    return tokenNotExpired();
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.user = null;
    this.token = null;
    localStorage.clear();
  }

}
