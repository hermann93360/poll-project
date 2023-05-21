import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ManagePersonRequest} from "../../../model/request/up/ManagePersonRequest";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

  public administratorTeam: ManagePersonRequest[] = [];

  @Output()
  public groupsList: EventEmitter<ManagePersonRequest[]> = new EventEmitter<ManagePersonRequest[]>();

  @Input()
  public numberOfGroups: number = 2;

  public currentNumber: number = 1;

  public error: boolean = false;
  public summary: boolean = false;

  public errorMessage = [
    'Vous avez deja ajoute ce chef de groupe',
    "Veuillez rentrer uniquement des emails EFREI"
  ]
  public errorNumber = 0;

  @ViewChild('name') private nameInput!: ElementRef;
  @ViewChild('email') private email!: ElementRef;

  add(name: string, email: string) {
    console.log(this.currentNumber)
    console.log(this.numberOfGroups)

    if(this.administratorTeam.find(r => r.emailOfRequesting == email)){
      this.error = true;
      this.errorNumber = 0;
      this.nameInput.nativeElement.value = ""
      this.email.nativeElement.value = ""
      throw Error("impossible")
    }

    if(!this.isValidEfreiEmail(email)){
      this.error = true;
      this.errorNumber = 1;
      throw Error("impossible")
    }

    if(this.currentNumber == this.numberOfGroups) {
      this.summary = true;
    }

    this.administratorTeam.push(new ManagePersonRequest(name, email));
    this.groupsList.emit(this.administratorTeam);
    this.currentNumber++;
    this.nameInput.nativeElement.value = ""
    this.email.nativeElement.value = ""
    this.error = false;
    console.log(this.administratorTeam);
  }

  isValidEfreiEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@(efrei\.net|efrei\.fr)$/;
    //return emailRegex.test(email);
    return true;
  }

  resetForm() {
    this.summary = false;
    this.administratorTeam = [];
    this.currentNumber = 1;
  }
}
