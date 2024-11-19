import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './routes/Router'


function App() {
  return (
    <div className="App flex">
    <BrowserRouter>
      <div className="flex-grow">
        <Router/>
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
