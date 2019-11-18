import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRequestComponent } from './account-request.component';

describe('AccountRequestComponent', () => {
  let component: AccountRequestComponent;
  let fixture: ComponentFixture<AccountRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
