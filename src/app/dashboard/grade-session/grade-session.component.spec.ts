import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSessionComponent } from './grade-session.component';

describe('GradeSessionComponent', () => {
  let component: GradeSessionComponent;
  let fixture: ComponentFixture<GradeSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
