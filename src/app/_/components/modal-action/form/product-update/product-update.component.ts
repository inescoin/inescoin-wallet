import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';
import { WebService } from '../../../../../account/web/web.service';
import { inescoinConfig } from '../../../../../config/inescoin.config';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  deleteMode: boolean = false;
  categories: any = [];
  product: any = {};
  index: any;
  onTagsChangedOutput: string = '';
  onCompositionChangedOutput: string = '';

  ngModelParam = [];
  ngModelCompositionParam = [];

  inescoinConfig: any = inescoinConfig;

  constructor(
  	private ngbActiveModal: NgbActiveModal,
    private webService: WebService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
    this.categories = this.modalActionService.options.categories;
    this.product = this.modalActionService.options.product;
    this.index = this.modalActionService.options.index;

    if (!this.product.tags) {
    	this.product.tags = [];
    }

    for (var i = this.product.tags.length - 1; i >= 0; i--) {
    	this.ngModelParam.push({
    		displayValue: this.product.tags[i]
    	});
    }

    if (!this.product.composition) {
    	this.product.composition = [];
    }

    for (var i = this.product.composition.length - 1; i >= 0; i--) {
    	this.ngModelCompositionParam.push({
    		displayValue: this.product.composition[i]
    	});
    }
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  update() {
    if (this.deleteMode) {

      this.webService.onDomainProductRemoved.emit({
        product: this.product,
        index: this.index
      });

      this.dismiss();
      return;
    }

  	this.product.tags = [];
  	for (var i = this.ngModelParam.length - 1; i >= 0; i--) {
    	this.product.tags.push(this.ngModelParam[i].displayValue);
    }

    this.product.composition = [];

  	for (var i = this.ngModelCompositionParam.length - 1; i >= 0; i--) {
    	this.product.composition.push(this.ngModelCompositionParam[i].displayValue);
    }

    this.webService.onDomainProductUpdated.emit({
    	product: this.product,
    	index: this.index
    });

    this.dismiss();
  }

  onUpdatedProduct(event) {
  	if (!this.product.categories) {
  		this.product.categories = []
  	}

  	let index = this.product.categories.indexOf(event);

  	if (index === -1) {
  		this.product.categories.unshift(event);
  	} else {
  		this.product.categories.splice(index, 1);
  	}
  }

  onTagsChangedEventHandler(event: any): void {
    this.onTagsChangedOutput = JSON.stringify(event);
  }

  onCompositionChangedEventHandler(event: any): void {
    this.onCompositionChangedOutput = JSON.stringify(event);
  }

  deteleToggle() {
    this.deleteMode = !this.deleteMode;
  }
}
