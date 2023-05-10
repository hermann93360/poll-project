import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingStationUserListComponent } from './polling-station-user-list.component';

describe('PollingStationUserListComponent', () => {
  let component: PollingStationUserListComponent;
  let fixture: ComponentFixture<PollingStationUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollingStationUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollingStationUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
