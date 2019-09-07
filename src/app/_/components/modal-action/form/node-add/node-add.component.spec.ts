import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeAddComponent } from './node-add.component';

describe('NodeAddComponent', () => {
  let component: NodeAddComponent;
  let fixture: ComponentFixture<NodeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
