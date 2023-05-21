import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AddPersonInGroupRequest, UpdateGroupRequest} from "../../../model/request/up/UpdateGroupRequest";
import {ManagePersonRequest} from "../../../model/request/up/ManagePersonRequest";
import {SessionService} from "../../../service/session.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-configure-group',
  templateUrl: './configure-group.component.html',
  styleUrls: ['./configure-group.component.scss']
})
export class ConfigureGroupComponent implements OnInit {

  public personInGroup: AddPersonInGroupRequest[] = []

  public error: boolean = false;

  public loaded = false;

  public errorMessage = [
    'Vous avez deja ajoute cette personne à votre groupe',
    "Veuillez rentrer uniquement des emails EFREI"
  ]
  public errorNumber = 0;

  public groupId: string = "";

  public isConfigured = true
  public notExist = true

  @ViewChild('nameOfGroup') private nameGroup!: ElementRef;
  @ViewChild('name') private nameInput!: ElementRef;
  @ViewChild('email') private email!: ElementRef;

  constructor(private sessionService: SessionService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];

      this.sessionService.getGroup(this.groupId).subscribe(
        (value) => {
          console.log(value.configured)
          this.isConfigured = value.configured;
          this.notExist = false;
          this.loaded = true;
        },
        (error) => {
          this.isConfigured = false
          console.log(error)
          this.loaded = true;

        }
      )
      console.log(this.groupId)
    })
  }

  add(name: string, email: string) {

    if (this.personInGroup.find(r => r.email == email)) {
      this.error = true;
      this.errorNumber = 0;
      this.nameInput.nativeElement.value = ""
      this.email.nativeElement.value = ""
      throw Error("impossible")
    }

    if (!this.isValidEfreiEmail(email)) {
      this.error = true;
      this.errorNumber = 1;
      throw Error("impossible")
    }


    this.personInGroup.push(new AddPersonInGroupRequest(name, email));
    this.nameInput.nativeElement.value = ""
    this.email.nativeElement.value = ""
    this.error = false;
    console.log(this.personInGroup)
  }

  isValidEfreiEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@(efrei\.net|efrei\.fr)$/;
    return emailRegex.test(email);
  }


  protected readonly AddPersonInGroupRequest = AddPersonInGroupRequest;

  remove(email: string) {
    this.personInGroup = this.personInGroup.filter(person => person.email !== email);
  }

  updateGroup() {
    const nameOfGroup = this.nameGroup.nativeElement.value;
    if (nameOfGroup == "") {
      throw Error("Nom du groupe est manquant")
    }

    const request = new UpdateGroupRequest(nameOfGroup, this.personInGroup)
    this.sessionService.updateGroup(this.groupId, request).subscribe((value) => {
      console.log("group updated !")
    })
  }
}
