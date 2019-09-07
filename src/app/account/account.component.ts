// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ModalActionService } from '../_/components/modal-action/modal-action.service';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';
import { ConfigService } from '../_/services/config.service';
import { inescoinConfig } from '../config/inescoin.config';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  inescoinConfig: any = inescoinConfig;
  chooseLanguage: string = 'en';
	pageName: string = 'wallet';

  constructor(
  	private actRoute: ActivatedRoute,
    private configService: ConfigService,
    private doorGetTranslateService: DoorgetsTranslateService,
    private modalActionService: ModalActionService,) { }

  ngOnInit() {
    this.chooseLanguage = this.configService.getLanguage();
  }

  openModal(name, option) {
    this.modalActionService.open(name, option);
  }

  changeLanguage() {
    console.log('language', this.chooseLanguage)
    if (this.chooseLanguage) {
      this.doorGetTranslateService.setCurrent(this.chooseLanguage);

      this.configService.setLanguage(this.chooseLanguage);
    }
  }
}
