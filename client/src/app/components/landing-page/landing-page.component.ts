import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  show: boolean = true;

  constructor( ) { }

  ngOnInit() {
  }

}
