import {Component, OnInit} from '@angular/core';
import {AddGradeRequest, AddGradesInSessionRequest} from "../../../model/request/up/AddGradesInSessionRequest";
import _default from "chart.js/dist/core/core.interaction";
import index = _default.modes.index;
import {Session} from "../../../model/up/Session";
import {SessionService} from "../../../service/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-grade-session',
  templateUrl: './grade-session.component.html',
  styleUrls: ['./grade-session.component.scss']
})
export class GradeSessionComponent implements  OnInit{


  public grades!: AddGradesInSessionRequest;
  public selectedOption: string = "";
  public test: Session = Session.EMPTY;
  public graded = false;

  public index = 0;

  constructor(private sessionService: SessionService, private router: Router) {
  }
  ngOnInit(): void {
    this.sessionService.currentSession.subscribe(
      (value) => {
        if(value.sessionId == "") {
          this.router.navigate(["/session"])
        }
        this.grades = new AddGradesInSessionRequest(this.test.sessionId, this.test.personId, []);
        console.log(this.test);
        console.log(value);
        this.test = value;
      }
    )
  }

  next() {
    if(this.index + 1 == this.test.groupsOfSession.length){
      throw Error("Impossible");
    }
    this.index++
    let nextGroup = this.grades.grades.find(g => g.groupId == this.test.groupsOfSession[this.index].groupId);
    console.log(nextGroup)
    this.selectedOption = nextGroup != undefined ? nextGroup.grade : "";
  }

  previous() {
    if(this.index - 1 < 0){
      throw Error("Impossible");
    }
    this.index--
    let previousGroup = this.grades.grades.find(g => g.groupId == this.test.groupsOfSession[this.index].groupId);
    this.selectedOption = previousGroup != undefined ? previousGroup.grade : "";
  }

  onRadioChange(event: any) {
    this.selectedOption = event.target.value;
    console.log(this.selectedOption); // Affiche la valeur sélectionnée dans la console

    let grade = this.grades.grades.find(g => g.groupId == this.test.groupsOfSession[this.index].groupId);
    if(grade == undefined) {
      this.grades.grades.push(new AddGradeRequest(this.test.groupsOfSession[this.index].groupId, this.test.personId, this.selectedOption))
      console.log(this.grades.grades)
    }else{
      grade.grade = this.selectedOption;
      console.log(this.grades.grades)

    }


  }

  gradeThisSession() {
    console.log(this.grades.sessionId)
    this.sessionService.gradeGroup(this.grades.sessionId, this.grades).subscribe(
      (value) => {
        console.log("graded!")
        this.graded = true;

        setTimeout(() => {
          this.router.navigate(['/session']);
        }, 2000)
      }
    )
  }
}
