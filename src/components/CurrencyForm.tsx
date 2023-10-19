import { FC } from 'react';

interface CurrencyFormProps {}

export const CurrencyForm: FC<CurrencyFormProps> = () => {
  return (
    <div>
      <input type="number" />
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
  );
};
