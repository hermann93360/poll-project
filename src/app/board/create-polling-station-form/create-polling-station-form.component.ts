import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {CreatePollingStationForm} from "../../../model/form/CreatePollingStationForm";
import {PollingStationService} from "../../../service/polling-station.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {UsersManagementService} from "../../../service/users-management.service";

export interface Keyword {
  name: string;
}

@Component({
  selector: 'app-create-polling-station-form',
  templateUrl: './create-polling-station-form.component.html',
  styleUrls: ['./create-polling-station-form.component.scss']
})
export class CreatePollingStationFormComponent implements OnInit{

  @Output() pollingStationCreated = new EventEmitter<boolean>();
  today = new Date();
  pokemonControl = new FormControl('');

  hide = true;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keywords: Keyword[] = [];
  panelOpenState = false;

  public createPollingStationForm: CreatePollingStationForm;

  constructor(private _formBuilder: FormBuilder, private pollingStationService: PollingStationService, private usersService: UsersManagementService) {
    this.createPollingStationForm = new CreatePollingStationForm(_formBuilder);
    this.filteredMembers = this.memberCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allMembers.slice())),
    );
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.keywords.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(keyword: Keyword): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  edit(keyword: Keyword, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(keyword);
      return;
    }

    // Edit existing fruit
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords[index].name = value;
    }
  }

  disabledbutton() {
    return !this.createPollingStationForm.finalStep.valid &&
      (this.createPollingStationForm.isPrivate() && this.createPollingStationForm.secondStepForm.value['password']?.length == 0) ||
      (!this.createPollingStationForm.isPrivate() && this.createPollingStationForm.secondStepForm?.value['userLimit'] == 0);
  }
  createPollingStation() {
    const createPollingStationRequest = this.createPollingStationForm.constructRequest();
    this.pollingStationService.createPollingStation(createPollingStationRequest)
    this.pollingStationCreated.emit(true);
  }

  displayFieldPrivate() {
    return this.createPollingStationForm.isPrivate();
  }






  addEmailInvited(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
    }

    // Clear the input value
    event.chipInput!.clear();

    this.memberCtrl.setValue(null);
  }

  removeEmailInvited(fruit: string): void {
    const index = this.member.indexOf(fruit);

    if (index >= 0) {
      this.member.splice(index, 1);
    }
  }


  memberCtrl = new FormControl('');
  filteredMembers: Observable<string[]> | undefined;
  member: string[] = [];
  allMembers: string[] = [];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  size!: string;

  ngOnInit(): void {
    this.usersService.users.subscribe(
      (value) => {
        this.allMembers = value.map(user => user.email)
      }
    )
  }

  selectedEmailInvited(event: MatAutocompleteSelectedEvent): void {
    this.member.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.memberCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMembers.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  display(size: string) {
    this.size = size;
    console.log(this.createPollingStationForm.firstStepForm.value)
    console.log(this.createPollingStationForm.secondStepForm.value)
    console.log(this.createPollingStationForm.finalStep.value)
    console.log(this.createPollingStationForm.constructRequest())
  }
}
