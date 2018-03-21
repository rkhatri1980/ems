import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

import { User } from "../../user";
import { UserService } from "../../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  user = new User();

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onLoginSubmit() {
    // console.log(this.user);
    this._userService.authenticateUser(this.user)
      .subscribe(data => {
        // console.log('this is login', data.user);
        if(data.success){
          this._userService.storeUserData(data.token, data.user);
          this._flashMessagesService.show('You are now logged in',
            {cssClass: 'alert-success', timeout: 3000 });
          this._flashMessagesService.grayOut(true);
          this._router.navigate(['dashboard']);
        } else {
          this._flashMessagesService.show(data.message,
            {cssClass: 'alert-danger', timeout: 3000 });
          this._flashMessagesService.grayOut(true);
          this._router.navigate(['/login']);
        }
      });
  };
}
