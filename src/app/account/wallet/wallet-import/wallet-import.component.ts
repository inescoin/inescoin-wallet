// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

@Component({
  selector: 'app-wallet-import',
  templateUrl: './wallet-import.component.html',
  styleUrls: ['./wallet-import.component.scss']
})
export class WalletImportComponent implements OnInit {
	password: string = '';
	file: File;
	account = {};

	error = {
		file: ''
	};

  constructor(
    private doorgetsTranslateService: DoorgetsTranslateService,
    private toastrService: ToastrService,
    private walletService: WalletService,
    private ngbActiveModal: NgbActiveModal,
    private router: Router) { }

  ngOnInit() {}

  loadWallet(event) {
  	this.file = event.target && event.target.files && event.target.files[0];
  	this.account = {};
  	this.error.file = '';
  }

  checkPassword() {
  	let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let content = fileReader.result;
      console.log('checkPassword:content', content);
      console.log('checkPassword:password', this.password);
      let wallet = this.walletService.open(content, this.password);
      if (!wallet) {
      	this.error.file = 'File or password error';
      }

      try {
	      this.account = wallet;
      } catch(e) {
      	this.error = e;
      }

      this.password = '';
  		this.file = undefined;

  		if (this.account) {
        this.toastrService.success(this.doorgetsTranslateService.instant('#Account imported!'));
        this.ngbActiveModal.dismiss();
  		}
    }

    fileReader.readAsText(this.file);
  }

  importAccount() {
  	this.checkPassword();
  }
}
