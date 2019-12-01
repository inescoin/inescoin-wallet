import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';
import { WebService } from '../../../../../account/web/web.service';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})
export class CategoriesCreateComponent implements OnInit {

  category: any = {}
  categories: any[] = [];

  constructor(
  	private ngbActiveModal: NgbActiveModal,
    private webService: WebService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
    this.categories = this.modalActionService.options.categories;

    this.category.sku = this._generateSKU();
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  add() {
    this.webService.onDomainCategoriesAdded.emit(this.category);
    this.dismiss();
  }

  private _generateSKU() {
    return (Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 9)).toUpperCase();
  }
}
