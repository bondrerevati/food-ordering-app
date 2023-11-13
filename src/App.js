import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing page/LandingPage';
import CustomerLoginPage from './Pages/CustomerLoginPage/CustomerLoginPage';
import CustomerSignUpPage from './Pages/CustomerSignUpPage/CustomerSignUpPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/customer/login" element={<CustomerLoginPage />} />
            <Route path="/customer/signup" element={<CustomerSignUpPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
