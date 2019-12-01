import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImportComponent } from './product-import.component';

describe('ProductImportComponent', () => {
  let component: ProductImportComponent;
  let fixture: ComponentFixture<ProductImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
