import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollingStationFormComponent } from './create-polling-station-form.component';

describe('CreatePollingStationFormComponent', () => {
  let component: CreatePollingStationFormComponent;
  let fixture: ComponentFixture<CreatePollingStationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePollingStationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePollingStationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
