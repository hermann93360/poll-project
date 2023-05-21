import { Component } from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from "@angular/router";
import {routeAnimationFade, slideInAnimation} from "../animations/animations";
import {SessionService} from "../service/session.service";
import {UsersManagementService} from "../service/users-management.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeAnimationFade,
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'poll-project';

  constructor(private contexts: ChildrenOutletContexts, private authService: UsersManagementService) {
  }
  prepareRoute(outlet: RouterOutlet) {
    //@ts-ignore
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animations'];
  }
}
