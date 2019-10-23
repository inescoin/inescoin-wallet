import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';
import { DiffEditorModel } from 'ngx-monaco-editor';
import { inescoinConfig } from '../../../config/inescoin.config';

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

  data: any = {};

  domain: any = {
    en: {
      data: {
        timezone: '',
        termsOfService: '',
        termsOfSales: '',
        privacyPolicy: '',
        faq: '',
        active: true,
      },
      meta: {
        title: '',
        description: '',
        keywords: '',
        langue: 'en'
      },
      pages: [],
      products: [],
      categories: [],
      theme: {
        colors: {
          '$body-bg': '#fff',
          '$gray-base': '#000',
          '$brand-primary': '#428bca',
          '$brand-success': '#5cb85c',
          '$brand-info': '#5bc0de',
          '$brand-warning': '#f0ad4e',
          '$brand-danger': '#d9534f',
        },
        font: {
          '$font-family-sans-serif':  '"Helvetica Neue", Helvetica, Arial, sans-serif',
          '$font-family-serif': 'Georgia, "Times New Roman", Times, serif'
        },
        buttons: {
          '$btn-font-weight': 'normal',
          '$btn-default-color': '#333',
          '$btn-default-bg': '#fff',
          '$btn-default-border': '#ccc',
          '$btn-primary-color': '#fff',
          '$btn-primary-bg': '#428bca',
          '$btn-success-color': '#fff',
          '$btn-success-bg': '#5cb85c',
          '$btn-info-color': '#fff',
          '$btn-info-bg': '#5bc0de',
          '$btn-warning-color': '#fff',
          '$btn-warning-bg': '#f0ad4e',
          '$btn-danger-color': '#fff',
          '$btn-danger-bg': '#d9534f',
        }
      },
      company: {
        name: '',
        slogan: '',
        description: '',
        logo: '',
        year: 2019
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
      socialNetwork: {
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
    },
    url: '',
    signature: '',
    ownerAddress: '',
    ownerPublicKey: '',
  };

  tinymceConfig: any = {
    height: 250,
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins: [
      "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
      "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
      "table directionality emoticons template paste"
    ],
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private modalActionService: ModalActionService,
    private webService: WebService
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
          this.domain = Object.assign({}, this.domain, _domain);
        }
    });
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
    this.domain[this.currentLocale].pages.push({
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

  addCategory() {
    this.domain[this.currentLocale].categories.push({label:''});
  }

  removeMovedItem(i, list) {
    delete this.domain.categories[i];
  }

  setCurrentLocale(locale) {
    if (!this.domain[locale]) {
      this.domain[locale] = _.clone(this.domain[this.currentLocale]);
      this.domain[locale].data.active = false;
    }

    if (!this.domain[locale].company) {
      this.domain[locale].company = {
        name: '',
        slogan: '',
        description: '',
        year: 2019
      };
    }

    this.currentLocale = locale;
  }

  openDomainUpdateModal() {
    this.modalActionService.open('domainUpdate', {
      component: 'web',
      size: 'lg',
      domain: this.domain
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
