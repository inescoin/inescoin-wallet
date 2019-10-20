import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUpdateComponent } from './web-update.component';

describe('WebUpdateComponent', () => {
  let component: WebUpdateComponent;
  let fixture: ComponentFixture<WebUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
