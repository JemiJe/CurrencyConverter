import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { currencyAPIUrl } from './global-vars';

@Injectable({
  providedIn: 'root',
})
export class GetExchangeRateService {
  constructor(private http: HttpClient) {}

  getUrl(baseUrl: string, currencyCode: string) {
    return baseUrl + currencyCode;
  }

  getCurrentExchangeRate(currencyCode: string) {
    return this.http.get<{}>(this.getUrl(currencyAPIUrl, currencyCode), {
      responseType: 'json',
    });
  }
}
