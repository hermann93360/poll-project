import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserBtnComponent } from './add-user-btn.component';

describe('AddUserBtnComponent', () => {
  let component: AddUserBtnComponent;
  let fixture: ComponentFixture<AddUserBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
