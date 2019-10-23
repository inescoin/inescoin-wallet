// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';
import { SettingsNodesService } from './settings-nodes.service';

@Component({
  selector: 'app-settings-nodes',
  templateUrl: './settings-nodes.component.html',
  styleUrls: ['./settings-nodes.component.scss']
})
export class SettingsNodesComponent implements OnInit {
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

	nodes: any[] = [];
  temp: any[] = [];

  subjects: any = {};

  constructor(
    private settingsNodesService: SettingsNodesService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
  	this.nodes = this.settingsNodesService.nodes || [];
    this.temp = this.settingsNodesService.nodes && [...this.settingsNodesService.nodes];

    this.subjects.nodesList = this.settingsNodesService.onUpdated.subscribe(() => {

      this.nodes = [...this.settingsNodesService.nodes];
      this.temp = [...this.settingsNodesService.nodes];
    });
  }

  public getRowIndex(row: any): number {
      return this.table.bodyComponent.getRowIndex(row);   // row being data object passed into the template
  }

  openSettingNodeCreateModal() {
    this.modalActionService.open('nodeAdd', {
      component: 'nodes',
      size: 'xs'
    });
  }

  openSettingNodeEditModal(node) {
    this.modalActionService.open('nodeEdit', {
      component: 'nodes',
      node: node,
      size: 'xs'
    });
  }

  openSettingNodeRemoveModal(node, index) {
    this.modalActionService.open('nodeRemove', {
      component: 'nodes',
      node: node,
      index: index
    });
  }

  ngOnDestroy() {
    this.subjects.nodesList && this.subjects.nodesList.unsubscribe();
  }
}
