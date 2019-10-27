import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainChangeOwnerComponent } from './domain-change-owner.component';

describe('DomainChangeOwnerComponent', () => {
  let component: DomainChangeOwnerComponent;
  let fixture: ComponentFixture<DomainChangeOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainChangeOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainChangeOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
