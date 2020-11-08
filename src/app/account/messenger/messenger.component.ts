import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ModalActionService } from '../../_/components/modal-action/modal-action.service';
import { MessengerService } from './messenger.service';
import { MessageService } from '../../_/services/message.service';
import { Socket } from 'ngx-socket-io';

import { inescoinConfig } from '../../config/inescoin.config';

import * as _ from 'lodash';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

	@ViewChild('scrollMe') private myScrollContainer: ElementRef;

	password: string = 'Amelmouna!123';
	message: string = '';

  showEmojiPicker = false;

  wallets: any = {};

	history: any = {};
	channels: any = [];

	subjects: any = {};

	current: any = {
		id: '',
		to: '',
		from: '',
		messages: []
	};

	conversations = [];

	inProgress: boolean = false;

  currentMessages = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private socket: Socket,
  	private messageService: MessageService,
  	private messengerService: MessengerService,
  	private modalActionService: ModalActionService,) {
  }

  ngOnInit() {
    let key = inescoinConfig.name + '-wallets';
    let wallets = localStorage.getItem(key);
    this.wallets = wallets && JSON.parse(wallets) || {};

		this.initHistory();

  	this.subjects.onHistoryUpdated = this.messengerService.onHistoryUpdated.subscribe((history) => {
  		if (history) {
  			this.initHistory(history);
  		}
  	});

  	this.startChat();
  	this._scrollToBottom();

    this.socket.fromEvent('message').subscribe((message) => {
    });

    this.socket.fromEvent('new-message').subscribe((message) => {
      this._checkMessageHistory(message);
    });
  }

  ngAfterViewChecked() {
    this._scrollToBottom();
  }

  getMessages() {
    this.messageService.getMessages(this.current.from.address).subscribe((data: any) => {
      data && data.messages && data.messages.forEach((message: any) => {
        this._checkMessageHistory(message);
      })
    });
  }

  initHistory(history?) {
    this.history = history || this.messengerService.history;

  	let conversations = [];
  	for(let channel of Object.keys(this.history)) {
  		conversations.push({
  			id: this.history[channel].id,
  			from: this.history[channel].from.address,
  			to: this.history[channel].to.address,
        date: this.history[channel].date || 0
  		})
  	}

    this.conversations = _.orderBy(conversations, ['date'], ['desc']);
    this.changeDetectorRef.detectChanges();
  }

  openModal() {
    this.modalActionService.open('startConversation', {
    	component: 'messenger',
    	size: 'lg',
    	// backdrop: false
    });
  }

  ngOnDestroy() {
  	this.subjects.onHistoryUpdated && this.subjects.onHistoryUpdated.unsubscribe();
  }

  startChat(channel?) {
  	this.current = channel || this.current;
    if (!this.current.id && this.conversations[0]) {
      this.current = this.conversations[0];
    }
  	this._loadMessages(this.current.id);

    if (this.wallets) {
      let addresses = Object.keys(this.wallets);

      this.socket.emit('authentication', {
        address: addresses.join(',')
      });
    }
  }

  private _loadMessages(id?: any) {
  	let ids = Object.keys(this.history);

  	if (ids.length) {
  		id = this.history[id] ? id : ids[0];
  		this.current = {
  			id: this.history[id].id,
  			to: this.history[id].to,
  			from: this.history[id].from,
  			messages: this.messengerService.getConversationMessages(this.history[id].id)
  		}
  	}
  }

  sendMessage() {
    this.inProgress = true;

  	let message = {
      address: this.current.from.address,
      original: this.message,
      date: Date.now(),
      isMe: true
    };

  	let decrypted: any = this.messageService.decryptWithPassword(
  		this.current.from.data,
  		this.password
  	);


    if (decrypted) {
      decrypted = JSON.parse(decrypted);

      let messageData = this.messageService.sendMessage(
      	this.message,
      	this.current.from.address,
      	this.current.to.address,
      	this.current.to.publicKey,
      	decrypted.publicKey,
      	decrypted.privateKey
      );

      let messageToPush = Object.assign({}, message, messageData);


      this.current.messages.push(messageToPush);

      this.messengerService.pushMessage(this.current.id, messageToPush);

      this.changeDetectorRef.detectChanges();
    } else {
      this.inProgress = false;
    }

  	this.message = '';
  }

  private _checkMessage(message) {
    let passed = this.messageService.ecVerify(message.hash, message.signature, message.publicKey);

    if (passed && message && (message.to === this.current.from.address && message.from === this.current.to.address || message.from === this.current.from.address && message.to === this.current.to.address)) {
      if (this.currentMessages.indexOf(message.signature) === -1) {

        let decrypted: any = this.messageService.decryptWithPassword(
          this.current.from.data,
          this.password
        );

        if (decrypted) {
          decrypted = JSON.parse(decrypted);

          message.body = this.messageService.decryptMessage(decrypted.privateKey, message.message);

          message.isMe = message.from === this.current.from.address;

          if (message.body && !message.isMe) {
            if (this.messengerService.pushMessage(this.current.id, message)) {
              this.current.messages.push(message);
            }

            this.currentMessages.push(message.signature);
          } else if (!message.isMe) {
            let sendedMessage = _.find(this.current.messages, {
              signature: message.signature
            });
          }
        }
      }
    }
  }

  private _checkMessageHistory(message) {
    let passed = this.messageService.ecVerify(message.hash, message.signature, message.publicKey);
    if (!passed) {
      return;
    }

    let addresses = Object.keys(this.wallets);
    let address = addresses.indexOf(message.to) !== -1
      ? message.to
      : message.from;

    this.messengerService.saveMessage(address, message);

    let ids = Object.keys(this.history);
    let idDERFrom = CryptoJS.SHA256(message.to + message.from).toString();
    let idDERTo = CryptoJS.SHA256(message.from + message.to).toString();

    if (this.messengerService.messageExists(idDERFrom, message)) {
      return;
    }

    if (this.wallets[message.to]) {
      if (!this.history[idDERFrom] || !this.history[idDERTo]) {
        this.messengerService.startConversation(idDERFrom, {
          id: idDERFrom,
          from: {
            address: message.to,
            data: this.wallets[message.to].data,
            publicKey: this.wallets[message.to].publicKey,
          },
          to: {
            address: message.from,
            publicKey: message.publicKey,
          }
        });
      }

      let decrypted: any = this.messageService.decryptWithPassword(
        this.wallets[message.to].data,
        this.password
      );

      if (decrypted) {
        decrypted = JSON.parse(decrypted);

        message.body = this.messageService.decryptMessage(decrypted.privateKey, message.message);

        if (message.body) {
          message.isMe = false;
          this.messengerService.pushMessage(idDERFrom, message);

          if (!this.messengerService.history[idDERFrom].date || this.messengerService.history[idDERFrom].date < message.createdAt) {
            this.messengerService.history[idDERFrom].date = message.createdAt;
          }

          if (idDERFrom === this.current.id || idDERTo === this.current.id) {
            this.current.messages.push(message);
          }

          this.messengerService.saveHistoryToStorage();
        } else {
        }
      } else {
      }
    }

    if (this.wallets[message.from]) {
    }




    // if (passed && message && (ids.indexOf(idDERFrom) !== -1 || ids.indexOf(idDERTo) !== -1 )) {

      // let decrypted: any = this.messageService.decryptWithPassword(
      //   this.current.from.data,
      //   this.password
      // );

      // if (decrypted) {
      //   decrypted = JSON.parse(decrypted);

      //   message.body = this.messageService.decryptMessage(decrypted.privateKey, message.message);

      //   message.isMe = message.from === this.current.from.address;

      //   if (message.body && !message.isMe) {
      //     if (this.messengerService.pushMessage(this.current.id, message)) {
      //       if (idDERFrom === this.current.id || idDERTo === this.current.id) {
      //         this.current.messages.push(message);
      //       }
      //     }

      //     this.currentMessages.push(message.signature);
      //   } else if (message.isMe) {
      //     let sendedMessage = _.find(this.current.messages, {
      //       signature: message.signature
      //     });
      //   }
      // }
    // }
  }

  addEmoji(event) {
    if (event.emoji && event.emoji.colons) {
      this.message = this.message + event.emoji.native;
      this.showEmojiPicker = false;
    }
  }

  private _scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
  }
}
