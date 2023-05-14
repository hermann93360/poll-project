import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStationComponent } from './button-station.component';

describe('ButtonStationComponent', () => {
  let component: ButtonStationComponent;
  let fixture: ComponentFixture<ButtonStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
