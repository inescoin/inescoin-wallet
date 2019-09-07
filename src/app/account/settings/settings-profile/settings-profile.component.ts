// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';

import { SettingsProfileService } from './settings-profile.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.scss']
})
export class SettingsProfileComponent implements OnInit {
	profile: any = {};

  constructor(
  	private modalActionService: ModalActionService,
  	private settingsProfileService: SettingsProfileService) { }

  ngOnInit() {
  	this.profile = this.settingsProfileService.getProfile();
  }

  exportProfile() {
  	this.modalActionService.open('profileExport', {
      component: 'settings-profile',
      size: 'xs'
    });
  }

	importProfile() {
		this.modalActionService.open('profileImport', {
      component: 'settings-profile',
      size: 'xs'
    });
	}

	resetProfile() {
		this.modalActionService.open('profileReset', {
      component: 'settings-profile',
      size: 'xs'
    });
	}
}
