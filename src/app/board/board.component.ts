import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  public isMobile: boolean = false;
  public displayNav: any | boolean;

  constructor() {
    this.setIsMobile(window.innerWidth);
  }

  showNav(data: boolean) {
    this.displayNav = data;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setIsMobile(event.target.innerWidth);
  }

  setIsMobile(width: number) {
    this.isMobile = width < 1024;
  }

}
