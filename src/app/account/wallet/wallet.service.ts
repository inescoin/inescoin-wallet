// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';
import { CryptoJsService } from '../../_/services/crypto/crypto-js.service';
import { HttpService } from '../../_/services/http/http.service';

import { inescoinConfig } from '../../config/inescoin.config';
import { saveAs } from 'file-saver';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  accounts = {};
  onListUpdated: any = new EventEmitter();

  constructor(
    private cryptoJsService: CryptoJsService,
    private httpService: HttpService) {

      let accounts = localStorage.getItem(inescoinConfig.name + '-wallets');
      if (!accounts || accounts == 'undefined') {
        this.saveToStorage();
      } else {
        this.accounts = JSON.parse(accounts);
      }
  }

  create(password) {
  	let newAccount = this.cryptoJsService.generateKeys();
  	this.save(newAccount.address, newAccount, password);

    return newAccount;
  }

  open(data, password) {
    try {
      let wallet = this.cryptoJsService.decryptFromPassword(data, password);
      let result = wallet ? JSON.parse(wallet) : null;
      if (result) {
        this.accounts[result.address] = {
          data: data,
          publicKey: result.publicKey
        };
        this.saveToStorage();
      }

      return result;
    } catch(e) {
      return null;
    }
  }

  save(address, data, password) {
    try {
      let _data = JSON.stringify(data);
      let encrypted = this.cryptoJsService.encryptFromPassword(_data, password);
      let blob = new Blob([encrypted], {type: "text/plain;charset=utf-8"});

      this.accounts[address] = {
        data: encrypted,
        publicKey: data.publicKey
      };

      this.saveToStorage();
      saveAs(blob, address + '.wallet');
    } catch(e) {
    }
  }

  updatePassword(address, data, password) {
    try {
      let _data = JSON.stringify(data);
      let encrypted = this.cryptoJsService.encryptFromPassword(_data, password);
      let blob = new Blob([encrypted], {type: "text/plain;charset=utf-8"});

      this.accounts[address].data = encrypted;
      this.saveToStorage();
      saveAs(blob, address + '.wallet');
    } catch(e) {
    }
  }

  openData(data, password) {
    let result = null;
    try {
      let wallet = this.cryptoJsService.decryptFromPassword(data, password);
      result = wallet ? JSON.parse(wallet) : null;
    } catch(e) {}

    return result;
  }

  removeWallet(address) {
    let home: any = localStorage.getItem(inescoinConfig.name + '-home');
    let wallets: any = localStorage.getItem(inescoinConfig.name + '-wallets');

    if (home) {
      home = JSON.parse(home);
    }

    if (wallets) {
      wallets = JSON.parse(wallets);
    }

    if (home[address]) {
      let _home: any = _.omit(home, address);
      localStorage.setItem(inescoinConfig.name + '-home', JSON.stringify(_home));
    }

    if (wallets[address]) {
      let _wallets: any = _.omit(wallets, address);
      this.accounts = _wallets;
      localStorage.setItem(inescoinConfig.name + '-wallets', JSON.stringify(_wallets));
    }

    localStorage.removeItem(inescoinConfig.name + '-account-' + address);

    this.onListUpdated.emit(true);
  }

  saveToStorage() {
    localStorage.setItem(inescoinConfig.name + '-wallets', JSON.stringify(this.accounts))
    this.onListUpdated.emit(true);
  }

  saveToHomeStorage(accounts) {
    localStorage.setItem(inescoinConfig.name + '-home', JSON.stringify(accounts))
  }

  getFromHomeStorage() {
    let home = localStorage.getItem(inescoinConfig.name + '-home');
    if (home) {
      return JSON.parse(home);
    }

    return {};
  }

  getFromWalletStorage() {
    let home = localStorage.getItem(inescoinConfig.name + '-wallets');
    if (home) {
      return JSON.parse(home);
    }

    return {};
  }

  getWalletInfos(address) {
    return this.httpService.post('get-wallet-address-infos', {
      walletAddress: address
    })
  }

  getWalletAdressesInfos(addresses) {
    return this.httpService.post('get-wallet-addresses-infos', {
      walletAddresses: addresses
    })
  }
}
