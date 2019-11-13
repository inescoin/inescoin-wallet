// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

import { ModalActionService } from '../../modal-action.service';
import { WalletService } from '../../../../../account/wallet/wallet.service';

@Component({
  selector: 'app-account-reset-password',
  templateUrl: './account-reset-password.component.html',
  styleUrls: ['./account-reset-password.component.scss']
})
export class AccountResetPasswordComponent implements OnInit {

	newPassword: string = '';
	confirmNewPassword: string = '';
	currentPassword: string = '';

	options: any = {};

	badPassword: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private doorgetsTranslateService: DoorgetsTranslateService,
		private walletService: WalletService,
  	private modalActionService: ModalActionService,
  	private ngbActiveModal: NgbActiveModal,) { }

  ngOnInit() {
    this.options = this.modalActionService.options || {};
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  resetPassword() {
  	this.badPassword = false;

  	let data = this.walletService.openData(this.options.account.wallet.data, this.currentPassword);

  	if (data) {
  		this.walletService.save(this.options.account.address, data, this.currentPassword);
      this.toastrService.success(this.doorgetsTranslateService.instant('#Password updated'));
	  	this.badPassword = false;
  		this.dismiss();
  	} else {
      this.toastrService.error(this.doorgetsTranslateService.instant('#Bad password'));
  		this.badPassword = true;
  	}
  }
}
