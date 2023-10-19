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
    setCurrency({ ...currency, rate: parseFloat(event.target.value) });
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
