// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';
import { SettingsProfileService } from '../../../../../account/settings/settings-profile/settings-profile.service';

import { inescoinConfig } from '../../../../../config/inescoin.config';

@Component({
  selector: 'app-profile-export',
  templateUrl: './profile-export.component.html',
  styleUrls: ['./profile-export.component.scss']
})
export class ProfileExportComponent implements OnInit {

	config = {
		wallets: true,
		contacts: true,
		channels: true,
		nodes: true,
		filename: '',
		password: ''
	}

  constructor(
    private toastrService: ToastrService,
  	private settingsProfileService: SettingsProfileService,
    private doorgetsTranslateService: DoorgetsTranslateService,
  	private ngbActiveModal: NgbActiveModal,) { }

  ngOnInit() {}

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  exportProfile() {
  	let filename = this.config.filename.toLowerCase() + '_' + inescoinConfig.name + '_profile_' + Date.now();
  	let data = localStorage;
  	let password = this.config.password;

  	let backup: any = {}

  	if (this.config.wallets) {
  		backup[inescoinConfig.name + '-home'] = localStorage.getItem(inescoinConfig.name + '-home');
  		backup[inescoinConfig.name + '-wallets'] = localStorage.getItem(inescoinConfig.name + '-wallets');

  		let accountRegexp = new RegExp(`${inescoinConfig.name}-account`, 'i')
  		for(let storageKey of Object.keys(localStorage)) {
  			if (accountRegexp.test(storageKey)) {
  				backup[storageKey] = localStorage.getItem(storageKey);
  			}
  		}
  	}

  	if (this.config.nodes) {
  		backup[inescoinConfig.name + '-nodes'] = localStorage.getItem(inescoinConfig.name + '-nodes');
  	}

  	if (this.config.contacts) {
  		backup[inescoinConfig.name + '-contacts'] = localStorage.getItem(inescoinConfig.name + '-contacts');
  	}

  	if (this.config.channels) {
  		backup[inescoinConfig.name + '-messenger-history'] = localStorage.getItem(inescoinConfig.name + '-messenger-history');

  		let messagesRegexp = new RegExp(`${inescoinConfig.name}-messenger-messages`, 'i')
  		for(let storageKey of Object.keys(localStorage)) {
  			if (messagesRegexp.test(storageKey)) {
  				backup[storageKey] = localStorage.getItem(storageKey);
  			}
  		}
  	}

  	this.settingsProfileService.save(filename, backup, password);
    this.toastrService.success(this.doorgetsTranslateService.instant('#Profile exported!'));

  	this.dismiss();
  }
}
