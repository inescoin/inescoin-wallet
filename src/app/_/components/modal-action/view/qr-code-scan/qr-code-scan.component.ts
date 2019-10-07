// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, ViewChild, OnInit, VERSION } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';

import { QrScannerService } from '../../../../services/ui/qr-scanner.service';

@Component({
  selector: 'app-qr-code-scan',
  templateUrl: './qr-code-scan.component.html',
  styleUrls: ['./qr-code-scan.component.scss']
})
export class QrCodeScanComponent implements OnInit {

  @ViewChild('scanner', {static: false})
  scanner: ZXingScannerComponent;

	ngVersion = VERSION.full;

  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  constructor(
    private qrScannerService: QrScannerService,
    private ngbActiveModal: NgbActiveModal,
    private modalActionService: ModalActionService) { }

  ngOnInit(): void {
  }

  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;

    let jsonResult: any;
    try {
    	jsonResult = JSON.parse(resultString);
    } catch(e) {}

    if (jsonResult) {
      let result: any = {
        component: this.modalActionService.options.component,
      };

      switch (result.component) {
        case "wallet-send":
          result.wallet = jsonResult;
          result.index = this.modalActionService.options.index;
          break;
        case "contacts-create":
          result.contact = jsonResult;
          break;
      }

      this.qrScannerService.onScan.emit(result);
    	this.ngbActiveModal.close();
    }
  }

  close() {
    this.ngbActiveModal.close();
  }

  dismiss() {
    this.ngbActiveModal.dismiss();
  }

  ngOnDestroy() {
  }
}
