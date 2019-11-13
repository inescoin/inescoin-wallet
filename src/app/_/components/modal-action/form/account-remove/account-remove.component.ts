// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

import { ModalActionService } from '../../modal-action.service';
import { WalletService } from '../../../../../account/wallet/wallet.service';

@Component({
  selector: 'app-account-remove',
  templateUrl: './account-remove.component.html',
  styleUrls: ['./account-remove.component.scss']
})
export class AccountRemoveComponent implements OnInit {
	options: any = {};
	password: string = '';
	badPassword: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private doorgetsTranslateService: DoorgetsTranslateService,
  	private router: Router,
    private walletService: WalletService,
  	private modalActionService: ModalActionService,
  	private ngbActiveModal: NgbActiveModal,) { }

  ngOnInit() {
    this.options = this.modalActionService.options || {};
  }

  close() {
  	this.ngbActiveModal.close();
  }

  remove() {
  	this.badPassword = false;

  	if (this.walletService.openData(this.options.account.wallet.data, this.password)) {
  		this.walletService.removeWallet(this.options.account.address);
  		this.router.navigate(['/wallet']);
  		this.toastrService.success(this.doorgetsTranslateService.instant('#Wallet deleted'));
	  	this.badPassword = false;
  		this.dismiss();
  	} else {
      this.toastrService.error(this.doorgetsTranslateService.instant('#Bad password'));
  		this.badPassword = true;
  	}
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }
}
