import { useEffect, useState } from 'react';
import './App.css';
import { CurrencyForm } from './components/CurrencyForm';

export interface Currency {
  name: string;
  rate: number;
}

const { BASE_URL } = import.meta.env.VITE_BASE_URL;
const { API_KEY } = import.meta.env.VITE_API_KEY;

function App() {
  const [topCurrency, setTopCurrency] = useState<Currency>({ name: 'USD', rate: 0 });
  const [bottomCurrency, setBottomCurrency] = useState<Currency>({ name: 'USD', rate: 0 });

  useEffect(() => {
    fetch(`${BASE_URL}latest?base=${topCurrency.name}&access_key=${API_KEY}`);
  }, [topCurrency]);

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
