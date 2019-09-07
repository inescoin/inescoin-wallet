import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressMessengerComponent } from './in-progress-messenger.component';

describe('InProgressMessengerComponent', () => {
  let component: InProgressMessengerComponent;
  let fixture: ComponentFixture<InProgressMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProgressMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
