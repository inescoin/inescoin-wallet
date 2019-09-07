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
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.scss']
})
export class WalletCreateComponent implements OnInit {

	password: string = '';

  constructor(
    private toastrService: ToastrService,
    private walletService: WalletService,
    private ngbActiveModal: NgbActiveModal,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private router: Router) { }

  ngOnInit() {
  }

  create() {
    if (this.password) {
      let wallet = this.walletService.create(this.password);
      if (wallet) {
        this.password = '';
        this.toastrService.success(this.doorgetsTranslateService.instant('#Account created!'));
        this.ngbActiveModal.dismiss();
      }
    }
  }
}
