import { FC } from 'react';
import { Currency } from '../App';
import { availableCurrencies } from '../utils/currencies';

interface CurrencyFormProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const CurrencyForm: FC<CurrencyFormProps> = ({ currency, setCurrency }) => {
  const handleNameChange = (event: { target: { value: string } }) => {
    setCurrency({ ...currency, name: event.target.value });
  };

  const handleRateChange = (event: { target: { value: string } }) => {
    setCurrency({ ...currency, rate: parseInt(event.target.value) });
  };

  return (
    <div>
      <input type="number" value={currency.rate} onChange={handleRateChange} />
      <select value={currency.name} onChange={handleNameChange}>
        {availableCurrencies.map((currency) => (
          <option value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
};
