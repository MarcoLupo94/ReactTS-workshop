import './App.css';
import { CurrencyForm } from './components/CurrencyForm';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
      <CurrencyForm />
      <CurrencyForm />
    </div>
  );
}

export default App;
