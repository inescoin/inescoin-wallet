// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-messenger',
  templateUrl: './settings-messenger.component.html',
  styleUrls: ['./settings-messenger.component.scss']
})
export class SettingsMessengerComponent implements OnInit {

	config: any = {
		activeMessenger: true
	}

  constructor() { }

  ngOnInit() {
  }

  onActiveMessengerChange(event) {
  }
}
