import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import ShopLogin from './Pages/Login/ShopLogin';
import CardLogin from './Pages/Login/CardLogin';
import Shop from './Pages/SignUp/Shop';
import Card from './Pages/SignUp/Card';
import Admin from './Pages/SignUp/Admin';
import Dashboard from './Pages/Dashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ShopLogin />} />
          <Route exact path="/CardLogin" element={<CardLogin />} />
          <Route exact path="/signupShop" element={<Shop />} />
          <Route exact path="/signUpCard" element={<Card />} />
          <Route exact path="/signUpAdmin" element={<Admin />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
