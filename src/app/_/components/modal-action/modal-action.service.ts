// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ModalActionService {

  currentName: string = '';
  options: any = {

  };

  onOpen: EventEmitter<any> = new EventEmitter();
  onClose: EventEmitter<any> = new EventEmitter();
  onDismiss: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  open(modalName?: string, options?) {
    this.close(this.currentName, true);

    this.currentName = modalName;

    this.options = Object.assign({}, this.options, options);

    this.onOpen.emit({
      name: modalName,
      option: this.options
    });
  }

  close(modalName?: string, verif?: boolean) {
    this.reset();
    if (!verif)
      this.onClose.emit(modalName || this.currentName);
  }

  has(modalName) {
    if (_.isString(modalName)) {
      return modalName === this.currentName;
    }
    else if (_.isArray(modalName)) {
      _.forEach(modalName, (name) => {
        if (name === this.currentName) {
          return true;
        }
      });
    }

    return false;

  }

  reset() {
    this.options = {};
  }
}
