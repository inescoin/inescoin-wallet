// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';
import { WalletService } from '../../../../../account/wallet/wallet.service';
import { MessengerService } from '../../../../../account/messenger/messenger.service';
import { ContactsService } from '../../../../../account/contacts/contacts.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-start-conversation',
  templateUrl: './start-conversation.component.html',
  styleUrls: ['./start-conversation.component.scss']
})
export class StartConversationComponent implements OnInit {
  contacts: any = [];
  addresses: any = {};

  toValue: any = '';
  toPublicKeyValue: any = '';
  fromValue: any = '';

  to: any = {};
  from: any = {};

  constructor(
    private walletService: WalletService,
    private messengerService: MessengerService,
    private contactsService: ContactsService,
  	private ngbActiveModal: NgbActiveModal,
    private modalActionService: ModalActionService) { }

  ngOnInit() {
    this.addresses = this.walletService.getFromWalletStorage();

    this.contacts = this.contactsService.contacts && this.contactsService.contacts.map((contact: any) => {
      contact.value = contact.label + ' ' + contact.address;
      return contact;
    }) || [];
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  getAdressesArray() {
    let addresses = [];
    for(let address of Object.keys(this.addresses)) {
      addresses.push({
        address: address,
        publicKey: this.addresses[address].publicKey
      });
    }

    return addresses;
  }

  onFromChange(event) {
    if (this.fromValue) {
      this.from = this.addresses[this.fromValue];
      this.from.address = this.fromValue;
    }
  }

  onSelectTransferTo(event) {
    this.to = event.item;
    this.toPublicKeyValue = this.to && this.to.publicKey;
  }

  start() {
    if ((this.toValue && this.toPublicKeyValue) || (this.to && this.to.publicKey && this.from && this.from.publicKey)) {

      let toPublicKey = this.to.publicKey || this.toPublicKeyValue;
      let fromPublicKey = this.from.publicKey || this.fromValue;

      if (!this.to.publicKey) {
        this.to = {
          address: this.toValue,
          publicKey: this.toPublicKeyValue
        };
      }

      let idDER = CryptoJS.SHA256(this.from.address + this.to.address);
      let channel = {
        id: idDER.toString(),
        to: this.to,
        from: this.from,
      };

      this.messengerService.startConversation(channel.id, channel);

      this.ngbActiveModal.close();
    }
  }
}
