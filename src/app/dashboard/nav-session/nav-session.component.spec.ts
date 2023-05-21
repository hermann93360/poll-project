import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSessionComponent } from './nav-session.component';

describe('NavSessionComponent', () => {
  let component: NavSessionComponent;
  let fixture: ComponentFixture<NavSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
