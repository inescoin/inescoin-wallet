// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { UtilsService }  from './utils.service';

import * as CryptoJS from 'crypto-js';


export class EciesService {

	utils = new UtilsService();

    privateKey;
    publicKey;
    rBuf;
    kEkM;
    kE;
    kM;
    opts;

    constructor(privateKey, publicKey, opts) {
    	opts.noKey = opts && opts.noKey || false;
    	opts.shortTag = opts && opts.shortTag || false;

    	this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.opts = opts;
    }

    getRbuf() {
        if (!this.rBuf) {
           this.rBuf = this.utils.hex2bin(this.privateKey.getPublic(true, "hex"));
        }

        return this.rBuf;
    }

    getSharedKey() {
      let shared = this.privateKey.derive(this.publicKey.getPublic());
      let bin = this.utils.hex2bin(shared.toString("hex"));

      return CryptoJS.SHA512(bin);
    }

    getkEkM() {
      if (this.kEkM) {
        this.kEkM = this.getSharedKey();
      }

      return this.kEkM;
    }

    getkE() {
      if (this.kE) {
        this.kE = this.getkEkM().substring(0, 32);
      }

      return this.kE;
    }

    getkM() {
      if (this.kM) {
        this.kM = this.getkEkM().substring(32, 64);
      }

      return this.kM;
    }

    private getPrivateEncKey() {
      let hex = this.privateKey.getPrivate("hex");

      return this.utils.hex2bin(hex);
    }

    // encrypt(message, ivbuf = null) {
    //     if (!ivbuf) {
    //     	let hmac = CryptoJS.HmacSHA256(message, $this->getPrivateEncKey());
    //         ivbuf = hmac.substring(0, 16);
    //     }

        // $c = ivbuf + Crypto::aes256CbcPkcs7Encrypt(message, $this->getkE(), ivbuf);
    //     $d = Crypto::hmacSha256($this->getkM(), $c);
    //     if (Utils::arrayValue($this->opts, "shortTag")) {
    //         $d = Utils::substring($d, 0, 4);
    //     }
    //     if (Utils::arrayValue($this->opts, "noKey")) {
    //         $encbuf = $c . $d;
    //     }
    //     else {
    //         $encbuf = $this->getRbuf() . $c . $d;
    //     }
    //     return $encbuf;
    // }

    // decrypt($encbuf) {
    //     $offset = 0;
    //     $tagLength = 32;
    //     if (Utils::arrayValue($this->opts, "shortTag")) {
    //         $tagLength = 4;
    //     }
    //     if (!Utils::arrayValue($this->opts, "noKey")) {
    //         $offset = 33;
    //          $this->publicKey = Utils::substring($encbuf, 0, 33);
    //     }

    //     $c = Utils::substring($encbuf, $offset, strlen($encbuf) - $tagLength);
    //     $d = Utils::substring($encbuf, strlen($encbuf) - $tagLength, strlen($encbuf));

    //     $d2 = Crypto::hmacSha256($this->getkM(), $c);
    //     if (Utils::arrayValue($this->opts, "shortTag")) {
    //         $d2 = Utils::substring($d2, 0, 4);
    //     }

    //     $equal = true;
    //     for ($i = 0; $i < strlen($d); $i++) {
    //         $equal &= ($d[$i] === $d2[$i]);
    //     }
    //     if (!$equal) {
    //         throw new \Exception("Invalid checksum");
    //     }

    //     return Crypto::aes256CbcPkcs7Decrypt(Utils::substring($c, 16, strlen($c)), $this->getkE(), Utils::substring($c, 0, 16));
    // }
}
