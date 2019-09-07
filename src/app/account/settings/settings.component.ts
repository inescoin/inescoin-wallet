// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../_/services/http/http.service';

declare const InesConfig: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	remoteAddress = '';

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  	this.remoteAddress = this.httpService.base;
  }

  send() {
  	this.httpService.base = this.remoteAddress;
  }

}
