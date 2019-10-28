// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';
import { inescoinConfig } from '../../../config/inescoin.config';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-web-details',
  templateUrl: './web-details.component.html',
  styleUrls: ['./web-details.component.scss']
})
export class WebDetailsComponent implements OnInit {
	hash: string = '';
	domainList: any[] = [];
  currentLocale: string = 'en';
  color: string = '#FFFFFF';

  inescoinConfig = inescoinConfig;

  generatedLangues: string[] = [];

  data: any = {};

  domain: any = {
    html: {
      en: {
        label: 'English',
        website: {
          title: '',
          icon: '',
          timezone: '',
          active: true,
          analytics: {
            active: false,
            code: ''
          },
          meta: [{
              type: 'name',
              name: 'description',
              content: '',
            }, {
              type: 'name',
              name: 'keywords',
              content: '',
            }, {
              type: 'name',
              name: 'author',
              content: '',
          }]
        },
        company: {
          name: '',
          slogan: '',
          description: '',
          logo: '',
          year: 2019,
          termsOfService: '',
          termsOfSales: '',
          privacyPolicy: '',
          faq: '',
        },
        location: [{
          address: '',
          region: '',
          zipcode: '',
          city: '',
          country: '',
          longitude: '',
          latitude: '',
          phone: '',
          email: ''
        }],
        network: {
          github: '',
          facebook: '',
          twitter: '',
          linkedin: '',
          youtube: '',
          instagram: '',
          wechat: '',
          weibo: '',
          douyin: '',
          vkontakte: '',
          odnoKlassniki: '',
          telegram: '',
          whatsapp: '',
        },
        pages: [{
          menuTitle: '',
          shownInMenu: true,
          isLink: false,
          linkUrl: '',
          divId: '',
          label: '',
          body: '',
          backgroundOpacity: 100,
          height: '',
          backgroundImage: ''
        }],
        theme: {
          js: {
            value: '',
            links: [
              { link: '//code.jquery.com/jquery-3.3.1.min.js' },
              { link: '//stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' },
              { link: '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' },
              { link: '//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js' },
              { link: '//cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js' },
            ]
          },
          css: {
            value: '',
            links: [
              { link: '//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'},
            ]
          }
        }
      },
    },
    url: '',
    signature: '',
    ownerAddress: '',
    ownerPublicKey: '',
  };

  languages: any = [
    {
      code: 'fr',
      label: 'Français'
    }
  ];

