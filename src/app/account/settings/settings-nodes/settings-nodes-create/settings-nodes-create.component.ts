// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { SettingsNodesService } from '../settings-nodes.service';
import { Router } from '@angular/router';
import { ModalActionService } from '../../../../_/components/modal-action/modal-action.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';

@Component({
  selector: 'app-settings-nodes-create',
  templateUrl: './settings-nodes-create.component.html',
  styleUrls: ['./settings-nodes-create.component.scss']
})
export class SettingsNodesCreateComponent implements OnInit {

	node = {
		ip: '',
		rpcPort: '',
		messengerPort: ''
	};

  subjects: any = {};

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private modalActionService: ModalActionService,
    private ngbActiveModal: NgbActiveModal,
    private nodesService: SettingsNodesService) { }

  ngOnInit() {}

  addNode() {
  	if (this.node.ip && this.node.rpcPort && this.node.messengerPort) {
	  	this.nodesService.add(this.node);

      this.toastrService.success(this.doorgetsTranslateService.instant('#Node added!'));
      this.ngbActiveModal.dismiss();
  	}
  }

  openModal(name, option) {
    this.modalActionService.open(name, option);
  }
}
