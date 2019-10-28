import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainAddLangueComponent } from './domain-add-langue.component';

describe('DomainAddLangueComponent', () => {
  let component: DomainAddLangueComponent;
  let fixture: ComponentFixture<DomainAddLangueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainAddLangueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainAddLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
