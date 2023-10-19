import { useState } from 'react';
import './App.css';
import { CurrencyForm } from './components/CurrencyForm';
import { currencies } from './utils/currencies';

export interface Currency {
  name: string;
  rate: number;
}

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [topCurrency, setTopCurrency] = useState<Currency>({ name: 'USD', rate: 0 });
  const [bottomCurrency, setBottomCurrency] = useState<Currency>({ name: 'USD', rate: 0 });

  // This will only work if the top currency changes
  // useEffect(() => {
  //   // Don't make a request if the rate is 0
  //   if (!topCurrency.rate) return setBottomCurrency({ ...bottomCurrency, rate: 0.0 });
  //   // Simple GET request using fetch
  //   fetch(
  //     `${BASE_URL}?base_currency=${topCurrency.name}&apikey=${API_KEY}&currencies=${bottomCurrency.name}`
  //   )
  //     // Unwrap the response from the API from JSON
  //     .then((response) => response.json())
  //     //Extract the rate from the response
  //     .then((response) => {
  //       setBottomCurrency({
  //         ...bottomCurrency,
  //         rate: Number((response.data[bottomCurrency.name] * topCurrency.rate).toFixed(2))
  //       });
  //     });
  //   // WHAT HAPPENS IF THERE IS AN ERROR?
  //   // CAN WE HANDLE IT?
  // }, [topCurrency]);

  //DO WE ALSO WANT TO HANDLE WHEN THE BOTTOM CURRENCY CHANGES?
  async function fetchCurrencyRate(
    currency1: Currency,
    currency2: Currency,
    setCurrency2: (currency: Currency) => void
  ) {
    try {
      if (!currency1.rate) return setCurrency2({ ...currency2, rate: 0 });
      // Simple GET request using fetch
      const response = await fetch(
        `${BASE_URL}?base_currency=${currency1.name}&apikey=${API_KEY}&currencies=${currency2.name}`
      );
      // Unwrap the response from the API from JSON
      const { data } = await response.json();

      setCurrency2({
        ...currency2,
        rate: Number((data[currency2.name] * currency1.rate).toFixed(2))
      });
    } catch (e) {
      console.error(e);
    }
  }

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
          {topCurrency.rate} {currencies[topCurrency.name]} equals
        </p>
        <h1 style={{ marginTop: 0, textAlign: 'left' }}>
          {bottomCurrency.rate}{' '}
          <span style={{ fontSize: '20px' }}>{currencies[bottomCurrency.name]}</span>
        </h1>
      </div>
      <CurrencyForm
        currency={topCurrency}
        currency2={bottomCurrency}
        setCurrency={setTopCurrency}
        setCurrency2={setBottomCurrency}
        fetchCurrencyRate={fetchCurrencyRate}
      />
      <CurrencyForm
        currency={bottomCurrency}
        currency2={topCurrency}
        setCurrency={setBottomCurrency}
        setCurrency2={setTopCurrency}
        fetchCurrencyRate={fetchCurrencyRate}
      />
    </div>
  );
}

export default App;
