import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header-dash',
  templateUrl: './header-dash.component.html',
  styleUrls: ['./header-dash.component.scss']
})
export class HeaderDashComponent {

  @Output() showNav = new EventEmitter<boolean>();

  showNavMethod() {
    this.showNav.emit(true);
  }

  hideNavMethod() {
    this.showNav.emit(false);
  }
}
