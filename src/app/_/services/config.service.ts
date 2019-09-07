// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable } from '@angular/core';
import { inescoinConfig } from '../../config/inescoin.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

	constructor() {
		console.log('inescoinConfig', inescoinConfig.name);
	}

	setLanguage(langue) {
		localStorage.setItem(inescoinConfig.name + '-languge', langue);
	}

	getLanguage() {
		return localStorage.getItem(inescoinConfig.name + '-languge') || 'en';
	}
}
