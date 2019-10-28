import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainRemoveLangueComponent } from './domain-remove-langue.component';

describe('DomainRemoveLangueComponent', () => {
  let component: DomainRemoveLangueComponent;
  let fixture: ComponentFixture<DomainRemoveLangueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainRemoveLangueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainRemoveLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
