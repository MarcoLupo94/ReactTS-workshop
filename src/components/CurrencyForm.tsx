import { FC } from 'react';
import { Currency } from '../App';
import { availableCurrencies } from '../utils/currencies';

interface CurrencyFormProps {
  currency: Currency;
  currency2: Currency;
  setCurrency: (currency: Currency) => void;
  setCurrency2: (currency: Currency) => void;
  fetchCurrencyRate: (
    currency1: Currency,
    currency2: Currency,
    setCurrency2: (currency: Currency) => void
  ) => void;
}

export const CurrencyForm: FC<CurrencyFormProps> = ({
  currency,
  currency2,
  setCurrency,
  setCurrency2,
  fetchCurrencyRate
}) => {
  const handleNameChange = (event: { target: { value: string } }) => {
    setCurrency({ ...currency, name: event.target.value });
    fetchCurrencyRate({ ...currency, name: event.target.value }, currency2, setCurrency2);
  };

  const handleRateChange = (event: { target: { value: string } }) => {
    setCurrency({ ...currency, rate: parseFloat(event.target.value) });
    fetchCurrencyRate(
      { ...currency, rate: parseFloat(event.target.value) },
      currency2,
      setCurrency2
    );
  };

  return (
    <div>
      <input
        step="0.01"
        style={{ height: '50px', width: '200px', fontSize: '20px' }}
        type="number"
        value={currency.rate}
        onChange={handleRateChange}
      />
      <select
        style={{ height: '50px', width: '100px', fontSize: '16px' }}
        value={currency.name}
        onChange={handleNameChange}>
        {availableCurrencies.map((currency) => (
          <option value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
};
