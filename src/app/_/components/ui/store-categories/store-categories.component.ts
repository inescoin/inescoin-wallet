import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ModalActionService } from '../../modal-action/modal-action.service';

@Component({
  selector: 'app-store-categories',
  templateUrl: './store-categories.component.html',
  styleUrls: ['./store-categories.component.scss']
})
export class StoreCategoriesComponent implements OnInit {
  categoriesMenuCollapsed: any  = {};
  checked: any = {
    all: true
  };

  @Output('onCatagoriesUpdated') onCatagoriesUpdated = new EventEmitter();
  @Output('onUpdated') onUpdated = new EventEmitter();
	@Output('onChecked') onChecked = new EventEmitter();

	@Input('productCategories') productCategories = [];
	@Input('categories') categories = [];
	@Input('canEdit') canEdit = false;
  @Input('preload') preload = false;
	@Input('isProduct') isProduct = false;

  constructor(
    private ref: ChangeDetectorRef,
  	private modalActionService: ModalActionService) { }

  ngOnInit() {
  	this.productCategories = this.productCategories || [];

  	if (this.preload) {
	  	this._initCategoriesCollapsed();
      this._initCategoriesChecked();
  	}
  }

  emitModel() {
  	this.onChecked.emit(this.checked);
  }

  categoriesUpdate(sku) {
    this.onCatagoriesUpdated.emit(sku);
  }

  allChecked() {
    setTimeout(() => {
      let keys = Object.keys(this.checked);

      for (let i = keys.length - 1; i >= 0; i--) {
        this.checked[keys[i]] = this.checked.all;
      }

      this.emitModel();
    }, 200)
  }

  edit(event, category) {
  	event.preventDefault();
  	this.openEditModal(category);
  }

  remove(event, category) {
  	event.preventDefault();
  	this.openRemoveModal(category);
  }

  openEditModal(category) {
    this.modalActionService.open('categoriesUpdate', {
      component: 'store-categories',
      category: category,
      categories: this.categories,
    });
  }

  openRemoveModal(category) {
    this.modalActionService.open('categoriesRemove', {
      component: 'store-categories',
      category: category,
      categories: this.categories,
    });
  }

  private _initCategoriesCollapsed() {
    for (let i = this.categories.length - 1; i >= 0; i--) {
      this.categoriesMenuCollapsed[this.categories[i].sku] = true;
    }
  }

  private _initCategoriesChecked() {
    for (let i = this.categories.length - 1; i >= 0; i--) {
      this.checked[this.categories[i].sku] = true;

      if (this.categories[i].children && this.categories[i].children.length) {
        for (let y = this.categories[i].children.length - 1; y >= 0; y--) {
          this.checked[this.categories[i].children[y].sku] = true;
        }
      }
    }

    !this.isProduct && this.onUpdated.emit(this.checked);
  }
}
