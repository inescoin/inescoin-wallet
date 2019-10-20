import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

import { WalletService } from '../../wallet/wallet.service';
import { TransactionService } from '../../../_/services/transaction.service';
import { inescoinConfig } from '../../../config/inescoin.config';

@Component({
  selector: 'app-web-create',
  templateUrl: './web-create.component.html',
  styleUrls: ['./web-create.component.scss']
})
export class WebCreateComponent implements OnInit {
	error: string = '';
	amount: number = 1;

	to: string = '0x5967a4016501465CD951a1e3984F772AfDeB5207';

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

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private walletService: WalletService,
    private ngbActiveModal: NgbActiveModal,
    private transactionService: TransactionService
  	) { }

  ngOnInit() {
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

  createDomain() {
  	this.send();
  }

  send() {
    console.log('Send Transaction', this.transfers, this.from);
    this.inProgress = true;
    this.badPassword = false;

    this.error = '';

    let decrypted: any = this.transactionService.decryptWithPassword(this.data, this.password);

    if (!this.password) {
      this.badPassword = true;
      return;
    }

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

  next() {
  	console.log('from', this.from);
  	console.log('data', this.data);
  	console.log('publicKey', this.publicKey);
  	console.log('domain', this.domain);
  	console.log('address', this.address);

  	this.isSummaryStep = true;
  }

  back() {
  	console.log('from', this.from);
  	console.log('data', this.data);
  	console.log('publicKey', this.publicKey);
  	console.log('domain', this.domain);
  	console.log('address', this.address);

  	this.isSummaryStep = false;
  }
}
