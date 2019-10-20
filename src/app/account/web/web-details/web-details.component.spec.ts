import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDetailsComponent } from './web-details.component';

describe('WebDetailsComponent', () => {
  let component: WebDetailsComponent;
  let fixture: ComponentFixture<WebDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
