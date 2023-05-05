import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  displayNav!: boolean;

  constructor() {
    this.displayNav = false;
  }

  showNav() {
    this.displayNav = !this.displayNav;
  }

}
