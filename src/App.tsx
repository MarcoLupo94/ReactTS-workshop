import { useState } from 'react';
import './App.css';
import { CurrencyForm } from './components/CurrencyForm';

export interface Currency {
  name: string;
  rate: number;
}

function App() {
  const [topCurrency, setTopCurrency] = useState<Currency>({ name: 'USD', rate: 0 });
  const [bottomCurrency, setBottomCurrency] = useState<Currency>({ name: 'USD', rate: 0 });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
      <CurrencyForm currency={topCurrency} setCurrency={setTopCurrency} />
      <CurrencyForm currency={bottomCurrency} setCurrency={setBottomCurrency} />
    </div>
  );
}

export default App;
