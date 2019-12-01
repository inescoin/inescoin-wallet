import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalActionService } from '../../modal-action/modal-action.service';

@Component({
  selector: 'app-store-categories',
  templateUrl: './store-categories.component.html',
  styleUrls: ['./store-categories.component.scss']
})
export class StoreCategoriesComponent implements OnInit {
  categoriesMenuCollapsed: any  = {};

	@Output('onUpdated') onUpdated = new EventEmitter();

	@Input('productCategories') productCategories = [];
	@Input('categories') categories = [];
	@Input('canEdit') canEdit = false;
	@Input('preload') preload = false;

  constructor(
  	private modalActionService: ModalActionService) { }

  ngOnInit() {
  	this.productCategories = this.productCategories || [];

  	if (this.preload) {
	  	this._initCategoriesCollapsed();
  	}
  }

  setCurrent(sku) {
  	this.onUpdated.emit(sku);
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
}
