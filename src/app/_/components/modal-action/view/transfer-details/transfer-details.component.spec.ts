import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranfserDetailsComponent } from './transfer-details.component';

describe('TranfserDetailsComponent', () => {
  let component: TranfserDetailsComponent;
  let fixture: ComponentFixture<TranfserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranfserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranfserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
