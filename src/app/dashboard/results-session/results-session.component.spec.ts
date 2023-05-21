import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSessionComponent } from './results-session.component';

describe('ResultsSessionComponent', () => {
  let component: ResultsSessionComponent;
  let fixture: ComponentFixture<ResultsSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
