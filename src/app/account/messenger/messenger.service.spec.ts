// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { TestBed } from '@angular/core/testing';

import { MessengerService } from './messenger.service';

describe('MessengerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessengerService = TestBed.get(MessengerService);
    expect(service).toBeTruthy();
  });
});
