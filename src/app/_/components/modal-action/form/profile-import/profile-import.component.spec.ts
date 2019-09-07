import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImportComponent } from './profile-import.component';

describe('ProfileImportComponent', () => {
  let component: ProfileImportComponent;
  let fixture: ComponentFixture<ProfileImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
