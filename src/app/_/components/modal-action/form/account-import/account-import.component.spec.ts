import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountImportComponent } from './account-import.component';

describe('AccountImportComponent', () => {
  let component: AccountImportComponent;
  let fixture: ComponentFixture<AccountImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
