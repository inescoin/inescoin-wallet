import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeRemoveComponent } from './node-remove.component';

describe('NodeRemoveComponent', () => {
  let component: NodeRemoveComponent;
  let fixture: ComponentFixture<NodeRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
