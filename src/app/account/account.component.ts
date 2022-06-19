// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit, Inject, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ModalActionService } from '../_/components/modal-action/modal-action.service';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';
import { ConfigService } from '../_/services/config.service';
import { inescoinConfig } from '../config/inescoin.config';

import { ResizeService } from '../_/services/ui/resize-service.service';

import { DOCUMENT } from '@angular/common';
import { delay } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  inescoinConfig: any = inescoinConfig;
  chooseLanguage: string = 'en';
	pageName: string = 'wallet';

  isCollapsed = true;

  size: number = 1;
  responsiveSize: number = 768;

  showLeftMenu: boolean = false;
  showRightMenu: boolean = false;

  constructor(
  	private actRoute: ActivatedRoute,
    private configService: ConfigService,
    private doorGetTranslateService: DoorgetsTranslateService,
    private modalActionService: ModalActionService,
    private resizeSvc: ResizeService,
    private router: Router,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.chooseLanguage = this.configService.getLanguage();
    this.detectScreenSize();
  }

  ngOnDestroy(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("toggled");
    });
  }

  openModal(name, option) {
    this.modalActionService.open(name, option);
  }

  changeLanguage() {
    if (this.chooseLanguage) {
      this.doorGetTranslateService.setCurrent(this.chooseLanguage);

      this.configService.setLanguage(this.chooseLanguage);
    }
  }

  collapse() {
    if (window.screen.width < 768) {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    // this.detectScreenSize();
  }

  toogleLeftMenu() {
    this.showLeftMenu = !this.showLeftMenu;
    if (this.showRightMenu) {
      this.showRightMenu = false;
    }
  }

  toogleRightMenu() {
    this.showRightMenu = !this.showRightMenu;
    if (this.showLeftMenu) {
      this.showLeftMenu = false;
    }
  }

  hiddenMenu() {
    this.showRightMenu = false;
    this.showLeftMenu = false;
  }

  private detectScreenSize() {
    const currentSize = this._document.body.clientWidth;
    this.size = currentSize;
    this.resizeSvc.onResize(currentSize);
  }
}
