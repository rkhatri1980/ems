import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

import { UserService } from "../../user.service";
import { User } from "../../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  show: boolean = false;
  user = new User();

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }


  onRegisterSubmit() {
    // email validation
    if (!this._userService.validateEmail(this.user.email)) {
      this._flashMessagesService.show('Please use a valid email!', {cssClass: 'alert-danger', timeout: 3000});
    } else {
      this._userService.registerUser(this.user)
        .subscribe(data => {
          console.log(data, this.user);
          if (data.success) {
            this._flashMessagesService.show(data.message, {
              cssClass: 'alert-success',
              timeout: 3000
            });
            this._router.navigate(['/login']);
          } else {
            this._flashMessagesService.show(data.message,
              {cssClass: 'alert-danger', timeout: 2000});
            this._router.navigate(['/register']);
          }
        });
    }
  }
}
