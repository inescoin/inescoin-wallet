// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

import { QrScannerService } from '../../../_/services/ui/qr-scanner.service';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';
import { WalletService } from '../../wallet/wallet.service';
import { ContactsService } from '../../contacts/contacts.service';
import { TransactionService } from '../../../_/services/transaction.service';
import { inescoinConfig } from '../../../config/inescoin.config';

@Component({
  selector: 'app-web-create',
  templateUrl: './web-create.component.html',
  styleUrls: ['./web-create.component.scss']
})
export class WebCreateComponent implements OnInit {
  type: string = 'create';
  modalOptions: any = {};

  @Input('actionType') actionType = 'create';

	error: string = '';

  amount: number = 300;

  amountMonth: number = 100;
  amountThreeMonths: number = 200;
	amountSixMonths: number = 300;

	to: string = '0x16D6cae25f36A16ABA3482526dFabA1D69a7aB5f';

	data: any = {};
	address: any = {};

	from: any = '';
	publicKey: any = '';

	domain: any = {
		action: 'create',
		name: '',
	};

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

  contacts = [];
  subjects: any = {};

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private contactsService: ContactsService,
    private qrScannerService: QrScannerService,
    private modalActionService: ModalActionService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private walletService: WalletService,
    private ngbActiveModal: NgbActiveModal,
    private transactionService: TransactionService
  	) { }

  ngOnInit() {
    this.modalOptions = this.modalActionService.options;

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

    this.from = this.modalOptions.from;
    this.domain.name = this.modalOptions.url;
    this.domain.action = this.modalOptions.type;
    this.publicKey = this.modalOptions.publicKey;
    this.data = this.modalOptions.data;

    this.contacts = this.contactsService.contacts.map((contact: any) => {
      contact.value = contact.label + ' ' + contact.address;
      return contact;
    });

    this.subjects.scan = this.qrScannerService.onScan.subscribe((result) => {
      if (result.component === 'wallet-create') {
        this.domain.newOwnerAddress = result.contact.address;
        this.domain.newOwnerPublicKey = result.contact.publicKey;
      }
    });
  }

  ngOnDestroy() {
    this.subjects.remoteResponse && this.subjects.remoteResponse.unsubscribe();
    this.subjects.scan && this.subjects.scan.unsubscribe();
  }

  getAdressesArray() {
    this.addresses = this.walletService.getFromHomeStorage();

  	let addresses = [];
  	for(let address of Object.keys(this.addresses)) {
  		addresses.push(this.addresses[address]);
  	}

  	return addresses;
  }

  onSelectOwner(event: any, index) {
    if (event.item) {
      this.domain.newOwnerAddress = event.item.address;
      this.domain.newOwnerPublicKey = event.item.publicKey;
    }
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

  createDomain() {
  	this.send();
  }

  openModal(name, option) {
    this.modalActionService.open(name, option);
  }

  send() {
    this.inProgress = true;
    this.badPassword = false;

    this.error = '';

    let decrypted: any = this.transactionService.decryptWithPassword(this.data, this.password);

    if (!this.password) {
      this.badPassword = true;
      return;
    }

    this.transfers[0].amount = this.amount - this.fee;

    if (decrypted) {
      decrypted = JSON.parse(decrypted);
      this.transactionService.sendTransaction(this.fee, this._mapTransfer(), this.from, decrypted.publicKey, decrypted.privateKey, [this.domain]);
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

  isAlphaNum(data) {
    if (!data) {
      return false;
    }

    let cd;
    for (let i = 0; i < data.length; i++) {
      cd = data.charCodeAt(i);
      if (!(cd > 47 && cd < 58) && !(cd > 64 && cd < 91) && !(cd > 96 && cd < 123)) {
        return false;
      }
    }

    return true;
  }

  next() {
  	this.isSummaryStep = true;
  }

  back() {
  	this.isSummaryStep = false;
  }
}
