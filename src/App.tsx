import { useState } from 'react';
import './App.css';
import { CurrencyForm } from './components/CurrencyForm';
import { currencies } from './utils/currencies';

// Define the type of the currency object
export interface Currency {
  name: string;
  rate: number;
}

// Retrieve the API URL and API KEY from the .env file
const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [topCurrency, setTopCurrency] = useState<Currency>({ name: 'USD', rate: 0 });
  const [bottomCurrency, setBottomCurrency] = useState<Currency>({ name: 'USD', rate: 0 });

  /*
  This will only work if the top currency changes
  HERE WE're USING then() TO HANDLE THE RESPONSE FROM THE API instead of async/await, since we cannot use async/await in useEffect
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
          rate: Number((response.data[bottomCurrency.name] * topCurrency.rate).toFixed(2))
        });
      });
    // WHAT HAPPENS IF THERE IS AN ERROR?
    // CAN WE HANDLE IT?
  }, [topCurrency])
  */

  //IF WE WANT TO HANDLE BOTH CURRENCIES CHANGING, WE CAN USE THIS:
  async function fetchCurrencyRate(
    fromCurrency: Currency, //Currency we want to convert from
    toCurrency: Currency, // Currency we want to convert to
    setToCurrency: (currency: Currency) => void // Function to set the currency we want to convert to
  ) {
    try {
      if (!fromCurrency.rate) return setToCurrency({ ...toCurrency, rate: 0 });
      // Simple GET request using fetch
      const response = await fetch(
        `${BASE_URL}?base_currency=${fromCurrency.name}&apikey=${API_KEY}&currencies=${toCurrency.name}`
      );
      // Unwrap the response from the API from JSON
      const { data } = await response.json();

      //Set value of the currency we want to convert to
      setToCurrency({
        ...toCurrency,

        /* Here we want to approximate the rate to 2 decimal places and then convert it to a number
        because the toFixed() returns a string */
        rate: Number((data[toCurrency.name] * fromCurrency.rate).toFixed(2))
      });
    } catch (e) {
      /* If an error occurs, we want to catch it and display it in the console */
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
