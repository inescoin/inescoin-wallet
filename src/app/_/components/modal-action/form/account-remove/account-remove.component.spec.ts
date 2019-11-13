import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRemoveComponent } from './account-remove.component';

describe('AccountRemoveComponent', () => {
  let component: AccountRemoveComponent;
  let fixture: ComponentFixture<AccountRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
