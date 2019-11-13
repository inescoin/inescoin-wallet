import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountKeysComponent } from './account-keys.component';

describe('AccountKeysComponent', () => {
  let component: AccountKeysComponent;
  let fixture: ComponentFixture<AccountKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
