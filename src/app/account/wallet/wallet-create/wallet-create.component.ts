// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.scss']
})
export class WalletCreateComponent implements OnInit {

  password: string = '';
	confirmPassword: string = '';

  qrCodeOpen: boolean = false;

  qrResultString: string;
  wallet: any;

  constructor(
    private toastrService: ToastrService,
    private walletService: WalletService,
    private ngbActiveModal: NgbActiveModal,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private router: Router) { }

  ngOnInit() {
  }

  openQRCode() {
    this.qrCodeOpen = true;
  }

  closeQRCode() {
    this.qrCodeOpen = false;
  }

  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;

    let jsonResult: any;
    try {
      jsonResult = JSON.parse(resultString);
    } catch(e) {}

    if (jsonResult) {
      this.wallet = jsonResult;
      this.qrCodeOpen = false;
    }
  }

  create() {
    if (this.password && this.password === this.confirmPassword) {
      let wallet = this.walletService.create(this.password);
      if (wallet) {
        this.password = '';
        this.toastrService.success(this.doorgetsTranslateService.instant('#Account created!'));
        this.ngbActiveModal.dismiss();
      }
    }
  }

  create() {
    if (this.password) {
      if (this.wallet && this.wallet.address) {
        let wallet = this.walletService.open(this.wallet.data, this.password);

        if (!wallet) {
          this.password = '';
          this.wallet = null;
          this.toastrService.error(this.doorgetsTranslateService.instant('#Bad password'));
        } else {
          this.walletService.save(this.wallet.address, wallet, this.password);
          this.toastrService.success(this.doorgetsTranslateService.instant('#Wallet created') + ' !');
          this.ngbActiveModal.dismiss();
        }
      } else {
        let wallet = this.walletService.create(this.password);
        if (wallet) {
          this.password = '';
          this.toastrService.success(this.doorgetsTranslateService.instant('#Account created!'));
          this.ngbActiveModal.dismiss();
        }
      }
    }
  }
}
