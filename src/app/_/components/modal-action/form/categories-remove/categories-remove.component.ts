import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';
import { WebService } from '../../../../../account/web/web.service';

@Component({
  selector: 'app-categories-remove',
  templateUrl: './categories-remove.component.html',
  styleUrls: ['./categories-remove.component.scss']
})
export class CategoriesRemoveComponent implements OnInit {

  category: any = {}
  categories: any[] = [];

  constructor(
  	private ngbActiveModal: NgbActiveModal,
    private webService: WebService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
    this.category = this.modalActionService.options.category;
    this.categories = this.modalActionService.options.categories;
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  remove() {
    this.webService.onDomainCategoriesRemoved.emit(this.category);
    this.dismiss();
  }
}
