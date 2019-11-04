// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.
import { Injectable } from '@angular/core';
import { transform, isEqual, isObject } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DeepDiffMapperService {
  difference(object, base) {
    return transform(object, (result, value, key) => {
      if (base && !isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? this.difference(value, base[key]) : value;
      }
    });
  }
}
