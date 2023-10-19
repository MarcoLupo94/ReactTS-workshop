/*
EXERCISE :
Here we have predefined currencies that we can use in our app.
Alternatively we could fetch all the available currencies from the API
https://freecurrencyapi.com/docs/currencies => READ DOCUMENTATION
 */

export const currencies: { [key: string]: string } = {
  EUR: 'Euro',
  USD: 'US Dollar',
  JPY: 'Japanese Yen',
  BGN: 'Bulgarian Lev',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HUF: 'Hungarian Forint',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  SEK: 'Swedish Krona',
  CHF: 'Swiss Franc',
  ISK: 'Icelandic Króna',
  NOK: 'Norwegian Krone',
  HRK: 'Croatian Kuna',
  RUB: 'Russian Ruble',
  TRY: 'Turkish Lira',
  AUD: 'Australian Dollar',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CNY: 'Chinese Yuan',
  HKD: 'Hong Kong Dollar',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  ZAR: 'South African Rand'
};
export const availableCurrencies = Object.keys(currencies);
