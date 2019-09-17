// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';

import * as JSEncryptModule from 'jsencrypt';
import * as CryptoJS from 'crypto-js';
import { publicKeyConvert } from 'secp256k1';

import { HttpService } from './http/http.service';
import { CryptoJsService } from './crypto/crypto-js.service';

import { inescoinConfig } from '../../config/inescoin.config';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  onRemoteResponse = new EventEmitter();

	blockchainConfigHash: string = inescoinConfig.configHash;

  amount: number = 0;
  unit: number = 1000000000;
  sendInProgress = false;
  lastDataSended = {};
  nodePublicKey: string = '';

  constructor(
  	private cryptoJsService: CryptoJsService,
  	private httpService: HttpService) { }

  sendToNode(messageData, publicKey, privateKey) {
    this.sendInProgress = true;

    let data = btoa(JSON.stringify(messageData));
    let dataArray = data.match(/.{1,20}/g);
    let dataLength = data.length;


    let encrypted = [];
    let ok = true;
    dataArray.forEach((part) => {
      let _part = this.cryptoJsService.encrypt(part, atob(this.nodePublicKey));
      let signature = this.cryptoJsService.ecSign(_part, privateKey);
      let signDER = signature.toDER('hex');

      let passed = this.cryptoJsService.ecVerify(_part, signDER, publicKey);
      if (passed) {
         encrypted.push({
          d: this.cryptoJsService.bin2hex(_part),
          s: signDER
        });
      } else {
        ok = false;
      }
    })

    if (ok) {
      let wrappedMessage = {
        message: encrypted,
        publicKey: publicKey
      };

      //console.log('wrappedMessage', wrappedMessage);

      this.httpService.post('transaction', wrappedMessage).subscribe((res) => {
      	//console.log('transaction response: ', res);
        this.onRemoteResponse.emit(res);
      })
    } else {
      console.error('Please try again');
    }
  }

  sendTransaction(fee, transfers, from, publicKey, privateKey) {
  	console.log('data', this._getFromCache());

    this.httpService.post('get-wallet-addresses-infos', {
      walletAddresses: from
    }).subscribe((wallet) => {
      if (wallet[from]) {
        let messageData = this._doEncryption(fee * 1000000000, transfers, from, wallet[from].hash, publicKey, privateKey);

        this.httpService.get('public-key').subscribe((node: any) => {
          this.nodePublicKey = node.publicKey;
          this.sendToNode(messageData, publicKey, privateKey);
          //console.log('node', node);
        }, (error) => {
          this.onRemoteResponse.emit([{
            error: '#Connection not found'
          }]);
        });
      }
      //console.log('wallet', wallet);
    }, (error) => {
      this.onRemoteResponse.emit([{
        error: '#Connection not found'
      }]);
    });

  }

  private _getFromCache() {
  	let wallets = localStorage.getItem('inescoin-wallets');
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

  private _doEncryption(fee, transfers, from, bankHash, publicKey, privateKey) {
    console.log('transfers', transfers);
    let encrypted = this._encryptTransaction(from, transfers);

    let sign = new JSEncryptModule.JSEncrypt();
    sign.setPrivateKey(privateKey);
    let date: any = Math.floor(Date.now() / 1000);

    let completeMessage = CryptoJS.SHA256(
      bankHash
      + this.blockchainConfigHash
      + from
      + encrypted
      + this.amount
      + date);

    //console.log('completeMessage', completeMessage.toString());
    let signature = this.cryptoJsService.ecSign(completeMessage.toString(), privateKey);

    let messageData: any = {
      fee: fee,
    	amount: this.amount,
      from: from,
      bankHash: bankHash,
      transfers: encrypted,
      signature: signature.toDER('hex'),
      publicKey: publicKey,
      createdAt: date
    };

    this.lastDataSended = messageData;

    return messageData;
  }

  private _encryptTransaction(from, transfers) {
    this.amount = 0;

    return btoa(JSON.stringify(transfers.filter(transfer => transfer.amount > 0).map((transfer) => {
      let datetime = (new Date()).getTime()
      let nonce = this.cryptoJsService.utils.bin2hex(
        '' + (Math.floor(Math.random() * 99999) + 11111)
        + '' + datetime
        + '' + (Math.floor(Math.random() * 99999) + 11111)
      );

      this.amount += transfer.amount * this.unit;

      return {
        to: transfer.to,
        amount: transfer.amount * this.unit,
        nonce: nonce,
        walletId: transfer.walletId,
        hash: (CryptoJS.SHA256(
          from
          + transfer.to
          + '' + (transfer.amount * this.unit)
          + '' + nonce
        )).toString()
      };
    })));
  }

  decryptWithPassword(data, password) {
  	return this.cryptoJsService.decryptFromPassword(data, password);
  }
}