  tinymceConfig: any = {
    height: 250,
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins: [
      "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
      "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
      "table directionality emoticons template paste"
    ],
    extended_valid_elements:"style,link[href|rel]",
    custom_elements:"style,link,~link",
    valid_children : '+body[style]',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    ]
  };

  subjects: any = {};

  constructor(
    private route: ActivatedRoute,
    private modalActionService: ModalActionService,
    private webService: WebService,
    private ref: ChangeDetectorRef
  	) { }

  ngOnInit() {
  	this.hash = this.route.snapshot.params['hash'];
  	this.domainList = this.webService.getFromStorage();

  	let domain = _.find(this.domainList, {
  		hash: this.hash
  	});

  	if (domain) {
  		this.domain = Object.assign({}, this.domain, domain);
  	}

    let wallets = this._getFromCache();
    if (wallets && wallets[this.domain.ownerAddress]) {
      this.data = wallets[this.domain.ownerAddress].data;
    }

    this.webService.getUrlInfos(this.domain.url)
      .subscribe((ulrData: any) => {
        let _domain;
        try {
          _domain = JSON.parse(atob(ulrData.body));
        } catch(e) {}

        if (_domain) {
          console.log('_domain', _domain);
          this.domain = Object.assign({}, this.domain, _domain);
        }

        this.initGeneratedLangues();
    });

    this.subjects.onDomainLangueAdded = this.webService.onDomainLangueAdded.subscribe((langue) => {
      this.setCurrentLocale(langue.code, langue.label);
      this.initGeneratedLangues();
      this.ref.detectChanges();
    });

    this.subjects.onDomainLangueRemoved = this.webService.onDomainLangueRemoved.subscribe((removeCode) => {
      let lgKeys = Object.keys(this.domain.html);

      if (lgKeys.length > 1 && this.domain.html[removeCode]) {
        delete this.domain.html[removeCode];
        this.currentLocale = lgKeys[0];
      }
      this.initGeneratedLangues();
      this.ref.detectChanges();
    });

    this.initGeneratedLangues();
  }

  ngOnDestroy() {
    this.subjects.onDomainLangueRemoved && this.subjects.onDomainLangueRemoved.unsubscribe();
    this.subjects.onDomainLangueAddUpdated && this.subjects.onDomainLangueAddUpdated.unsubscribe();
  }

  initGeneratedLangues() {
    let langues = [];
    for (let langue of Object.keys(this.domain.html)) {
      if (this.domain.html[langue].label) {
        langues.push({
          code: langue,
          label: this.domain.html[langue].label
        })
      }
    }


    this.generatedLangues = langues;
    return langues;
  }

  openDomainRenewModal() {
    this.modalActionService.open('domainAdd', {
      size: 'lg',
      component: 'web',
      type: 'renew',
      url: this.domain.url,
      from: this.domain.ownerAddress,
      publicKey: this.domain.ownerPublicKey,
      data: this.data
    });
  }

  openDomainChangeOwnerModal() {
    this.modalActionService.open('domainChangeOwner', {
      size: 'lg',
      component: 'web',
      type: 'changeOwner',
      url: this.domain.url,
      from: this.domain.ownerAddress,
      publicKey: this.domain.ownerPublicKey,
      data: this.data
    });
  }

  openDomainDeleteModal() {
    this.modalActionService.open('domainAdd', {
      size: 'lg',
      component: 'web',
      type: 'delete',
      url: this.domain.url,
      from: this.domain.ownerAddress,
      publicKey: this.domain.ownerPublicKey,
      data: this.data
    });
  }

  addPage() {
    this.domain.html[this.currentLocale].pages.push({
      menuTitle: '',
      shownInMenu: true,
      isLink: false,
      linkUrl: '',
      divId: '',
      label:'',
      body: '',
      backgroundOpacity: 100,
      height: '',
      backgroundImage: ''
    });
  }

  removePage(index) {
    this.domain.html[this.currentLocale].pages.splice(index, 1)
  }

  addLocation() {
    this.domain.html[this.currentLocale].location.push({
      address: '',
      region: '',
      zipcode: '',
      city: '',
      country: '',
      longitude: '',
      latitude: '',
      phone: '',
      email: ''
    });
  }

  removeLocation(index) {
    this.domain.html[this.currentLocale].location.splice(index, 1)
  }

  addMeta() {
    this.domain.html[this.currentLocale].website.meta.push({
      type: 'name',
      name: '',
      content: '',
    });
  }

  removeMeta(index) {
    this.domain.html[this.currentLocale].website.meta.splice(index, 1)
  }

  addCssLink() {
    this.domain.html[this.currentLocale].theme.css.links.push({
      link: '',
    });
  }

  removeCssLink(index) {
    this.domain.html[this.currentLocale].theme.css.links.splice(index, 1)
  }

  addJsLink() {
    this.domain.html[this.currentLocale].theme.js.links.push({
      link: '',
    });
  }

  removeJsLink(index) {
    this.domain.html[this.currentLocale].theme.js.links.splice(index, 1)
  }

  addCategory() {
    this.domain.html[this.currentLocale].categories.push({label:''});
  }

  removeCategory(index) {
    this.domain.html[this.currentLocale].categories.splice(index, 1)
  }

  mapActive() {
    let lgKeys = Object.keys(this.domain.html);
    // return lgKeys;
    return lgKeys.map((lg) => {
      if (this.domain.html[lg].website) {
        return {
          lg: lg,
          active: this.domain.html[lg].website.active
        }
      }
    });
  }

  setCurrentLocale(locale, label?) {
    if (locale === this.currentLocale) {
      return;
    }

    let current = _.clone(this.domain.html[this.currentLocale]);
    if (!this.domain.html[locale]) {
      this.domain.html[locale] = {
        website: {
          title: '',
          icon: '',
          timezone: '',
          active: true,
          analytics: {
            active: false,
            code: ''
          },
          meta: [{
              type: 'name',
              name: 'description',
              content: '',
            }, {
              type: 'name',
              name: 'keywords',
              content: '',
            }, {
              type: 'name',
              name: 'author',
              content: '',
          }]
        },
        company: {
          name: '',
          slogan: '',
          description: '',
          logo: '',
          year: 2019,
          termsOfService: '',
          termsOfSales: '',
          privacyPolicy: '',
          faq: '',
        },
        location: [{
          address: '',
          region: '',
          zipcode: '',
          city: '',
          country: '',
          longitude: '',
          latitude: '',
          phone: '',
          email: ''
        }],
        network: {
          github: '',
          facebook: '',
          twitter: '',
          linkedin: '',
          youtube: '',
          instagram: '',
          wechat: '',
          weibo: '',
          douyin: '',
          vkontakte: '',
          odnoKlassniki: '',
          telegram: '',
          whatsapp: '',
        },
        pages: [{
          menuTitle: '',
          shownInMenu: true,
          isLink: false,
          linkUrl: '',
          divId: '',
          label: '',
          body: '',
          backgroundOpacity: 100,
          height: '',
          backgroundImage: ''
        }],
        theme: {
          js: {
            value: '',
            links: [
              { link: '//code.jquery.com/jquery-3.3.1.slim.min.js' },
              { link: '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' },
              { link: '//stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' },
              { link: '//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js' },
              { link: '//cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js' },
            ]
          },
          css: {
            value: '',
            links: [
              { link: '//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'},
            ]
          }
        }
      };

      // this.domain.html[locale].website.title = current.website.title;
      // this.domain.html[locale].website.meta = current.website.meta;
      // this.domain.html[locale].website.icon = current.website.icon;
      // this.domain.html[locale].website.active = false;

      // this.domain.html[locale].company = current.company;
      // this.domain.html[locale].location = current.location;
      // this.domain.html[locale].network = current.network;
      // this.domain.html[locale].pages = current.pages;
      // this.domain.html[locale].theme = current.theme;

      this.domain.html[locale]
    }

    if (label) {
      this.domain.html[locale].label = label;
    }

    this.currentLocale = locale;
  }

  setCurrentNewLocale(locale) {
    this.currentLocale = locale;
  }

  openDomainUpdateModal() {
    this.modalActionService.open('domainUpdate', {
      component: 'web',
      size: 'lg',
      domain: this.domain
    });
  }

  openDomainAddLangueModal() {
    this.modalActionService.open('domainAddLangue', {
      component: 'web',
      size: 'lg',
      domain: this.domain
    });
  }

  openDomainRemoveLangueModal() {
    this.modalActionService.open('domainRemoveLangue', {
      component: 'web',
      size: 'lg',
      domain: this.domain,
      removeCode: this.currentLocale
    });
  }

  private _getFromCache() {
    let wallets = localStorage.getItem(inescoinConfig.name + '-wallets');
    if (!wallets) {
      return {
        hash: '',
        wallet: '',
        address: '',
        amount: 0,
        firstHeight: 0,
        lastHeight: 0,
        transactions: [],
        total: 0
      };
    } else {
      return JSON.parse(wallets);
    }
  }
}
