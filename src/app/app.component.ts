import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { GetExchangeRateService } from './get-exchange-rate.service';

// codes - customizable set of currency codes
import { codes, currObjType, roundCurrency } from './global-vars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private getExchangeRateService: GetExchangeRateService) {}

  title = 'currency-converter';
  currencyCodes = codes;

  currencyRatesRequests!: Observable<{}>;

  currencyArr: currObjType[] = [];
  headerRates: { [key: string]: number } = {};

  fillCurrencyData(): void {
    for (let code of this.currencyCodes) {
      this.currencyRatesRequests =
        this.getExchangeRateService.getCurrentExchangeRate(code);

      this.currencyRatesRequests.subscribe((data) => {
        this.currencyArr.push(data);
        if (this.currencyArr.length === this.currencyCodes.length)
          this.onCurrencyDataComplete();
      });
    }
  }

  getHeaderCurrencyData(dataArr: any): { USD: number; EUR: number } {
    const getUAHRates = (code: string) => {
      return this.currencyArr.find((currObj) => currObj.base_code === code)
        ?.conversion_rates?.['UAH'];
    };

    return {
      USD: roundCurrency(getUAHRates('USD')),
      EUR: roundCurrency(getUAHRates('EUR')),
      // USD: Number(getUAHRates('USD')?.toFixed(2)),
      // EUR: Number(getUAHRates('EUR')?.toFixed(2)),
    };
  }

  onCurrencyDataComplete(): void {
    this.headerRates = this.getHeaderCurrencyData(this.currencyArr);
  }

  ngOnInit(): void {
    this.fillCurrencyData();
    // console.dir(this.currencyArr);
  }
}
