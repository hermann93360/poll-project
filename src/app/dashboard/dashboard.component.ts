import {Component, OnInit} from '@angular/core';
import {UserDetails} from "../../model/User";
import {UsersManagementService} from "../../service/users-management.service";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {advancedFadeAnimation, slideInAnimation} from "../../animations/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    advancedFadeAnimation,
    slideInAnimation
  ]
})
export class DashboardComponent implements OnInit{

  title = ""
  constructor(private userService: UsersManagementService, private route: ActivatedRoute, private router: Router) {

    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          switch (event.url) {
            case "/":
              this.title = "Choisissez ce que vous voulez faire ?"
              break
            case "/session/join":
              this.title = "Il sera bientot temps pour vous de voter"
              break
            case "/session/create":
              this.title = "Creez votre salon personnalisable"
              break
            case "/session/grade":
              this.title = "Creez votre salon personnalisable"
              break
            case "/session/results":
              this.title = "Retrouvez les meilleurs prestation"
              break
          }
        }
      }
    )

  }

  ngOnInit() {

  }

  prepareRoute(outlet: RouterOutlet) {
    //@ts-ignore
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animations'];
  }

}
