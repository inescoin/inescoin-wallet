// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

import { WalletService } from '../wallet.service';
import { ContactsService } from '../../contacts/contacts.service';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';
import { TransactionService } from '../../../_/services/transaction.service';
import { QrScannerService } from '../../../_/services/ui/qr-scanner.service';

import { inescoinConfig } from '../../../config/inescoin.config';

import * as _ from 'lodash';

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.scss']
})
export class WalletSendComponent implements OnInit {
  inProgress: boolean = false;
  isSummaryStep: boolean = false;

  inescoinConfig: any = inescoinConfig;

  error = '';

	from = '';
  publicKey = '';
  data = '';

  password = '';

	addresses = {};

  badPassword: boolean = false;

  fee = 0.001;

	transfers = [{
		to: '',
		amount: 0.0000,
    item: null,
    walletId: ''
	}];

  contacts = [];

  subjects: any = {};

  addressesArray: any = [];

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private walletService: WalletService,
    private ngbActiveModal: NgbActiveModal,
    private modalActionService: ModalActionService,
    private qrScannerService: QrScannerService,
    private contactsService: ContactsService,
    private transactionService: TransactionService) { }

  ngOnInit() {
  	this.addresses = this.walletService.getFromHomeStorage();

    this.contacts = this.contactsService.contacts && this.contactsService.contacts.map((contact: any) => {
      contact.value = contact.label + ' ' + contact.address;
      return contact;
    }) || [];

    if (!this.subjects.remoteResponse) {
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

    if (!this.subjects.scan) {
      this.subjects.scan = this.qrScannerService.onScan.subscribe((result) => {
        if (result.component === 'wallet-send') {
          this.transfers[result.index].to = result.wallet.address;
          this.transfers[result.index].walletId = result.wallet.walletId;
        }
      });
    }

    this._loadAdressesArray();
  }

  private _loadAdressesArray() {
    this.addresses = this.walletService.getFromHomeStorage();

  	let addresses = [];
  	for(let address of Object.keys(this.addresses)) {
  		addresses.push(this.addresses[address]);
  	}

    this.addressesArray = addresses;
  }

  addTransfer() {
  	this.transfers.push({
  		to: '',
  		amount: 0.000,
      item: null,
      walletId: ''
  	});
  }

  goToSummaryStep() {
    this.isSummaryStep = true;
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
      this.transactionService.sendTransaction(this.fee, this.transfers.map((transfer) => {

        return {
          amount: transfer.amount,
          to: transfer.item && transfer.item.address || transfer.to,
          walletId: transfer.walletId || transfer.item && transfer.item.walletId || ''
        };
      }), this.from, decrypted.publicKey, decrypted.privateKey);
    } else {
      this.toastrService.error(this.doorgetsTranslateService.instant('#Error: Bad password'));
      this.inProgress = false;
      this.badPassword = true;
    }
  }

  remove(index) {
		this.transfers.splice(index, 1);
  }

  getTotal() {
  	let total = 0;
  	_.forEach(this.transfers, (transfer) => {
  		total += Math.floor(transfer.amount * 100000000) / 100000000;
  	});

  	return total + this.fee;
  }

  onFromChange(event) {
    let wallets = this._getFromCache();
    this.data = '';
    this.publicKey = '';
    if (wallets && wallets[this.from]) {
      this.data = wallets[this.from].data;
      this.publicKey = wallets[this.from].publicKey;
    }
  }

  onSelectTransferTo(event: any, index) {
    if (event.item) {
      this.transfers[index].item = event.item;
      this.transfers[index].walletId = event.item && event.item.walletId;
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

  openModal(name, option) {
    this.modalActionService.open(name, option);
  }

  ngOnDestroy() {
    this.subjects.remoteResponse && this.subjects.remoteResponse.unsubscribe();
    this.subjects.scan && this.subjects.remoteResponse.unsubscribe();
  }
}
