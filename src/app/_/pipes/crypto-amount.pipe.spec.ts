// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { CryptoAmountPipe } from './crypto-amount.pipe';

describe('CryptoAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new CryptoAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
