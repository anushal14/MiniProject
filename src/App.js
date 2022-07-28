import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import ShopLogin from './Pages/Login/ShopLogin';
import CardLogin from './Pages/Login/CardLogin';
import Shop from './Pages/SignUp/Shop';
import Card from './Pages/SignUp/Card';
import Admin from './Pages/SignUp/Admin';
import ShopTable from './Pages/ShopTable';
import CardTable from './Pages/CardTable';
import ProductTable from './Pages/ProductTable';
import StockTable from './Pages/StockTable';
import QuotaTable from './Pages/QuotaTable';
import ShopDashboard from './Pages/Shop/ShopDashboard';
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
          <Route exact path="/ShopTable" element={<ShopTable />} />
          <Route exact path="/CardTable" element={<CardTable />} />
          <Route exact path="/ProductTable" element={<ProductTable />} />
          <Route exact path="/StockTable" element={<StockTable />} />
          <Route exact path="/QuotaTable" element={<QuotaTable />} />
          <Route exact path="/ShopDashboard" element={<ShopDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
