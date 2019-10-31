// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  langues: any = [];

	newLangue: any = {
		code: '',
		label: '',
    from: ''
	};

  constructor(
    private ref: ChangeDetectorRef,
  	private modalActionService: ModalActionService,
  	private ngbActiveModal: NgbActiveModal,
  	private webService: WebService) { }

  ngOnInit() {
  	this.domain = this.modalActionService.options.domain;
    this.mapActive();
  }

  mapActive() {
    let lgKeys = Object.keys(this.domain.html);
    this.newLangue.from = lgKeys[0];

    this.langues = lgKeys.map((lg) => {
        return {
          code: lg,
          label: this.domain.html[lg].label
        }
    });
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
