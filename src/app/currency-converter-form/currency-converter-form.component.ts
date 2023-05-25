import { Component, Input, AfterViewChecked } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { codes, currObjType, roundCurrency } from '../global-vars';

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
})
export class CurrencyConverterFormComponent implements AfterViewChecked {
  @Input() currencyArr: currObjType[] = [];

  currencyCodes = codes;

  selectedFrom = 'UAH';
  selectedTo = 'USD';

  convertionRate!: number;

  valueFrom!: number;
  valueTo!: number;

  ngAfterViewChecked() {
    if (!this.convertionRate) {
      this.setCovertionRate();
    }
  }

  recalculateFrom() {
    this.setCovertionRate();
    this.calcExchangeFrom();
  }
  recalculateTo() {
    this.setCovertionRate();
    this.calcExchangeTo();
  }

  returnConvertionRate(): number {
    const rateNum: number | undefined = this.currencyArr.find(
      (item) => item.base_code === this.selectedFrom
    )?.conversion_rates?.[this.selectedTo];
    return Number(rateNum);
  }

  setCovertionRate() {
    this.convertionRate = this.returnConvertionRate();
  }

  calcExchangeFrom() {
    this.valueFrom = Number(this.convertionRate)
      ? roundCurrency(this.valueTo / this.convertionRate)
      : 1;
  }

  calcExchangeTo() {
    this.valueTo = Number(this.convertionRate)
      ? roundCurrency(this.valueFrom * this.convertionRate)
      : 1;
  }
}
