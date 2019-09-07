import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExportComponent } from './profile-export.component';

describe('ProfileExportComponent', () => {
  let component: ProfileExportComponent;
  let fixture: ComponentFixture<ProfileExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
