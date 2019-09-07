// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';
import { inescoinConfig } from '../../config/inescoin.config';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  onUpdated = new EventEmitter();

	contacts = [];

  constructor() {
  	let contacts = localStorage.getItem(inescoinConfig.name + '-contacts');
  	try {
	    if (!contacts || contacts == 'undefined') {
	      this.saveToStorage();
	    } else {
	      this.contacts = JSON.parse(contacts);
	    }
  	} catch(e) {}
  }

  saveToStorage() {
    localStorage.setItem( inescoinConfig.name + '-contacts', JSON.stringify(this.contacts));
    this.onUpdated.emit(true);
  }

  add(contact) {

  	this.contacts.push({
      id: uuid.v4(),
      label: contact.label,
      address: contact.address,
      publicKey: contact.publicKey,
      walletId: contact.walletId,
  	});

  	this.saveToStorage();
  }
}
