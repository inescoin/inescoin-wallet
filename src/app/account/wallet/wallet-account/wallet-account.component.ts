// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../wallet.service';
import { ActivatedRoute } from '@angular/router';
import { inescoinConfig } from '../../../config/inescoin.config';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';

@Component({
  selector: 'app-wallet-account',
  templateUrl: './wallet-account.component.html',
  styleUrls: ['./wallet-account.component.scss']
})
export class WalletAccountComponent implements OnInit {

  inescoinConfig: any = inescoinConfig;

	account: any = {
		hash: '',
		wallet: {
			label: '',
			reference: ''
		},
		address: '',
		amount: 0,
		firstHeight: 0,
		height: 0,
    transactions: [],
    total: 0,
    transactionsPool: [],
    totalPool: 0,
	};

  subjects: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalActionService: ModalActionService,
    private walletService: WalletService) { }

  ngOnInit() {
  	let address = this.route.snapshot.params['address'];
  	if (this.walletService.accounts[address]) {
  		this.account = this._getFromCache(address);

  		this.account.address = address;
  		this.account.wallet = this.walletService.accounts[address];

  		this.subjects.getWalletInfos = this.walletService.getWalletInfos(address).subscribe((walletInfos: any) => {
  			if (!walletInfos.error) {
          console.log(walletInfos);
	  			this.account.amount = walletInfos.wallet?.amount;
			    this.account.address = walletInfos.wallet?.address;
			    this.account.height = walletInfos.wallet?.height;
			    this.account.hash = walletInfos.wallet?.hash;
			    this.account.total = walletInfos.count;
          this.account.transactions = walletInfos.transfers;

          // this.account.totalPool = walletInfos.transfersPool.total;
          // this.account.transactionsPool = walletInfos.transfersPool.transactions;

			    this._saveToCache(address, this.account);
  			} else {
  				localStorage.removeItem(inescoinConfig.name + '-account-' + address)
  			}
	    });

      this.subjects.onListUpdated = this.walletService.onListUpdated.subscribe(() => {
        this.account = this._getFromCache(address);
        this.account.address = address;
        this.account.wallet = this.walletService.accounts[address];
      });
  	} else {
      this.router.navigate(['/wallet']);
    }
  }

  private _getFromCache(address) {
  	let account = localStorage.getItem(inescoinConfig + '-account-' + address);
  	if (!account) {
  		return {
				hash: '',
				wallet: '',
				address: '',
				amount: 0,
				firstHeight: 0,
				height: 0,
				transactions: [],
        total: 0,
        transactionsPool: [],
        totalPool: 0
			};
  	} else {
  		return JSON.parse(account);
  	}
  }

  openAccountRequestModal() {
    this.openModal('accountRequest', {
      account: this.account
    });
  }

  openAccountKeysModal() {
    this.openModal('accountKeys', {
      account: this.account
    });
  }
  openAccountRemoveModal() {
    this.openModal('accountRemove', {
      account: this.account
    });
  }
  openAccountResetPasswordModal() {
    this.openModal('accountResetPassword', {
      account: this.account
    });
  }

  getQrCodeAddress() {
  	return JSON.stringify({
    	address: this.account.address,
    	label: this.account.wallet.label,
    	publicKey: this.account.wallet.publicKey,
    	reference: this.account.wallet.reference,
    });
  }

  private _saveToCache(address, data) {
  	localStorage.setItem(inescoinConfig.name + '-account-' + address, JSON.stringify(data));
  }

  openModal(name, option) {
    this.modalActionService.open(name, option);
  }

  ngOnDestroy() {
    this.subjects.getWalletInfos && this.subjects.getWalletInfos.unsubscribe();
    this.subjects.onListUpdated && this.subjects.onListUpdated.unsubscribe();
  }
}
