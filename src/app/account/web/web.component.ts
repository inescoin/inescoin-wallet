// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalActionService } from '../../_/components/modal-action/modal-action.service';
import { WebService } from './web.service';
import { WalletService } from '../wallet/wallet.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {
  domainList = [];
  wallet = {};

  subjects: any = {};

  constructor(
    private modalActionService: ModalActionService,
    private walletService: WalletService,
    private router: Router,
    private webService: WebService) { }

  ngOnInit() {
    this.domainList = this.webService.getFromStorage();
    this.wallet = this.walletService.accounts;

    this.subjects.getWalletAdressesInfos = this.webService.getWalletAdressesInfos(this.getWalletAdressesInfos())
      .subscribe((addresses: any) => {
        if (addresses && addresses.domainList) {
          this.webService.domain = addresses.domainList;
          this.domainList = addresses.domainList;
        } else {
          this.webService.domain = [];
          this.domainList = [];
        }

        this.webService.saveToStorage();
    });
  }

  openWebRoute(domain) {
    this.router.navigate(['domain', domain.hash]);
  }

  getWalletAdressesInfos() {
    return Object.keys(this.wallet).join(',') + ',0x9c7983ae76A0371fFce50Df3383eF53Dea0647b8';
  }

  openDomainCreateModal() {
    this.modalActionService.open('domainAdd', {
      component: 'web',
      size: 'lg',
      type: 'create'
    });
  }

  updateFilter(e) {}

  ngOnDestroy() {
    this.subjects.getWalletAdressesInfos && this.subjects.getWalletAdressesInfos.unsubscribe();
  }
}
