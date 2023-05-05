import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  displayNav!: boolean;
  isMobile!: boolean;

  constructor() {
    this.displayNav = false;

    this.setIsMobile(window.innerWidth);

  }

  showNav() {
    this.displayNav = !this.displayNav;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setIsMobile(event.target.innerWidth);
  }

  setIsMobile(width: number) {
    this.isMobile = width < 1024;
  }

}
