// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.scss']
})
export class TransferDetailsComponent implements OnInit {

	transfer: any = {};
	keys: string[];

  constructor(
  	private ngbActiveModal: NgbActiveModal,
    private modalActionService: ModalActionService) { }

  ngOnInit() {
  	this.transfer = this.modalActionService.options.transfer;
  	this.keys = Object.keys(this.transfer);
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

}
