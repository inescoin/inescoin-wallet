// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';

@Component({
  selector: 'app-account-keys',
  templateUrl: './account-keys.component.html',
  styleUrls: ['./account-keys.component.scss']
})
export class AccountKeysComponent implements OnInit {
	options: any = {};

	qrCodeKeys: string = '';

  constructor(
  	private modalActionService: ModalActionService,
  	private ngbActiveModal: NgbActiveModal,) { }

  ngOnInit() {
    this.options = this.modalActionService.options || {};
    this.qrCodeKeys = this.getQrCodeKeys();
  }

  getQrCodeKeys() {
  	return JSON.stringify({
  		address: this.options.account.address,
  		data: this.options.account.wallet.data,
  		publicKey: this.options.account.wallet.publicKey
  	});
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }
}
