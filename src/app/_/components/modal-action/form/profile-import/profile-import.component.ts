// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';
import { SettingsProfileService } from '../../../../../account/settings/settings-profile/settings-profile.service';

import { inescoinConfig } from '../../../../../config/inescoin.config';

@Component({
  selector: 'app-profile-import',
  templateUrl: './profile-import.component.html',
  styleUrls: ['./profile-import.component.scss'],
  providers: [
    Location,
    {
       provide: LocationStrategy,
       useClass: PathLocationStrategy
  }],
})
export class ProfileImportComponent implements OnInit {

  password: string = '';
  file: File;
  profile = {};

  error = {
    file: ''
  };

  location: Location;

  constructor(
    location: Location,
    private router: Router,
    private toastrService: ToastrService,
    private settingsProfileService: SettingsProfileService,
    private doorgetsTranslateService: DoorgetsTranslateService,
    private ngbActiveModal: NgbActiveModal,) {
    this.location = location;
  }

  ngOnInit() {
  }

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  loadWallet(event) {
    this.file = event.target && event.target.files && event.target.files[0];
    this.profile = {};
    this.error.file = '';
  }

  checkPassword() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let content = fileReader.result;
      let profile = this.settingsProfileService.open(content, this.password);
      if (!profile) {
        this.error.file = 'File or password error';
      }

      try {
        this.profile = profile;


      } catch(e) {
        this.error = e;
      }

      if (this.profile) {
        this._cleanProfile();
        setTimeout(() => {
          this._loadProfile(profile);

          this.toastrService.success(this.doorgetsTranslateService.instant('#Profile imported!'));
          this.ngbActiveModal.dismiss();

          this.password = '';
          this.file = undefined;

          this.router.navigated = false;
          this.router.navigate(['']);
          this.location.go('/');
        }, 2000);
      } else {
        this.password = '';
        this.file = undefined;
      }
    }

    fileReader.readAsText(this.file);
  }

  importProfile() {
    this.checkPassword();
  }

  private _cleanProfile() {
    for(let storageKey of Object.keys(localStorage)) {
      localStorage.removeItem(storageKey);
    }
  }

  private _loadProfile(profile) {
    if (profile) {
      for(let storageKey of Object.keys(profile)) {
        localStorage.setItem(storageKey, profile[storageKey]);
      }
    }
  }

}
