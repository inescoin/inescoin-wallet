import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUpdateComponent } from './categories-update.component';

describe('CategoriesUpdateComponent', () => {
  let component: CategoriesUpdateComponent;
  let fixture: ComponentFixture<CategoriesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
