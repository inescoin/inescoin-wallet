// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';

import { inescoinConfig } from '../../config/inescoin.config';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

	onHistoryUpdated = new EventEmitter();
	onMessageUpdated = new EventEmitter();

	history: any = {};

  constructor() {
  	let history = localStorage.getItem(inescoinConfig.name + '-messenger-history');
  	if (history) {
  		try {
	  		this.history = JSON.parse(history);
  		} catch(e) {}
  	} else {
  		this.saveHistoryToStorage();
  	}
  }

  startConversation(id, data) {
    let history = localStorage.getItem(inescoinConfig.name + '-messenger-history');
    if (history) {
      try {
        this.history = JSON.parse(history);
      } catch(e) {}
    }

  	if (!this.history[id]) {
  		this.history[id] = data;
  		this.saveHistoryToStorage();
  	}
  }

  getConversationMessages(id) {
  	let key = inescoinConfig.name + '-messenger-messages-' + id;
  	let messages = localStorage.getItem(key);
  	let jsonMessages = [];
  	if (messages) {
  		try {
	  		jsonMessages = JSON.parse(messages);
  		} catch(e) {}
  	} else {
  		localStorage.setItem(key, JSON.stringify(jsonMessages));
  	}

  	return jsonMessages;
  }

  messageExists(id, message) {
    let messages = this.getConversationMessages(id);

    return _.find(messages, {
      hash: message.hash
    }) && messages;
  }

  pushMessage(id, message) {
    if (!this.messageExists(id, message)) {
      let messages = this.getConversationMessages(id);
      messages.push(message);

      this.saveMessagesToStorage(id, messages);
      return true;
    }

    return false;
  }

  saveHistoryToStorage() {
  	localStorage.setItem(inescoinConfig.name + '-messenger-history', JSON.stringify(this.history));
  	this.onHistoryUpdated.emit(this.history);
  }

  saveMessagesToStorage(id, messages) {
    let _messages = _.orderBy(messages, ['createdAt'], ['asc']);
    localStorage.setItem(inescoinConfig.name + '-messenger-messages-' + id, JSON.stringify(_messages));
    this.onMessageUpdated.emit(messages);
  }

  saveMessage(walletAddress, message) {
    let key = inescoinConfig.name + '-messenger-wallet-' + walletAddress;
    let _conversations: string = localStorage.getItem(key);
    let conversations: any[] = [];
    if (_conversations) {
      conversations = JSON.parse(_conversations);

      if (!_.find(conversations, { hash:  message.hash})) {
        conversations.push(message);
      }
    }

    let _messages = _.orderBy(conversations, ['createdAt'], ['asc']);
    localStorage.setItem(key, JSON.stringify(_messages));
  }
}
