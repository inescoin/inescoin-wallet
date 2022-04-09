import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

import { io } from "socket.io-client";
import { inescoinConfig } from '../../config/inescoin.config';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    this.socket = io(inescoinConfig.messengerAddress, { transports : ['websocket'] });
  }

  authentication(addresses) {
    this.socket.emit('authentication', {
      address: addresses
    });
  }

  public getNewMessage = () => {
    this.socket.on('new-message', (message) => {
      console.log('new-message');
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
