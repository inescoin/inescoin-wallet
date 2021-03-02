// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable } from '@angular/core';

import * as JSEncryptModule from 'jsencrypt';
import * as CryptoJS from 'crypto-js';
import * as Forge from 'node-forge';
import * as Elliptic from 'elliptic';

import { encrypt } from 'eccrypto';

const secp256k1: any = new Elliptic.ec("secp256k1"); // eslint-disable-line
import { fromPrivate } from 'eth-lib/lib/account';
import { keccak256, keccak256s } from 'eth-lib/lib/hash';
import { privateToPublic, isValidChecksumAddress } from 'ethereumjs-util';
import { UtilsService }  from './utils.service';
import Bytes from 'eth-lib/lib/bytes';

const crypto = require('crypto');

import { publicKeyConvert } from 'secp256k1';

(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;

@Injectable({
  providedIn: 'root'
})

export class CryptoJsService {

  ecConfig = {
      curveName: 'secp256k1',
      cipherAlgorithm: 'aes-256-cbc',
      ivSize: 16
  };

  ec = new Elliptic.ec('secp256k1');
  utils = new UtilsService();

  constructor() {}

  encrypt(message, publicKey) {
    let encrypt = new JSEncryptModule.JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(message);
  }

  decrypt(encrypted, privateKey) {
    var decrypt = new JSEncryptModule.JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    return decrypt.decrypt(encrypted);
  }

  sign(message, privateKey) {
    let encrypt = new JSEncryptModule.JSEncrypt();
    encrypt.setPrivateKey(privateKey);
    return encrypt.sign(message, CryptoJS.SHA256, "sha256");
  }

  verify(bytes, signature, publicKey) {
    let verify = new JSEncryptModule.JSEncrypt();
    verify.setPublicKey(publicKey);
    return verify.verify(bytes, signature, CryptoJS.SHA256);
  }

  ecSign(message, privateKey) {
    let key = this.ec.keyFromPrivate(privateKey, 'hex');
    return key.sign(this.bin2hex(message));
  }

  ecVerify(bytes, signature, publicKey) {
    let key = this.ec.keyFromPublic(publicKey, 'hex');
    return key.verify(this.bin2hex(bytes), signature);
  }

  hexString(buffer) {
    const byteArray = new Uint8Array(buffer);

    const hexCodes = [...byteArray].map(value => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, '0');
      return paddedHexCode;
    });

    return hexCodes.join('');
  }

  bin2hex (s) {
    return this.utils.bin2hex(s);
  }

  hex2bin (s) {
    return this.utils.hex2bin(s);
  }

  ecEncrypt(pk, msg, opts) {
    const ecdh = crypto.createECDH(this.ecConfig.curveName);
    if (!opts.esk) {
      console.error('ecEncrypt opts.esk');
    }

    ecdh.setPrivateKey(opts.esk, 'hex');

    let epk = ecdh.getPublicKey(null, opts.compressEpk ? 'compressed' : 'uncompressed');
    let hash = crypto.createHash('sha256').update(ecdh.computeSecret(pk, 'hex')).digest();
    let encKey = hash.slice(0, 32);
    let macKey = hash.slice(16);
    let iv = opts.iv || crypto.randomBytes(this.ecConfig.ivSize);
    let cipher = crypto.createCipheriv(this.ecConfig.cipherAlgorithm, encKey, iv);
    let ct = cipher.update(msg);
    ct = Buffer.concat([ct, cipher.final()]);
    let mac = crypto.createHmac('sha256', macKey).update(Buffer.concat([epk, iv, ct])).digest();
    return {epk, iv, ct, mac};
  }

  ecDecrypt(sk, body) {
    const ecdh = crypto.createECDH(this.ecConfig.curveName);
    ecdh.setPrivateKey(sk, 'hex');

    let hash = crypto.createHash('sha256')
      .update(ecdh.computeSecret(body.epk, 'hex'))
      .digest();

    let encKey = hash.slice(0, 32);
    let macKey = hash.slice(16);
    let mac = crypto.createHmac('sha256', macKey)
      .update(Buffer.concat([
        body.epk,
        body.iv, body.ct]
      )).digest();

    if (mac.compare(body.mac) !== 0 || body.mac.compare(mac) !== 0) {
      return null;
    }

    let decipher = crypto.createDecipheriv(this.ecConfig.cipherAlgorithm, encKey, body.iv);
    let pt = decipher.update(body.ct);
    return Buffer.concat([pt, decipher.final()]);
  };

  generateKeys() {
    const innerHex = keccak256(Bytes.concat(Bytes.random(32), Bytes.random(32)));
    const middleHex = Bytes.concat(Bytes.concat(Bytes.random(32), innerHex), Bytes.random(32));
    const privateKey = keccak256(middleHex);

    const buffer = new Buffer(privateKey.slice(2), "hex");
    const ecKey = secp256k1.keyFromPrivate(buffer);
    const publicKey = "0x" + ecKey.getPublic(false, 'hex').slice(2);
    const publicHash = keccak256(publicKey);
    const address = "0x" + publicHash.slice(-40);

    const addressHash = keccak256s(address.slice(2));
    let checksumAddress = "0x";
    for (let i = 0; i < 40; i++) {
      checksumAddress += parseInt(addressHash[i + 2], 16) > 7
        ? address[i + 2].toUpperCase()
        : address[i + 2];
    }

    let identity: any = {
      address: checksumAddress,
      privateKey: privateKey.slice(2),
      publicKey: ''
    };


    const finalePriateKey = !privateKey.startsWith('0x') ? '0x' + privateKey : privateKey;
    const publicKeyBuffer = privateToPublic(new Buffer(finalePriateKey.slice(2), 'hex'));
    identity.publicKey = publicKeyBuffer.toString('hex');


    let testBuffer = new Buffer(publicKeyBuffer.toString('hex'), 'hex');
    if (testBuffer.length === 64) {
       identity.publicKey = '04' + identity.publicKey;
    }

    let _publicKeyConvert: any = publicKeyConvert(
        new Buffer(identity.publicKey, 'hex'),
        true
    );

    let bufferPublicKeyConvert = new Buffer(_publicKeyConvert, 'hex');
    identity.publicKey = bufferPublicKeyConvert.toString('hex');

    return identity;
  }

  encryptFromPassword(plainText, passphrase) {
    let encrypted = '';
    try {
      encrypted = CryptoJS.AES.encrypt(plainText.trim(), passphrase.trim()).toString();
      this.decryptFromPassword(encrypted, passphrase);
    } catch(e) {}

    return encrypted;
  }

  decryptFromPassword(encrypted, passphrase) {
    let decrypted = '';
    try {
      decrypted = CryptoJS.AES.decrypt(encrypted.trim(), passphrase.trim()).toString(CryptoJS.enc.Utf8);
    } catch(e) {}

    return decrypted;
  }
}
