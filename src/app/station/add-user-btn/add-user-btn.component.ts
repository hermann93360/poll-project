import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {UsersManagementService} from "../../../service/users-management.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {PollingStationService} from "../../../service/polling-station.service";

@Component({
  selector: 'app-add-user-btn',
  templateUrl: './add-user-btn.component.html',
  styleUrls: ['./add-user-btn.component.scss']
})
export class AddUserBtnComponent implements OnInit{

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  memberCtrl = new FormControl('');
  filteredMembers: Observable<string[]> | undefined;
  member: string[] = [];
  allMembers: string[] = [];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  size!: string;

  @Input()
  public pollingStationId: string = ""

  public displayAddUserForm = false;
  constructor(private usersService: UsersManagementService, private pollingStationService: PollingStationService) {
    this.filteredMembers = this.memberCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allMembers.slice())),
    );
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


  showyAddUserForm() {
    this.displayAddUserForm = !this.displayAddUserForm;
  }

  addUser(email: string[]) {
    email.forEach(e => this.pollingStationService.createDemand(this.pollingStationId, e).subscribe((value) => {
      console.log("demand sended");
    }))
  }
}
