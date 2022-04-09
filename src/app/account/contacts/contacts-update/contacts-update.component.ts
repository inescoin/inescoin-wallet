// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

import * as _ from 'lodash';

@Component({
  selector: 'app-contacts-update',
  templateUrl: './contacts-update.component.html',
  styleUrls: ['./contacts-update.component.scss']
})
export class ContactsUpdateComponent implements OnInit {
  contacts = [];

  id: number;
  index: number;

	contact = {
		label: '',
		address: '',
		publicKey: '',
    reference: ''
	};


  found: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private ngbActiveModal: NgbActiveModal,
    private modalActionService: ModalActionService,
    private contactsService: ContactsService) { }

  ngOnInit() {
    // let address = this.route.snapshot.params['address'];
    this.found = false;
    let id = this.modalActionService.options.contact && this.modalActionService.options.contact.id

    if (id) {
      this.contacts = this.contactsService.contacts;
      let contact = _.find(this.contacts, {
        id: id
      });

      if (contact) {
        this.contact = contact;

        this.found = true;
      }
    }
  }

  updateContact() {
    let index = _.findIndex(this.contacts, {
      id: this.id
    });

    if (index) {
      this.contactsService.contacts[index] = this.contact;
      this.contactsService.saveToStorage();

      this.toastrService.success(this.doorgetsTranslateService.instant('#Contact updated!'));
      this.ngbActiveModal.dismiss();
    }
  }

}
