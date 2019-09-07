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

import * as _ from 'lodash';

@Component({
  selector: 'app-settings-nodes-update',
  templateUrl: './settings-nodes-update.component.html',
  styleUrls: ['./settings-nodes-update.component.scss']
})
export class SettingsNodesUpdateComponent implements OnInit {
  nodes = [];

  index: number;

  found: boolean = false;

	node = {
		ip: '',
		rpcPort: '',
		messengerPort: ''
	};

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private modalActionService: ModalActionService,
    private ngbActiveModal: NgbActiveModal,
    private nodesService: SettingsNodesService) { }

  ngOnInit() {
    this.found = false;
    let ip = this.modalActionService.options.node && this.modalActionService.options.node.ip

    if (ip) {
      this.nodes = this.nodesService.nodes;
      let node = _.find(this.nodes, {
        ip: ip
      });

      let index = _.findIndex(this.nodes, {
        ip: ip
      });

      if (node) {
        this.node = node;

        this.found = true;
      }
    }
  }

  updateNode() {
    this.nodesService.nodes[this.index] = this.node;
    this.nodesService.saveToStorage();

    this.toastrService.success(this.doorgetsTranslateService.instant('#Node updated!'));
    this.ngbActiveModal.dismiss();
  }
}
