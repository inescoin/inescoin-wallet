// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WebService } from '../../../../../account/web/web.service';
import { ModalActionService } from '../../modal-action.service';

@Component({
  selector: 'app-domain-remove-langue',
  templateUrl: './domain-remove-langue.component.html',
  styleUrls: ['./domain-remove-langue.component.scss']
})
export class DomainRemoveLangueComponent implements OnInit {
	domain: any = {};
	removeCode: string = '';

  constructor(
  	private modalActionService: ModalActionService,
  	private ngbActiveModal: NgbActiveModal,
  	private webService: WebService) { }

  ngOnInit() {
  	this.domain = this.modalActionService.options.domain;
		this.removeCode = this.modalActionService.options.removeCode;
  }

  remove() {
  	this.webService.onDomainLangueRemoved.emit(this.removeCode);
  	this.close();
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }
}
