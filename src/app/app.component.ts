import { Component } from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from "@angular/router";
import {routeAnimationFade, slideInAnimation} from "../animations/animations";

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

  constructor(private contexts: ChildrenOutletContexts) {
  }
  prepareRoute(outlet: RouterOutlet) {
    //@ts-ignore
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animations'];
  }
}
