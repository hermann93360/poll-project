import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticationComponent} from './users/authentication/authentication.component';
import {AccountComponent} from './users/account/account.component';
import {ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuardService} from "../service/auth-guard.service";
import { BoardComponent } from './board/board.component';
import { BoardNavComponent } from './board/board-nav/board-nav.component';
import {NgOptimizedImage} from "@angular/common";
import { LineComponent } from './board/components/line/line.component';
import { ButtonNavComponent } from './board/components/button-nav/button-nav.component';
import { HeaderDashComponent } from './board/header-dash/header-dash.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatInputModule} from "@angular/material/input";
import { PollingStationListComponent } from './board/polling-station-list/polling-station-list.component';
import { PollingStationCardComponent } from './board/components/polling-station-card/polling-station-card.component';

const appRoutes: Routes = [
  {
    path: 'users', component: UsersComponent, children: [
      {
        path: 'create',
        component: AccountComponent,
      },
      {
        path: 'login',
        component: AuthenticationComponent,
      },
    ]
  },
  {path: 'dashboard', component: BoardComponent, canActivate: [AuthGuardService]},
  {path: '', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AuthenticationComponent,
    AccountComponent,
    HomeComponent,
    DashboardComponent,
    BoardComponent,
    BoardNavComponent,
    LineComponent,
    ButtonNavComponent,
    HeaderDashComponent,
    PollingStationListComponent,
    PollingStationCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule

  ],
  exports: [
    MatSlideToggleModule,
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
