// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { TestBed, inject } from '@angular/core/testing';

import { ModalActionService } from './modal-action.service';

describe('ModalActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalActionService]
    });
  });

  it('should be created', inject([ModalActionService], (service: ModalActionService) => {
    expect(service).toBeTruthy();
  }));
});
