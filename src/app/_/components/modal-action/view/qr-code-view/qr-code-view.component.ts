// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';

@Component({
  selector: 'app-qr-code-view',
  templateUrl: './qr-code-view.component.html',
  styleUrls: ['./qr-code-view.component.scss']
})
export class QrCodeViewComponent implements OnInit {

	qrCode: any = {};
	qrCodeString: string = '';

  constructor(
  	private ngbActiveModal: NgbActiveModal,
    private modalActionService: ModalActionService) { }

  ngOnInit() {
  	this.qrCode = this.modalActionService.options.contact;
  	try {
  		this.qrCodeString = JSON.stringify(this.qrCode);
  	} catch(e) {}
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

}
