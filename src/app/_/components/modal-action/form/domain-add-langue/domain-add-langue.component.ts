// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WebService } from '../../../../../account/web/web.service';
import { ModalActionService } from '../../modal-action.service';

@Component({
  selector: 'app-domain-add-langue',
  templateUrl: './domain-add-langue.component.html',
  styleUrls: ['./domain-add-langue.component.scss']
})
export class DomainAddLangueComponent implements OnInit {

	domain: any = {};

	newLangue: any = {
		code: '',
		label: ''
	};

  constructor(
  	private modalActionService: ModalActionService,
  	private ngbActiveModal: NgbActiveModal,
  	private webService: WebService) { }

  ngOnInit() {
  	this.domain = this.modalActionService.options.domain;
  }

  add() {
  	this.webService.onDomainLangueAdded.emit(this.newLangue);
  	this.close();
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }
}
