import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {CreatePollingStationForm} from "../../../model/form/CreatePollingStationForm";
import {PollingStationService} from "../../../service/polling-station.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Observable} from "rxjs";

interface Pokemon {
  value: string;
  viewValue: string;
}

export interface Keyword {
  name: string;
}

@Component({
  selector: 'app-create-polling-station-form',
  templateUrl: './create-polling-station-form.component.html',
  styleUrls: ['./create-polling-station-form.component.scss']
})
export class CreatePollingStationFormComponent {

  today = new Date();
  pokemonControl = new FormControl('');

  hide = true;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keywords: Keyword[] = [];
  panelOpenState = false;

  public createPollingStationForm: CreatePollingStationForm;

  constructor(private _formBuilder: FormBuilder, private pollingStationService: PollingStationService) {
    this.createPollingStationForm = new CreatePollingStationForm(_formBuilder);
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

  createPollingStation() {
    const createPollingStationRequest = this.createPollingStationForm.constructRequest();
    this.pollingStationService.createPollingStation(createPollingStationRequest)
  }

  displayFieldPrivate() {
    return this.createPollingStationForm.isPrivate();
  }






  addEmailInvited(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  removeEmailInvited(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]> | undefined;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  size!: string;

  selectedEmailInvited(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  display(size: string) {
    this.size = size;
    console.log(this.createPollingStationForm.firstStepForm.value)
    console.log(this.createPollingStationForm.secondStepForm.value)
    console.log(this.createPollingStationForm.finalStep.value)
    console.log(this.createPollingStationForm.constructRequest())
  }
}
