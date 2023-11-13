import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing page/LandingPage';
import CustomerSignUpPage from './Pages/Customer Sign Up Page/CustomerSignUpPage';
import CustomerLoginPage from './Pages/Customer Login Page/CustomerLoginPage';
import RestaurantSignUpPage from './Pages/Restaurant Sign Up Page/RestaurantSignUpPage';
import RestaurantLoginPage from './Pages/Restaurant Login Page/RestaurantLoginPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/customer/login" element={<CustomerLoginPage />} />
            <Route path="/customer/signup" element={<CustomerSignUpPage />} />
            <Route path="/restaurant/login" element={<RestaurantLoginPage />} />
            <Route path="/restaurant/signup" element={<RestaurantSignUpPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
