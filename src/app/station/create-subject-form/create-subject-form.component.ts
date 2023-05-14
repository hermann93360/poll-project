import {Component, Input} from '@angular/core';
import {CreateSubjectForm} from "../../../model/form/CreateSubjectForm";
import {FormBuilder} from "@angular/forms";
import {PollingStationService} from "../../../service/polling-station.service";

@Component({
  selector: 'app-create-subject-form',
  templateUrl: './create-subject-form.component.html',
  styleUrls: ['./create-subject-form.component.scss']
})
export class CreateSubjectFormComponent {

  @Input()
  public pollingStationId!: string

  public createSubjectForm: CreateSubjectForm;

  constructor(private formBuilder: FormBuilder, private pollingStationService: PollingStationService) {
    this.createSubjectForm = new CreateSubjectForm(formBuilder);
  }

  createSubject() {
    const request = this.createSubjectForm.constructRequest();
    this.pollingStationService.createAndAddSubject(this.pollingStationId, request);
  }
}
