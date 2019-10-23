// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { WalletService } from './wallet.service';
import { ModalActionService } from '../../_/components/modal-action/modal-action.service';

import { inescoinConfig } from '../../config/inescoin.config';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  total: number = 0;
  inescoinConfig = inescoinConfig;
	accounts = [];
  wallet = {};
  addresses = {};

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private modalActionService: ModalActionService,
    private walletService: WalletService) { }

  ngOnInit() {
    this.wallet = this.walletService.accounts;
    this.addresses = this.walletService.getFromHomeStorage();

    this.walletService.getWalletAdressesInfos(this.getWalletAdressesInfos())
      .subscribe((addresses) => {
        this.walletService.saveToHomeStorage(addresses);
        this.addresses = addresses;
    });
  }

  openAccountDetail(account) {
  	this.router.navigate(['wallet', account.address]);
  }

  getWalletAdressesInfos() {
    return Object.keys(this.wallet).join(',');
  }

  getAccounts() {
    let i = 1;
    let wallet = [];
    let total = 0;
    for (let key of Object.keys(this.wallet)) {
      wallet.push({
        address: this.addresses[key] && this.addresses[key].address || key,
        amount: this.addresses[key] && this.addresses[key].amount || '0.00'
      });

      total += this.addresses[key] && this.addresses[key].amount || 0;
      i++;
    }

    this.total = total;
    return _.orderBy(wallet, ['amount'], ['desc']);
  }

  openModal(name, option) {
    this.modalActionService.open(name, option);
  }
}
