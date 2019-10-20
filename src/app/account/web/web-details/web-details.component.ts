import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';
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

	domain: any = {
    data: {
      en: {
        timezone: '',
        termsOfService: '',
        termsOfSales: '',
        privacyPolicy: '',
        faq: '',
        active: true,
        langue: 'en'
      }
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
    meta: {
      en: {
        title: '',
        description: '',
        keywords: '',
        langue: 'en'
      }
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
      console.log(this.domain, domain);
  		this.domain = Object.assign({}, this.domain, domain);
  	}
  }

  setCurrentLocale(locale) {
    if (!this.domain.data[locale]) {
      this.domain.data[locale] = _.clone(this.domain.data[this.currentLocale]);
      this.domain.data[locale].locale = locale;
      this.domain.data[locale].active = false;

      this.domain.meta[locale] = _.clone(this.domain.meta[this.currentLocale]);
      this.domain.meta[locale].locale = locale;
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
}
