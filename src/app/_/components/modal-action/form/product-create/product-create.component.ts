import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';
import { WebService } from '../../../../../account/web/web.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  product: any = {
    currency: 'eur'
  };
  products: any[] = [];

  constructor(
  	private ngbActiveModal: NgbActiveModal,
    private webService: WebService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
    this.products = this.modalActionService.options.products;

    this.product.sku = this._generateSKU();
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  add() {
    this.webService.onDomainProductAdded.emit(this.product);
    this.dismiss();
  }

  private _generateSKU() {
    return (Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 9)).toUpperCase();
  }
}
