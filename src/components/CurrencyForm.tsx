import { FC } from 'react';
import { Currency } from '../App';

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
      <input type="number" onChange={handleRateChange} />
      <select onChange={handleNameChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
  );
};
