import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalActionService } from '../../_/components/modal-action/modal-action.service';
import { WebService } from './web.service';
import { WalletService } from '../wallet/wallet.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {
  domainList = {};
  wallet = {};

  constructor(
    private modalActionService: ModalActionService,
    private walletService: WalletService,
    private router: Router,
    private webService: WebService) { }

  ngOnInit() {
    this.domainList = this.webService.getFromStorage();
    this.wallet = this.walletService.accounts;

    this.webService.getWalletAdressesInfos(this.getWalletAdressesInfos())
      .subscribe((addresses: any) => {
        if (addresses && addresses.domainList) {
          this.webService.domain = addresses.domainList;
          this.domainList = addresses.domainList;
        } else {
          this.webService.domain = [];
          this.domainList = [];
        }

        this.webService.saveToStorage();
    });
  }

  openWebRoute(domain) {
    this.router.navigate(['web', domain.hash]);
  }

  getWalletAdressesInfos() {
    return Object.keys(this.wallet).join(',');
  }

  openDomainCreateModal() {
    this.modalActionService.open('domainAdd', {
      component: 'web',
      size: 'lg',
      type: 'create'
    });
  }

  updateFilter(e) {

  }
}
