// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Pipe, PipeTransform } from '@angular/core';

import { inescoinConfig } from '../../config/inescoin.config';

@Pipe({
  name: 'cryptoConverter'
})
export class CryptoConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Number.parseFloat(value / inescoinConfig.icoPrice).toFixed(2) + ' ' + inescoinConfig.symbol;
  }
}
