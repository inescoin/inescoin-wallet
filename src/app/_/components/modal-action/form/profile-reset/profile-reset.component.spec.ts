import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileResetComponent } from './profile-reset.component';

describe('ProfileResetComponent', () => {
  let component: ProfileResetComponent;
  let fixture: ComponentFixture<ProfileResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
