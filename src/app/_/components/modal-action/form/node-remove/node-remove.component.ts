// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsNodesService } from '../../../../../account/settings/settings-nodes/settings-nodes.service';
import { ModalActionService } from '../../modal-action.service';

@Component({
  selector: 'app-node-remove',
  templateUrl: './node-remove.component.html',
  styleUrls: ['./node-remove.component.scss']
})
export class NodeRemoveComponent implements OnInit {

  node: any = {}
	index: number;

  constructor(
  	private ngbActiveModal: NgbActiveModal,
  	private nodesService: SettingsNodesService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
  	this.index = this.modalActionService.options.index;
  	this.node = this.modalActionService.options.node;
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  remove() {
  	let temp = [...this.nodesService.nodes];

  	if (temp[this.index]) {
      temp.splice(this.index, 1);

      this.nodesService.nodes = [...temp];
      this.nodesService.saveToStorage();

  		this.ngbActiveModal.dismiss();
    } else {
    	this.ngbActiveModal.dismiss();
    }
  }
}
