import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CreatePollingStationRequest} from "../request/CreatePollingStationRequest";

export class CreatePollingStationForm {

  private readonly _form: FormGroup;
  private readonly _firstStepForm: FormGroup;
  private readonly _secondStepForm: FormGroup;
  private readonly _finalStep: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this._form = this._formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      keywords: ['', Validators.required],
      typeNotation: ['', Validators.required],
      notationVisible: ['', Validators.required],
      userLimit: ['', Validators.required],
      scope: ['', Validators.required],
      password: ['', Validators.required],
      pollType: ['', Validators.required],
      startPoll: ['', Validators.required],
      endPoll: ['', Validators.required],
    })

    this._firstStepForm = this._formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      keywords: [[], Validators.required],
    })

    this._secondStepForm = this._formBuilder.group({
      notationVisible: [false, Validators.required],
      scope: ['', Validators.required],
      pollType: ['', Validators.required],
    })

    this._finalStep = this._formBuilder.group({
      startPoll: ['', Validators.required],
      endPoll: ['', Validators.required],
      password: [''],
      userLimit: [''],
      typeNotation: ['', Validators.required],
    })
  }



  constructRequest(): CreatePollingStationRequest {
    const finalStepValues = this.finalStep.value
    const firstStepFormValues = this.firstStepForm.value
    const secondStepFormValues = this.secondStepForm.value

    return new CreatePollingStationRequest(
      firstStepFormValues['name'],
      firstStepFormValues['category'],
      firstStepFormValues['description'],
      firstStepFormValues['keywords'].join('-'),
      finalStepValues['typeNotation'],
      secondStepFormValues['notationVisible'],
      this.isPrivate() ?  0 : finalStepValues['userLimit'],
      secondStepFormValues['scope'],
      finalStepValues['password'],
      secondStepFormValues['pollType'],
      finalStepValues['startPoll'],
      finalStepValues['endPoll']
    )
  }


  isPrivate() {
    return this.secondStepForm.value['scope'] == "PRIVATE";
  }
  get form(): FormGroup {
    return this._form;
  }

  get firstStepForm(): FormGroup {
    return this._firstStepForm;
  }

  get secondStepForm(): FormGroup {
    return this._secondStepForm;
  }

  get finalStep(): FormGroup {
    return this._finalStep;
  }

  get formBuilder(): FormBuilder {
    return this._formBuilder;
  }

  getForm(): FormGroup {
    return this._form;
  }


}
