import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';
import { WebService } from '../../../../../account/web/web.service';

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html',
  styleUrls: ['./categories-update.component.scss']
})
export class CategoriesUpdateComponent implements OnInit {
	parent: string = '';
  category: any = {}
  categories: any[] = [];

  constructor(
  	private ngbActiveModal: NgbActiveModal,
    private webService: WebService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
    this.category = this.modalActionService.options.category;
    this.categories = this.modalActionService.options.categories;

    this.parent = this.modalActionService.options.category.parent;
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  update() {
    this.webService.onDomainCategoriesUpdated.emit({
    	category: this.category,
    	parent: this.parent
    });

    this.dismiss();
  }
}
