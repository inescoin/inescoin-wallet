// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';
import { inescoinConfig } from '../../../config/inescoin.config';
import { ModalActionService } from '../../../_/components/modal-action/modal-action.service';
import { DeepDiffMapperService } from '../../../_/services/deep-diff-mapper.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-web-details',
  templateUrl: './web-details.component.html',
  styleUrls: ['./web-details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebDetailsComponent implements OnInit {
  p: number = 1;
	hash: string = '';
	domainList: any[] = [];
  currentLocale: string = 'en';
  color: string = '#FFFFFF';

  inescoinConfig = inescoinConfig;

  generatedLangues: string[] = [];

  currentWebsite: any = {};

  tempSearch: any[];
  tempProducts: any[];

  data: any = {};

  remoteDomain: any = {};

  filters: any = {
    active: {
      all: true,
      on: true,
      off: true
    },
    categories: {
      all: true
    },
    query: '',
    amount: {
      from: 1,
      to: 1000,
      min: 1,
      max: 2
    }
  }

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
          store: false,
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
          backgroundImage: '',
          backgroundImageMobile: ''
        }],
        products: [],
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
              { link: '//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'},
              { link: '//fonts.googleapis.com/css?family=Merriweather+Sans:400,700'},
              { link: '//fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic'},
              { link: '//cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css'},
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


  diffModel: any = {};
  b64Model: string = '';

  isLoading: boolean = true;

  tinymceConfig: any = {
    height: 250,
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins: [
      "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
      "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
      "table directionality emoticons template paste"
    ],
    remove_script_host : 0,
    convert_urls : 0,
    extended_valid_elements:"style,link[href|rel]",
    custom_elements:"style,link,~link",
    valid_children : '+body[style]',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      '//cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      '//cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'
    ]
  };

  subjects: any = {};

  constructor(
    private route: ActivatedRoute,
    private modalActionService: ModalActionService,
    private webService: WebService,
    private ref: ChangeDetectorRef,
    private deepDiffMapperService: DeepDiffMapperService
  	) { }

  ngOnInit() {
  	this.hash = this.route.snapshot.params['hash'];
    this.domainList = this.webService.getFromStorage();

  	let domain = _.find(this.domainList, {
  		hash: this.hash
  	});

  	if (domain) {
  		this.domain = Object.assign({}, this.domain, domain);
      if (!this.domain.html[this.currentLocale].products) {
        this.domain.html[this.currentLocale].products = [];
      }

      if (!this.domain.html[this.currentLocale].categories) {
        this.domain.html[this.currentLocale].categories = [];
      }

      if (!this.domain.html[this.currentLocale].tags) {
        this.domain.html[this.currentLocale].tags = [];
      }

      this.currentWebsite = this.webService.getWebsiteFromStorage(domain.url);
      if (!this.currentWebsite) {
        this.currentWebsite = this._clone(this.domain.html);
      }

      if (!this.currentWebsite[this.currentLocale].products) {
        this.currentWebsite[this.currentLocale].products = [];
      }

      if (!this.currentWebsite[this.currentLocale].categories) {
        this.currentWebsite[this.currentLocale].categories = [];
      }

      if (!this.currentWebsite[this.currentLocale].tags) {
        this.currentWebsite[this.currentLocale].tags = [];
      }
  	}

    this.loadFromStorage();

    let wallets = this._getFromCache();
    if (wallets && wallets[this.domain.ownerAddress]) {
      this.data = wallets[this.domain.ownerAddress].data;
    }

    this.subjects.getUrlInfos = this.webService.getUrlInfos(this.domain.url)
      .subscribe((ulrData: any) => {
        let _domain;
        try {
          _domain = JSON.parse(atob(ulrData.body));
        } catch(e) {}

        if (_domain) {
          this.domain = Object.assign({}, this.domain, this._clone(_domain));
          this.remoteDomain = this._clone(_domain);

          if (!this.domain.html[this.currentLocale].products) {
            this.domain.html[this.currentLocale].products = [];
          }

          if (!this.remoteDomain.html[this.currentLocale].products) {
            this.remoteDomain.html[this.currentLocale].products = [];
          }

          if (!this.domain.html[this.currentLocale].categories) {
            this.domain.html[this.currentLocale].categories = [];
          }

          if (!this.remoteDomain.html[this.currentLocale].categories) {
            this.remoteDomain.html[this.currentLocale].categories = [];
          }

          if (!this.domain.html[this.currentLocale].tags) {
            this.domain.html[this.currentLocale].tags = [];
          }

          if (!this.remoteDomain.html[this.currentLocale].tags) {
            this.remoteDomain.html[this.currentLocale].tags = [];
          }
        }

        this.loadFromStorage();
        this._initGeneratedLangues();
        this._initRangeAmount();

        this.ref.detectChanges();
    });

    this.subjects.onDomainLangueAdded = this.webService.onDomainLangueAdded.subscribe((langue) => {
      this.setCurrentLocale(langue.code, langue.label, langue.from);

      this.saveWebsiteToStorage();
      this._initGeneratedLangues();
      this._initRangeAmount();
      this.ref.detectChanges();
    });

    this.subjects.onDomainProductAdded = this.webService.onDomainProductAdded.subscribe((product) => {
      console.log('product', product);
      if (!this.domain.html[this.currentLocale].products) {
        this.domain.html[this.currentLocale].products = [];
      }

      this.domain.html[this.currentLocale].products.unshift(product);
      this.ref.detectChanges();

      this.saveWebsiteToStorage();
    });

    this.subjects.onDomainProductsAdded = this.webService.onDomainProductsAdded.subscribe((products) => {
      console.log('products', products);
      if (!this.domain.html[this.currentLocale].products) {
        this.domain.html[this.currentLocale].products = [];
      }

      _.forEach(products, (product) => {
        if (product.sku && product.title && product.amount && product.currency && product.description) {
          this.domain.html[this.currentLocale].products.unshift(product);
          this.ref.detectChanges();
        }
      });

      this.saveWebsiteToStorage();
    });

    this.subjects.onDomainProductUpdated = this.webService.onDomainProductUpdated.subscribe((data) => {
      console.log('data', data);
      if (data.product && data.index !== -1) {
        this.domain.html[this.currentLocale].products[data.index] = data.product;
        this.ref.detectChanges();
        this.saveWebsiteToStorage();
      }
    });

    this.subjects.onDomainProductRemoved = this.webService.onDomainProductRemoved.subscribe((data) => {
      console.log('data', data);
      if (data.product) {
        _.remove(this.domain.html[this.currentLocale].products, {
          sku: data.product.sku
        });

        this.ref.detectChanges();
        this.saveWebsiteToStorage();
      }
    });

    this.subjects.onDomainCategoriesAdded = this.webService.onDomainCategoriesAdded.subscribe((category) => {
      console.log('category', category);
      if (!this.domain.html[this.currentLocale].categories) {
        this.domain.html[this.currentLocale].categories = [];
      }

      if (!category.parent) {
        this.domain.html[this.currentLocale].categories.unshift(category);
      } else {
        let parentCategoryIndex = _.findIndex(this.domain.html[this.currentLocale].categories, {
          sku: category.parent
        });

        if (parentCategoryIndex !== -1) {
          if (!this.domain.html[this.currentLocale].categories[parentCategoryIndex].children) {
            this.domain.html[this.currentLocale].categories[parentCategoryIndex].children = [];
          }

          this.domain.html[this.currentLocale].categories[parentCategoryIndex].children.unshift(category);
        }
      }


      this.ref.detectChanges();
      this.saveWebsiteToStorage();
    });

    this.subjects.onDomainCategoriesUpdated = this.webService.onDomainCategoriesUpdated.subscribe((models) => {
      console.log('models', models);
      let category = models.category;
      let parentSKU = models.parent;

      if (!category) {
        console.log('category not found.', category);
        return;
      }

      if (!parentSKU && parentSKU !== '') {
        console.log('parentSKU not found.', parentSKU);
        return;
      }

      let parentCategory;
      let parentCategoryIndex;
      if (parentSKU) {
        parentCategoryIndex = _.findIndex(this.domain.html[this.currentLocale].categories, {
          sku: parentSKU
        });

        if (parentCategoryIndex !== -1) {
          parentCategory = this.domain.html[this.currentLocale].categories[parentCategoryIndex];

          if (category.parent !== parentCategory.sku) {
             _.remove(this.domain.html[this.currentLocale].categories[parentCategoryIndex].children, {
              sku: category.sku
            });

            if (category.parent) {
              let index = _.findIndex(this.domain.html[this.currentLocale].categories, {
                sku: category.parent
              });

              if (index !== -1) {
                if (!this.domain.html[this.currentLocale].categories[index].children) {
                  this.domain.html[this.currentLocale].categories[index].children = [];
                }

                this.domain.html[this.currentLocale].categories[index].children.unshift(category);
              }
            } else {
              this.domain.html[this.currentLocale].categories.unshift(category);
            }
          }
        }
      } else {
        if (!parentSKU && category.parent) {
           _.remove(this.domain.html[this.currentLocale].categories, {
            sku: category.sku
           });

           let parentCategoryIndex = _.findIndex(this.domain.html[this.currentLocale].categories, {
             sku: category.parent
           });

          if (parentCategoryIndex !== -1) {
            if (!this.domain.html[this.currentLocale].categories[parentCategoryIndex].children) {
              this.domain.html[this.currentLocale].categories[parentCategoryIndex].children = [];
            }

            this.domain.html[this.currentLocale].categories[parentCategoryIndex].children.unshift(category);
          }
        }
      }

      this.ref.detectChanges();
      this.saveWebsiteToStorage();
    });

    this.subjects.onDomainCategoriesRemoved = this.webService.onDomainCategoriesRemoved.subscribe((category) => {
      console.log('remove category:', category);

      if (!category.parent) {
        _.remove(this.domain.html[this.currentLocale].categories, {
          sku: category.sku
        });
      } else {
        let index = _.findIndex(this.domain.html[this.currentLocale].categories, {
          sku: category.parent
        });

        if (index !== -1) {
          _.remove(this.domain.html[this.currentLocale].categories[index].children, {
            sku: category.sku
          });
        }
      }

      this.ref.detectChanges();
      this.saveWebsiteToStorage();
    });

    this.subjects.onDomainLangueRemoved = this.webService.onDomainLangueRemoved.subscribe((removeCode) => {
      let lgKeys = Object.keys(this.domain.html);

      if (lgKeys.length > 1 && this.domain.html[removeCode]) {
        delete this.domain.html[removeCode];
        this.currentLocale = lgKeys[0];
      }

      this.saveWebsiteToStorage();
      this._initGeneratedLangues();
      this._initRangeAmount();

      this.ref.detectChanges();
    });

    this._initGeneratedLangues();
    this._initRangeAmount();

    this.isLoading = false;
    //this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.subjects.getUrlInfos && this.subjects.getUrlInfos.unsubscribe();
    this.subjects.onDomainLangueRemoved && this.subjects.onDomainLangueRemoved.unsubscribe();
    this.subjects.onDomainLangueAddUpdated && this.subjects.onDomainLangueAddUpdated.unsubscribe();
    this.subjects.onDomainProductAdded && this.subjects.onDomainProductAdded.unsubscribe();
    this.subjects.onDomainProductsAdded && this.subjects.onDomainProductsAdded.unsubscribe();
    this.subjects.onDomainProductUpdated && this.subjects.onDomainProductUpdated.unsubscribe();
    this.subjects.onDomainProductRemoved && this.subjects.onDomainProductRemoved.unsubscribe();
    this.subjects.onDomainCategoriesAdded && this.subjects.onDomainCategoriesAdded.unsubscribe();
    this.subjects.onDomainCategoriesRemoved && this.subjects.onDomainCategoriesRemoved.unsubscribe();
  }

  private _initGeneratedLangues() {
    this.b64Model = this.toBase64();

    let langues = [];
    if (this.domain.html) {
      for (let langue of Object.keys(this.domain.html)) {
        if (this.domain.html[langue].label) {
          langues.push({
            code: langue,
            label: this.domain.html[langue].label
          })
        }
      }
    }

    this.generatedLangues = langues;

    return langues;
  }

  private _initRangeAmount() {
    if (this.domain.html && this.domain.html[this.currentLocale] && this.domain.html[this.currentLocale].products) {
      _.forEach(this.domain.html[this.currentLocale].products, (product) => {
        if (product.amount > this.filters.amount.max) {
           this.filters.amount.max = product.amount;
        }

        if (product.amount < this.filters.amount.min) {
           this.filters.amount.min = product.amount;
        }
      });
    }
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

  openProductCreateModal() {
    this.modalActionService.open('productCreate', {
      component: 'web',
      products: this.domain.html[this.currentLocale].products
    });
  }

  openProductImportModal() {
    this.modalActionService.open('productImport', {
      size: 'lg',
      component: 'web',
      products: this.domain.html[this.currentLocale].products
    });
  }


  openProductUpdateModal(product, index) {
    this.modalActionService.open('productUpdate', {
      component: 'web',
      product: this._clone(product),
      categories: this.domain.html[this.currentLocale].categories,
      index: index,
      size: 'lg',
    });
  }

  openProductRemoveModal(product, index) {
    this.modalActionService.open('productUpdate', {
      component: 'web',
      product: product,
      index: index
    });
  }

  openCategoriesCreateModal() {
    this.modalActionService.open('categoriesCreate', {
      component: 'web',
      categories: this.domain.html[this.currentLocale].categories
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

  setCurrentLocale(locale, label?, fromLocale?) {
    if (locale === this.currentLocale) {
      return;
    }

    fromLocale = fromLocale ? fromLocale : this.currentLocale;

    if (!this.domain.html[locale]) {
      this.domain.html[locale] = this._clone(this.domain.html[fromLocale]);
      this.domain.html[locale].website.active = false;
    }

    if (!this.domain.html[locale].products) {
      this.domain.html[locale].products = [];
    }

    if (!this.domain.html[locale].categories) {
      this.domain.html[locale].categories = [];
    }

    if (!this.domain.html[locale].tags) {
      this.domain.html[locale].tags = [];
    }

    if (label) {
      this.domain.html[locale].label = label;
    }

    this.currentLocale = locale;
    this.ref.detectChanges();
  }

  openDomainUpdateModal() {
    this.diffModel = this.deepDiffMapperService.difference(this.domain.html, this.remoteDomain.html);

    setTimeout(() => {
      this.modalActionService.open('domainUpdate', {
        component: 'web',
        size: 'lg',
        domain: this._clone(this.domain),
        diff: this._clone(this.diffModel)
      });
    }, 10);
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

  saveAsDraft() {
    this.saveWebsiteToStorage();
    this.diffModel = this.deepDiffMapperService.difference(this.currentWebsite, this.domain.html);
  }

  saveWebsiteToStorage() {
    this.webService.saveWebsiteToStorage(this.domain.url, this.domain.html);
  }

  reset() {
    this.domain = this._clone(this.remoteDomain);
    this.diffModel = {};
    this._initGeneratedLangues();
    this._initRangeAmount();
  }

  loadFromStorage() {

    let copy = this._clone(this.domain.html);
    let html = this.webService.getWebsiteFromStorage(this.domain.url);
    if (html) {
      this.domain.html = html;
      this.diffModel = this.deepDiffMapperService.difference(this.domain.html, copy);
      this._initGeneratedLangues();
      this._initRangeAmount();
    }

  }

  toBase64() {
    let encoded: any;
    try {
      encoded = btoa(JSON.stringify(this.domain.html));
    } catch(e) {
      return '';
    }

    return encoded;
  }

  fromBase64(data) {
    let decoded: any;
    try {
      let aData = atob(data);
      decoded = JSON.parse(aData);
    } catch(e) {
    }

    return decoded;
  }

  updateModelFromB64() {
    let decodedModel = this.fromBase64(this.b64Model);

    if (decodedModel) {
      this.domain.html = decodedModel.html ? decodedModel.html : decodedModel;
      this._initGeneratedLangues();
      this._initRangeAmount();
    } else {
      this.b64Model = this.toBase64();
    }

  }

  onTabChange(event) {
    //console.log('onTabChange::', event);
  }

  updateFilterActive(event) {

  }

  onActiveHandler(type) {
    if (!this.tempProducts) {
      this.tempProducts = this._clone(this.domain.html[this.currentLocale].products);
    }

    if (type === 'all') {
      if (this.filters.active.all) {
        this.filters.active.on = true;
        this.filters.active.off = true;
        this.domain.html[this.currentLocale].products = this._clone(this.tempProducts);
      }

      return;
    }

    let tempProducts: any;
    if (type === 'on') {
      tempProducts  = this.tempProducts.filter((product) => {
        return (product.active && this.filters.active.on)  || (!product.active && this.filters.active.off);
      });

      this.filters.active.all = this.filters.active.on && this.filters.active.off;
    }

    if (type === 'off') {
        tempProducts  = this.tempProducts.filter((product) => {
          return !product.active && this.filters.active.off || (product.active && this.filters.active.on);;
        });

      this.filters.active.all = this.filters.active.on && this.filters.active.off;
    }

    if (type === 'search') {
        return this.tempProducts.filter((product) => {
          return !product.active && this.filters.active.off || (product.active && this.filters.active.on);;
        });
    }

    if (tempProducts) {
      this.doSearch(tempProducts);
    }
  }

  doSearch(tempProductsFrom?) {
    this.tempSearch = tempProductsFrom || this.tempSearch;

    if (!this.tempSearch) {
      this.tempSearch = this._clone(this.domain.html[this.currentLocale].products);
    }

    if (this.filters.categories.all && this.filters.active.all && !this.filters.query && this.tempSearch) {
      this.domain.html[this.currentLocale].products = this._clone(this.tempSearch);
    }

    let tempProducts: any[] = this._clone(this.tempSearch);

    // Filters on categories
    if (!this.filters.categories.all) {
      let categorriesKeys = Object.keys(this.filters.categories);

      if (categorriesKeys.length > 1) {
        let tempKeys = [];

        for(let i = 0; categorriesKeys.length > i; i++) {
          if (this.filters.categories[categorriesKeys[i]]) {
            tempKeys.push(categorriesKeys[i]);
          }
        }

        tempProducts = tempProducts.filter(function(product) {
          return product.categories && (_.intersection(product.categories, tempKeys)).length;
        });
      }
    }

    // Filters on query
    if (this.filters.query) {
      tempProducts  = tempProducts.filter((product) => {
        return product.title.toLowerCase().indexOf(this.filters.query) !== -1
          || product.sku.toLowerCase().indexOf(this.filters.query) !== -1
          || product.description.toLowerCase().indexOf(this.filters.query) !== -1;
      });
    }

    // Filters on amount min max
    tempProducts  = tempProducts.filter((product) => {
      return product.amount >= this.filters.amount.from  && product.amount <= this.filters.amount.to;
    });

    this.p = 1;
    if (tempProducts) {
      this.domain.html[this.currentLocale].products = this._clone(tempProducts);
    }
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

  onCatagoriesChecked(filtersCategories) {
    setTimeout(() => {
      let keys = Object.keys(filtersCategories);
      let checkAll = true;
      for (let i = keys.length - 1; i >= 0; i--) {
        if (keys[i] !== 'all' && !filtersCategories[keys[i]]) {
          checkAll = false;
        }
      }

      filtersCategories.all = checkAll;

      this.filters.categories = this._clone(filtersCategories);

      this.doSearch();
    }, 300);
  }

  rangeChanged(event) {
    this.filters.amount.from = event.value.from || this.filters.amount.from;
    this.filters.amount.to = event.value.to || this.filters.amount.to;

    this.doSearch();
  }

  private _clone(source) {
    let _source: any;
    try {
      _source = JSON.parse(JSON.stringify(source))
    } catch(e) {}

    return _source;
  }
}
