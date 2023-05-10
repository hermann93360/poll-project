import {Component, EventEmitter, Output} from '@angular/core';
import {UsersManagementService} from "../../../service/users-management.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-nav',
  templateUrl: './board-nav.component.html',
  styleUrls: ['./board-nav.component.scss']
})
export class BoardNavComponent {

  @Output() showNav = new EventEmitter<boolean>();
  public belowNavyProfile: boolean;
  public belowNavPollingStation: boolean;
  public nameOfUserLogged!: string;

  constructor(private userService: UsersManagementService, private router: Router) {
    this.belowNavyProfile = false;
    this.belowNavPollingStation = false;
    this.getNameOfUserLogged();
  }

  logout() {
    this.reloadPage()
    this.userService.logout();
  }

  reloadPage() {
    this.router.navigate(['/'])
    window.location.reload();
  }
  getNameOfUserLogged() {
    this.userService.getUser().subscribe(
      (name) => {
        this.nameOfUserLogged = name.username + " " + name.nickname;
      }
    )
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
