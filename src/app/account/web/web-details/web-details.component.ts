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
    html: {
      en: {
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

  removePage(index) {
    this.domain[this.currentLocale].pages.splice(index, 1)
  }

  addLocation() {
    this.domain[this.currentLocale].location.push({
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
    this.domain[this.currentLocale].location.splice(index, 1)
  }

  addMeta() {
    this.domain[this.currentLocale].website.meta.push({
      type: 'name',
      name: '',
      content: '',
    });
  }

  removeMeta(index) {
    this.domain[this.currentLocale].website.meta.splice(index, 1)
  }

  addCssLink() {
    this.domain[this.currentLocale].theme.css.links.push({
      link: '',
    });
  }

  removeCssLink(index) {
    this.domain[this.currentLocale].theme.css.links.splice(index, 1)
  }

  addJsLink() {
    this.domain[this.currentLocale].theme.js.links.push({
      link: '',
    });
  }

  removeJsLink(index) {
    this.domain[this.currentLocale].theme.js.links.splice(index, 1)
  }

  addCategory() {
    this.domain[this.currentLocale].categories.push({label:''});
  }

  removeCategory(index) {
    this.domain[this.currentLocale].categories.splice(index, 1)
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

  setCurrentLocale(locale) {
    if (locale === this.currentLocale) {
      return;
    }

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
