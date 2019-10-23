// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { QrScannerService } from '../../../_/services/ui/qr-scanner.service';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

@Component({
  selector: 'app-contacts-create',
  templateUrl: './contacts-create.component.html',
  styleUrls: ['./contacts-create.component.scss']
})
export class ContactsCreateComponent implements OnInit {

	contact = {
		label: '',
		address: '',
		publicKey: '',
    walletId: ''
	};

  subjects: any = {};

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private modalActionService: ModalActionService,
    private qrScannerService: QrScannerService,
    private ngbActiveModal: NgbActiveModal,
    private contactsService: ContactsService) { }

  ngOnInit() {
    this.subjects.scan = this.qrScannerService.onScan.subscribe((result) => {
      if (result.component === 'contacts-create') {
        this.contact = result.contact;
      }
    });
  }

  createContact() {
  	if (this.contact.address.length > 10) {
	  	this.contactsService.add(this.contact);

      this.toastrService.success(this.doorgetsTranslateService.instant('#Contact created!'));
      this.ngbActiveModal.dismiss();
  	}
  }

  openModal(name, option) {
    this.modalActionService.open(name, option);
  }

  ngOnDestroy() {
    this.subjects.scan && this.subjects.scan.unsubscribe();
  }
}
