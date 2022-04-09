// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';

import { JSEncrypt } from 'jsencrypt';
import * as CryptoJS from 'crypto-js';
import { publicKeyConvert } from 'secp256k1';

// import { Socket } from 'ngx-socket-io';

import { HttpService } from './http/http.service';

import { CryptoJsService } from './crypto/crypto-js.service';
import { inescoinConfig } from '../../config/inescoin.config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = 'http://68.183.195.6:8180';

  onRemoteResponse = new EventEmitter();

  blockchainConfigHash: string = inescoinConfig.configHash;

  amount: number = 0;
  unit: number = 1000000000;
  sendInProgress = false;
  lastDataSended = {};
  nodePublicKey: string = '';

  constructor(
    // private socket: Socket,
  	private cryptoJsService: CryptoJsService,
  	private httpService: HttpService) {
  }

  ngOnInit() {}

  ecVerify(_part, signDER, publicKey) {
    return this.cryptoJsService.ecVerify(_part, signDER, publicKey);
  }

  sendToNode(messageData, publicKey, privateKey) {
    this.sendInProgress = true;

    try {
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


        this.httpService.post('message', wrappedMessage).subscribe((res) => {
          this.onRemoteResponse.emit(res);
        })
      } else {
        console.error('Please try again');
      }
    } catch(e) {
      console.log(messageData);
      console.error('Invalid Message Data Format');
    }
  }

  sendMessage(message, from, to, toPublicKey, fromPublicKey, fromPrivateKey) {
    let messageData = this._doEncryption(message, from, to, toPublicKey, fromPublicKey, fromPrivateKey);


    this.httpService.get('public-key').subscribe((node: any) => {
      this.nodePublicKey = node.publicKey;
      this.sendToNode(messageData, fromPublicKey, fromPrivateKey);
    });

    return messageData;
  }

  private _doEncryption(message, from, to, toPublicKey, fromPublicKey, fromPrivateKey) {
    let encrypted = this._encryptMessage(message, toPublicKey, fromPrivateKey)

    let sign = new JSEncrypt({});
    sign.setPrivateKey(fromPrivateKey);
    let date: any = Math.floor(Date.now() / 1000);

    let completeMessage = CryptoJS.SHA256(
      this.blockchainConfigHash
      + from
      + to
      + encrypted
      + date);

    let signature = this.cryptoJsService.ecSign(completeMessage.toString(), fromPrivateKey);

    let messageData: any = {
      fromWalletId: from,
      toWalletId: to,
      message: encrypted,
      signature: signature.toDER('hex'),
      publicKey: fromPublicKey,
      createdAt: date
    };

    this.lastDataSended = messageData;

    return messageData;
  }

  private _encryptMessage(message, toPublicKey, fromPrivateKey) {
    let cipher = this.cryptoJsService.ecEncrypt(toPublicKey, JSON.stringify(message), {
      esk: fromPrivateKey
    });

    let encrypted = {
      iv: cipher.iv.toString('hex'),
      ephemPublicKey: cipher.epk.toString('hex'),
      ciphertext: cipher.ct.toString('hex'),
      mac: cipher.mac.toString('hex')
    };

    let _publicKeyConvert: any = publicKeyConvert(
        new Buffer(encrypted.ephemPublicKey, 'hex'),
        true
    );

    let compressedKey = _publicKeyConvert.toString('hex');

    let ret = Buffer.concat([
        new Buffer(encrypted.iv, 'hex'), // 16bit
        new Buffer(compressedKey, 'hex'), // 33bit
        new Buffer(encrypted.mac, 'hex'), // 32bit
        new Buffer(encrypted.ciphertext, 'hex') // var bit
    ]);

    let encryptedHex = ret.toString('hex');

    return encryptedHex;
  }

  decryptMessage(privateKey, encryptedHex) {
    let finalDecrypted;
    try {
      const buf = new Buffer(encryptedHex, 'hex');

      const encryptedTwo = {
          iv: buf.toString('hex', 0, 16),
          ephemPublicKey: buf.toString('hex', 16, 49),
          mac: buf.toString('hex', 49, 81),
          ciphertext: buf.toString('hex', 81, buf.length)
      };

      let _publicKeyConvert: any = publicKeyConvert(
          new Buffer(encryptedTwo.ephemPublicKey, 'hex'),
          true
      );

      encryptedTwo.ephemPublicKey = _publicKeyConvert.toString('hex');

      const encryptedBuffer = {
          iv: new Buffer(encryptedTwo.iv, 'hex'),
          epk: new Buffer(encryptedTwo.ephemPublicKey, 'hex'),
          ct: new Buffer(encryptedTwo.ciphertext, 'hex'),
          mac: new Buffer(encryptedTwo.mac, 'hex')
      };

      finalDecrypted = this.cryptoJsService.ecDecrypt(privateKey, encryptedBuffer);
    } catch(e) {
      return null;
    }

    if (finalDecrypted) {
      const strFinalDescrypted = finalDecrypted.toString();
      return strFinalDescrypted.substring(1, strFinalDescrypted.length - 1)
    }

    return null;
  }

  decryptWithPassword(data, password) {
  	return this.cryptoJsService.decryptFromPassword(data, password);
  }

  getMessages(address) {
    return this.httpService.get('messages?addresses=' + address);
  }
}
