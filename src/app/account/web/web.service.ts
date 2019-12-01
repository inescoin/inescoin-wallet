// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';
import { CryptoJsService } from '../../_/services/crypto/crypto-js.service';
import { HttpService } from '../../_/services/http/http.service';

import { inescoinConfig } from '../../config/inescoin.config';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  domain = {};
  website = {};

  onDomainLangueAdded = new EventEmitter();

  onDomainProductAdded = new EventEmitter();
  onDomainProductsAdded = new EventEmitter();
  onDomainProductUpdated = new EventEmitter();
  onDomainProductRemoved = new EventEmitter();

  onDomainCategoriesAdded = new EventEmitter();
  onDomainCategoriesUpdated = new EventEmitter();
  onDomainCategoriesRemoved = new EventEmitter();

  onDomainTagAdded = new EventEmitter();
  onDomainLangueRemoved = new EventEmitter();

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

  saveWebsiteToStorage(url, website) {
    localStorage.setItem(inescoinConfig.name + '-domain-website-' + url, JSON.stringify(website))
  }

  getFromStorage() {
    let domain = localStorage.getItem(inescoinConfig.name + '-domain');
    if (domain) {
      return JSON.parse(domain);
    }

    return {};
  }

  getWebsiteFromStorage(url) {
    let website = localStorage.getItem(inescoinConfig.name + '-domain-website-' + url);
    if (website) {
      return JSON.parse(website);
    }

    return;
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
