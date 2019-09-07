// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../../../../../account/contacts/contacts.service';
import { ModalActionService } from '../../modal-action.service';

@Component({
  selector: 'app-contact-remove',
  templateUrl: './contact-remove.component.html',
  styleUrls: ['./contact-remove.component.scss']
})
export class ContactRemoveComponent implements OnInit {

	contact: any = {}
	index: number;

  constructor(
  	private ngbActiveModal: NgbActiveModal,
  	private contactsService: ContactsService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
  	this.index = this.modalActionService.options.index;
  	this.contact = this.modalActionService.options.contact;
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  remove() {
  	let temp = [...this.contactsService.contacts];

  	if (temp[this.index]) {
      temp.splice(this.index, 1);

      this.contactsService.contacts = [...temp];
      this.contactsService.saveToStorage();

  		this.ngbActiveModal.dismiss();
    }
  }
}
