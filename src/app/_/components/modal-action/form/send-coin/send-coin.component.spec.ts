import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCoinComponent } from './send-coin.component';

describe('SendCoinComponent', () => {
  let component: SendCoinComponent;
  let fixture: ComponentFixture<SendCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
