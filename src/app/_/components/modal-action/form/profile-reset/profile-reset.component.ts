// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';
import { inescoinConfig } from '../../../../../config/inescoin.config';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-profile-reset',
  templateUrl: './profile-reset.component.html',
  styleUrls: ['./profile-reset.component.scss'],
  providers: [
    Location,
    {
       provide: LocationStrategy,
       useClass: PathLocationStrategy
  }],
})
export class ProfileResetComponent implements OnInit {

  config = {
    wallets: true,
    contacts: true,
    channels: true,
    nodes: true
  }

  location: Location;

  constructor(
    location: Location,
    private router: Router,
    private toastrService: ToastrService,
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

  remove() {
    if (this.config.wallets) {
      localStorage.removeItem(inescoinConfig.name + '-home');
      console.log('Local storage remove key: ' + inescoinConfig.name + '-home');

      localStorage.removeItem(inescoinConfig.name + '-wallets');
      console.log('Local storage remove key: ' + inescoinConfig.name + '-wallets');

      let accountRegexp = new RegExp(`${inescoinConfig.name}-account`, 'i')
      for(let storageKey of Object.keys(localStorage)) {
        if (accountRegexp.test(storageKey)) {
          console.log('Local storage remove key: ' + storageKey);
          localStorage.removeItem(storageKey);
        }
      }
    }

    if (this.config.nodes) {
      console.log('Local storage remove key: ' + inescoinConfig.name + '-nodes');
      localStorage.removeItem(inescoinConfig.name + '-nodes');
    }

    if (this.config.contacts) {
      console.log('Local storage remove key: ' + inescoinConfig.name + '-contacts');
      localStorage.removeItem(inescoinConfig.name + '-contacts');
    }

    if (this.config.channels) {
      console.log('Local storage remove key: ' + inescoinConfig.name + '-messenger-history');
      localStorage.removeItem(inescoinConfig.name + '-messenger-history');

      let messagesRegexp = new RegExp(`${inescoinConfig.name}-messenger-messages`, 'i')
      for(let storageKey of Object.keys(localStorage)) {
        if (messagesRegexp.test(storageKey)) {
          console.log('Local storage remove key: ' + storageKey);
          localStorage.removeItem(storageKey);
        }
      }
    }

    this.toastrService.success(this.doorgetsTranslateService.instant('#Profile reseted!'));

    this.dismiss();

    this.router.navigated = false;
    this.router.navigate(['']);
    this.location.go('/');
  }
}
