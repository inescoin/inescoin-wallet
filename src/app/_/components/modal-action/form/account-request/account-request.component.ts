// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';
import { WalletService } from '../../../../../account/wallet/wallet.service';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.scss']
})
export class AccountRequestComponent implements OnInit {
	options: any = {};
	payment: any = {
		reference: '',
		amount: 0,
	};

  constructor(
    private walletService: WalletService,
  	private modalActionService: ModalActionService,
  	private ngbActiveModal: NgbActiveModal,) { }

  ngOnInit() {
    this.options = this.modalActionService.options || {};
  }

  close() {
  	this.ngbActiveModal.close();
  }

  getQrCodeAddress() {
  	this.payment.address = this.options.account.address;
  	console.log(this.payment);
  	return JSON.stringify(this.payment);
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }
}
