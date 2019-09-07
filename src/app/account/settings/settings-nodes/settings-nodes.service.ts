// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';
import { inescoinConfig } from '../../../config/inescoin.config';

@Injectable({
  providedIn: 'root'
})
export class SettingsNodesService {
  onUpdated = new EventEmitter();

  nodes = [];

  constructor() {
    let nodes = localStorage.getItem(inescoinConfig.name + '-nodes');
    try {
      if (!nodes || nodes == 'undefined') {
        this.saveToStorage();
      } else {
        this.nodes = JSON.parse(nodes);
      }
    } catch(e) {}
  }

  saveToStorage() {
    localStorage.setItem( inescoinConfig.name + '-nodes', JSON.stringify(this.nodes));
    this.onUpdated.emit(true);
  }

  add(node) {
    this.nodes.push({
      ip: node.ip,
      rpcPort: node.rpcPort,
      messengerPort: node.messengerPort,
    });

    this.saveToStorage();
  }
}
