// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable } from '@angular/core';
import { CryptoJsService } from '../../_/services/crypto/crypto-js.service';
import { HttpService } from '../../_/services/http/http.service';

import { inescoinConfig } from '../../config/inescoin.config';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  domain = {};

  constructor(
    private cryptoJsService: CryptoJsService,
    private httpService: HttpService) {

      let domain = localStorage.getItem(inescoinConfig.name + '-domain');
      if (!domain || domain == 'undefined') {
        this.saveToStorage();
      } else {
        this.domain = JSON.parse(domain);
      }
  }

  saveToStorage() {
    localStorage.setItem(inescoinConfig.name + '-domain', JSON.stringify(this.domain))
  }

  getFromStorage() {
    let domain = localStorage.getItem(inescoinConfig.name + '-domain');
    if (domain) {
      return JSON.parse(domain);
    }

    return {};
  }

  getWalletAdressesInfos(addresses) {
    return this.httpService.post('get-wallet-addresses-domain', {
      walletAddresses: addresses
    })
  }

  getUrlInfos(url) {
    return this.httpService.post('get-domain-url', {
      url: url
    })
  }
}
