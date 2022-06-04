import Headbar from "./components/Headbar/Headbar";
import CurrencyTable from "./components/CurrencyTable/CurrencyTable";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import './App.scss';

function App() {
  return (
    <div className="app">
        <Headbar />
        <CurrencyTable/>
        <CurrencyConverter/>
    </div>
  );
}

export default App;
