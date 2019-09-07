// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component } from '@angular/core';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';
import { ConfigService } from './_/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
  	private configService: ConfigService,
  	private doorgetsTranslateService: DoorgetsTranslateService) { }

	ngOnInit() {
	  this.doorgetsTranslateService.init({
	    languages: ['en', 'fr'],
	    current: this.configService.getLanguage(),
	    default: this.configService.getLanguage()
	  });
	}
}
