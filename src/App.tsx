import { useEffect, useState } from 'react';
import './App.css';
import { CurrencyForm } from './components/CurrencyForm';

export interface Currency {
  name: string;
  rate: number;
}

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [topCurrency, setTopCurrency] = useState<Currency>({ name: 'USD', rate: 0.0 });
  const [bottomCurrency, setBottomCurrency] = useState<Currency>({ name: 'USD', rate: 0.0 });

  useEffect(() => {
    // Don't make a request if the rate is 0
    if (!topCurrency.rate) return setBottomCurrency({ ...bottomCurrency, rate: 0.0 });
    // Simple GET request using fetch
    fetch(
      `${BASE_URL}?base_currency=${topCurrency.name}&apikey=${API_KEY}&currencies=${bottomCurrency.name}`
    )
      // Unwrap the response from the API from JSON
      .then((response) => response.json())
      //Extract the rate from the response
      .then((response) => {
        setBottomCurrency({
          ...bottomCurrency,
          rate: (response.data[bottomCurrency.name] * topCurrency.rate).toFixed(2)
        });
      });
    // WHAT HAPPENS IF THERE IS AN ERROR?
    // CAN WE HANDLE IT?
  }, [topCurrency]);

  //DO WE ALSO WANT TO HANDLE WHEN THE BOTTOM CURRENCY CHANGES?

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        height: '100vh',
        justifyContent: 'center'
      }}>
      <div>
        <p style={{ textAlign: 'left' }}>
          {topCurrency.rate} {topCurrency.name} equals
        </p>
        <h1 style={{ marginTop: 0, textAlign: 'left' }}>
          {bottomCurrency.rate} <span style={{ fontSize: '20px' }}>{bottomCurrency.name}</span>
        </h1>
      </div>
      <CurrencyForm currency={topCurrency} setCurrency={setTopCurrency} />
      <CurrencyForm currency={bottomCurrency} setCurrency={setBottomCurrency} />
    </div>
  );
}

export default App;
