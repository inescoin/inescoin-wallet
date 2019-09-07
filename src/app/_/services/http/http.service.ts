// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable } from '@angular/core';
import { Http, Headers, Response  } from '@angular/http';
import { HttpClient  } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { inescoinConfig } from '../../../config/inescoin.config';

let InesConfig = {
  base: 'http://68.183.195.6:8087/',
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  base: string = inescoinConfig.remoteAddres;

  private _hasHeaders: boolean = false;
  public headers: Headers;

  constructor (private http: HttpClient) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  get(path) {
    return this.http.get(this.base + path);
  }

  post(path, data) {
    return this.http.post(this.base + path, data);
  }

  extractData(res: Response) {
    return res || {};
  }

  handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private _checkLastConnexion() {
  }

  private _getNoCacheHeaders() {
    let headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Cache-Control', 'no-cache');
    headers.append('Content-Type', 'application/json');

    return headers;
  }
}
