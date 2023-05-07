import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-board-nav',
  templateUrl: './board-nav.component.html',
  styleUrls: ['./board-nav.component.scss']
})
export class BoardNavComponent {

  @Output() showNav = new EventEmitter<boolean>();
  public belowNavyProfile: boolean;
  public belowNavPollingStation: boolean;

  constructor() {
    this.belowNavyProfile = false;
    this.belowNavPollingStation = false;
  }

  hideNavMethod() {
    this.showNav.emit(false);
  }

  showBelowNavProfil() {
    this.belowNavyProfile = !this.belowNavyProfile;
    this.belowNavPollingStation = false;
  }

  showBelowPollingStation() {
    this.belowNavPollingStation = !this.belowNavPollingStation;
    this.belowNavyProfile = false;
  }
}
