// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';

@Component({
  selector: 'app-domain-create',
  templateUrl: './domain-create.component.html',
  styleUrls: ['./domain-create.component.scss']
})
export class DomainCreateComponent implements OnInit {

  options: any = {}

  constructor(
    private ngbActiveModal: NgbActiveModal,
    private modalActionService: ModalActionService) { }

  ngOnInit() {
    this.options = this.modalActionService.options;
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }
}
