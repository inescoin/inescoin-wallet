// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { TestBed, inject } from '@angular/core/testing';

import { QrScannerService } from './qr-scanner.service';

describe('QpScannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QrScannerService]
    });
  });

  it('should be created', inject([QrScannerService], (service: QrScannerService) => {
    expect(service).toBeTruthy();
  }));
});
