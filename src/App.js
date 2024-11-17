import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './routes/Router'
import Login from './components/Login & Forgot Password/Login'

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
