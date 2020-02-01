// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

import { WebService } from '..//web.service';
import { WalletService } from '../../wallet/wallet.service';
import { TransactionService } from '../../../_/services/transaction.service';
import { inescoinConfig } from '../../../config/inescoin.config';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';

@Component({
  selector: 'app-web-update',
  templateUrl: './web-update.component.html',
  styleUrls: ['./web-update.component.scss']
})
export class WebUpdateComponent implements OnInit {
  modalOptions: any = {};

  error: string = '';
  amount: number = 1;

  to: string = '0x5967a4016501465CD951a1e3984F772AfDeB5207';

  data: any = {};
  address: any = {};

  from: any = '';
  publicKey: any = '';

  domain: any = {
    action: 'update',
    name: '',
    data: {}
  };

  diffModel = {};
  addresses = {};
  inescoinConfig: any = inescoinConfig;

  inProgress: boolean = false;
  badPassword: boolean = false;
  isSummaryStep: boolean = false;

  password: string = '';

  fee = 0.001;

  transfers = [{
    to: '0x5967a4016501465CD951a1e3984F772AfDeB5207',
    amount: 0.999,
    item: null,
    walletId: ''
  }];

  subjects: any = {};

  constructor(
    private webService: WebService,
    private router: Router,
    private toastrService: ToastrService,
    private modalActionService: ModalActionService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private walletService: WalletService,
    private ngbActiveModal: NgbActiveModal,
    private transactionService: TransactionService
    ) { }

  ngOnInit() {
    this.modalOptions = this.modalActionService.options;

    this.from = this.modalActionService.options.domain.ownerAddress;
    this.publicKey = this.modalActionService.options.domain.publicKey;

    this.domain.name = this.modalActionService.options.domain.url;
    this.domain.data = this.modalActionService.options.domain;
    this.diffModel = this.modalActionService.options.diff;

    let wallets = this._getFromCache();
    if (wallets && wallets[this.from]) {
      this.data = wallets[this.from].data;
      this.publicKey = wallets[this.from].publicKey;
    }

    if (this.addresses[this.from]) {
      this.address = this.addresses[this.from];
    }

    this.subjects.remoteResponse = this.transactionService.onRemoteResponse.subscribe((remoteResponse) => {
      this.inProgress = false;
      if (remoteResponse[0] && remoteResponse[0].error) {
        this.error = remoteResponse[0].error;
        this.toastrService.error(this.doorgetsTranslateService.instant(remoteResponse[0].error));
      } else {
        this.toastrService.success(this.doorgetsTranslateService.instant('#Transaction sent!'));
        this.ngbActiveModal.dismiss();
      }
    });
  }

  getAdressesArray() {

    this.addresses = this.walletService.getFromHomeStorage();

    let addresses = [];
    for(let address of Object.keys(this.addresses)) {
      addresses.push(this.addresses[address]);
    }

    return addresses;
  }

  onFromChange(event) {
    let wallets = this._getFromCache();
    this.data = '';
    this.publicKey = '';

    if (wallets && wallets[this.from]) {
      this.data = wallets[this.from].data;
      this.publicKey = wallets[this.from].publicKey;
    }

    if (this.addresses[this.from]) {
      this.address = this.addresses[this.from];
    }
  }

  private _getFromCache() {
    let wallets = localStorage.getItem(inescoinConfig.name + '-wallets');
    if (!wallets) {
      return {
        hash: '',
        wallet: '',
        address: '',
        amount: 0,
        firstHeight: 0,
        lastHeight: 0,
        transactions: [],
        total: 0
      };
    } else {
      return JSON.parse(wallets);
    }
  }

  updateDomain() {
    this.send();
  }

  send() {
    this.inProgress = true;
    this.badPassword = false;

    this.error = '';

    let decrypted: any = this.transactionService.decryptWithPassword(this.data, this.password);

    if (!this.password) {
      this.badPassword = true;
      this.inProgress = false;
      return;
    }

    if (decrypted) {
      decrypted = JSON.parse(decrypted);
      this.transactionService.sendTransaction(
        this.fee,
        this._mapTransfer(),
        this.from,
        decrypted.publicKey,
        decrypted.privateKey,
        [this.domain]
      );
    } else {
      this.toastrService.error(this.doorgetsTranslateService.instant('#Error: Bad password'));
      this.inProgress = false;
      this.badPassword = true;
    }
  }

  private _mapTransfer() {
    return this.transfers.map((transfer) => {
      return {
        amount: transfer.amount,
        to: transfer.item && transfer.item.address || transfer.to,
        walletId: transfer.walletId || transfer.item && transfer.item.walletId || ''
      };
    })
  }

  next() {
    this.isSummaryStep = true;
  }

  back() {
    this.ngbActiveModal.dismiss();
  }
}
