// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';
import { inescoinConfig } from '../../../config/inescoin.config';
import { CryptoJsService } from '../../../_/services/crypto/crypto-js.service';
import { HttpService } from '../../../_/services/http/http.service';

import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SettingsProfileService {

	contacts = [];

  constructor(
    private cryptoJsService: CryptoJsService,
    private httpService: HttpService) {}

  getProfile() {
    return {
      nodes: this.getNodesCount(),
      wallets: this.getWalletsCount(),
      contacts: this.getContactsCount(),
      channels: this.getChannelsCount(),
    };
  }

  getNodesCount() {
    let nodes = localStorage.getItem(inescoinConfig.name + '-nodes');
    let _nodes;
    try {
      _nodes = JSON.parse(nodes);
    } catch(e) {}

    return _nodes && _nodes.length || 0;
  }

  getContactsCount() {
    let contacts = localStorage.getItem(inescoinConfig.name + '-contacts');
    let _contacts;
    try {
      _contacts = JSON.parse(contacts);
    } catch(e) {}

    return _contacts && _contacts.length || 0;
  }

  getWalletsCount() {
    let wallets = localStorage.getItem(inescoinConfig.name + '-wallets');
    let _wallets;
    try {
      _wallets = JSON.parse(wallets);
    } catch(e) {}

    return _wallets && Object.keys(_wallets).length || 0;
  }

  getChannelsCount() {
    let channels = localStorage.getItem(inescoinConfig.name + '-messenger-history');
    let _channels;
    try {
      _channels = JSON.parse(channels);
    } catch(e) {}

    return _channels && Object.keys(_channels).length || 0;
  }

  open(data, password) {
    try {
      let profile = this.cryptoJsService.decryptFromPassword(data, password);
      let result = profile ? JSON.parse(profile) : null;

      return result;
    } catch(e) {
      return null;
    }
  }

  save(filename, data, password) {
    try {
      let _data = JSON.stringify(data);
      let encrypted = this.cryptoJsService.encryptFromPassword(_data, password);
      let blob = new Blob([encrypted], {type: "text/plain;charset=utf-8"});

      saveAs(blob, filename + '.profile');
    } catch(e) {
    }
  }
}
