import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDetailsComponent } from './transfer-details.component';

describe('TransferDetailsComponent', () => {
  let component: TransferDetailsComponent;
  let fixture: ComponentFixture<TransferDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
