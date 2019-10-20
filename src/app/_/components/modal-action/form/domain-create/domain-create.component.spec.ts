import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainCreateComponent } from './domain-create.component';

describe('DomainCreateComponent', () => {
  let component: DomainCreateComponent;
  let fixture: ComponentFixture<DomainCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
