// constants
// customizable set of currency codes
export const codes: Array<string> = ['UAH', 'EUR', 'USD', 'GBP', 'JPY'];
export const currencyAPIUrl: string =
  'https://v6.exchangerate-api.com/v6/b1900a8e295d6f76a9780982/latest/';

export type currObjType = {
  base_code?: string;
  conversion_rates?: {
    [propKey: string]: number;
  };
};

// funcs
export const roundCurrency = (value: number | undefined): number => {
  return Number(Number(value).toFixed(2));
};
