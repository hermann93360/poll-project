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
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
