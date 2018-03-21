import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

import { UserService } from '../../user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onLogOut() {
    this._userService.logout();
    this._flashMessagesService.show('You are successfully logged out', {
      cssClass: 'alert-success', timeout: 2000
    });
    this._router.navigate(['/login']);
    return false;
  };


}
