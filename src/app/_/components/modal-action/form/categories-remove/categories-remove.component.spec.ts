import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesRemoveComponent } from './categories-remove.component';

describe('CategoriesRemoveComponent', () => {
  let component: CategoriesRemoveComponent;
  let fixture: ComponentFixture<CategoriesRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
