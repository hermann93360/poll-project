import { Component,  OnInit } from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {ManagePersonRequest} from "../../../model/request/up/ManagePersonRequest";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnInit{

  public setup = false;
  public code = ""
  public ok = false
  public path = ""
  error: string[] = [
    'Les resultats de cette session de vote n\'est pas encore disponible',
    'Cette session de vote n\'existe pas ou n\'est pas encore active',
    'Il n\'est pas possible de voter une seconde fois '
  ]
  errorIndex = -1;

  constructor(private sessionService: SessionService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(){
    this.route.params.subscribe(parem => {
      this.path = parem['path'];
    })
  }

  submitCode(code: string) {
    if(code.length == 7) {

      this.sessionService.checkSessionExist(code).subscribe(
        (value) => {
          if(value){
            this.errorIndex = -1;
            this.code = code;
            this.setup = true;
            if(this.path == 'results') {
              this.getResults(code);
            }
            console.log(code)
          }else{
            this.errorIndex = 1;
          }
        }
      )
    }else{
      this.errorIndex = -1
    }
  }

  getResults(code: string) {
    this.sessionService.getResults(this.code).subscribe((value) => {
      this.errorIndex = -1;
      this.router.navigate(['/results'])
      this.sessionService.currentResults.next(value);
    },error => {
      this.errorIndex = 0;
    })
  }

  gradeSession(name: string, email: string) {
    if(this.isValidEmail(email)){
      const request = new ManagePersonRequest(name, email);

      this.sessionService.getSession(this.code, request).subscribe(
        (value) => {
          this.sessionService.currentSession.next(value);
          this.router.navigate(['/session/grade/'+this.code]);
        },
        error =>{
          console.log(error.error.message)
          if(error.error.message == "This person has already grade"){
            this.errorIndex = 2;
          }
        }
      );
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }
}
