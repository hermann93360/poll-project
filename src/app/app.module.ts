import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticationComponent} from './users/authentication/authentication.component';
import {AccountComponent} from './users/account/account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { ButtonDashboardComponent } from './board/components/button-dashboard/button-dashboard.component';
import { CreatePollingStationFormComponent } from './board/create-polling-station-form/create-polling-station-form.component';
import { TitleComponent } from './board/components/title/title.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {CreateSessionForm} from "../model/form/CreateSessionForm";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatExpansionModule} from "@angular/material/expansion";
import { PollingStationUserListComponent } from './board/polling-station-user-list/polling-station-user-list.component';
import { BarChartComponent } from './board/components/bar-chart/bar-chart.component';
import { PopupComponent } from './board/components/popup/popup.component';
import { StationComponent } from './station/station.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CardComponent } from './station/card/card.component';
import { CreateSubjectFormComponent } from './station/create-subject-form/create-subject-form.component';
import { ButtonStationComponent } from './station/button-station/button-station.component';
import { AddUserBtnComponent } from './station/add-user-btn/add-user-btn.component';
import { NotifyComponent } from './board/header-dash/notify/notify.component';
import { CardNotificationComponent } from './board/header-dash/notify/card-notification/card-notification.component';
import { ChooseComponent } from './dashboard/choose/choose.component';
import {MatEndDateHarness} from "@angular/material/datepicker/testing";
import { NavSessionComponent } from './dashboard/nav-session/nav-session.component';
import { CreateSessionComponent } from './dashboard/create-session/create-session.component';
import { AddGroupComponent } from './dashboard/add-group/add-group.component';
import { JoinSessionComponent } from './dashboard/join-session/join-session.component';
import { ConfigureGroupComponent } from './dashboard/configure-group/configure-group.component';
import { GradeSessionComponent } from './dashboard/grade-session/grade-session.component';
import { GradeCardComponent } from './dashboard/grade-card/grade-card.component';
import { ResultsSessionComponent } from './dashboard/results-session/results-session.component';

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
  {path: 'dashboard', component: BoardComponent, canActivate: [AuthGuardService], data: {animations: 'dashboard'}},
  {path: '', component: DashboardComponent, children: [
      {
        path: "create",
        component: CreateSessionComponent,
        data: {animations: 'create'}
      },
      {
        path: "join/:path",
        component: JoinSessionComponent,
        data: {animations: 'join'}
      },
      {
        path: "grade/:sessionId",
        component: GradeSessionComponent,
        data: {animations: 'grade'}
      },
      {
        path: "results",
        component: ResultsSessionComponent,
        data: {animations: 'results'}
      },

      {
        path: "",
        component: NavSessionComponent
      }
    ]},
  {path: 'station/:id', component: StationComponent, canActivate: [AuthGuardService], data: {animations: 'station'}},
  {
    path: "configure/:groupId",
    component: ConfigureGroupComponent
  }
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
    ButtonDashboardComponent,
    CreatePollingStationFormComponent,
    TitleComponent,
    PollingStationUserListComponent,
    BarChartComponent,
    PopupComponent,
    StationComponent,
    CardComponent,
    CreateSubjectFormComponent,
    ButtonStationComponent,
    AddUserBtnComponent,
    NotifyComponent,
    CardNotificationComponent,
    ChooseComponent,
    NavSessionComponent,
    CreateSessionComponent,
    AddGroupComponent,
    JoinSessionComponent,
    ConfigureGroupComponent,
    GradeSessionComponent,
    GradeCardComponent,
    ResultsSessionComponent,
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
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatSliderModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    FormsModule,

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
