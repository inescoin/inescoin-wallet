// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-node-add',
  templateUrl: './node-add.component.html',
  styleUrls: ['./node-add.component.scss']
})
export class NodeAddComponent implements OnInit {

  constructor(private ngbActiveModal: NgbActiveModal,) { }

  ngOnInit() {
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }
}
