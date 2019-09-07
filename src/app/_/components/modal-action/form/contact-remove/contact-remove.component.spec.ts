import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRemoveComponent } from './contact-remove.component';

describe('ContactRemoveComponent', () => {
  let component: ContactRemoveComponent;
  let fixture: ComponentFixture<ContactRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
