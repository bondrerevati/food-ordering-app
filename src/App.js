import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/Landing page/LandingPage";
import CustomerSignUpPage from "./Pages/Customer Sign Up Page/CustomerSignUpPage";
import CustomerLoginPage from "./Pages/Customer Login Page/CustomerLoginPage";
import RestaurantSignUpPage from "./Pages/Restaurant Sign Up Page/RestaurantSignUpPage";
import RestaurantLoginPage from "./Pages/Restaurant Login Page/RestaurantLoginPage";
import AddEditFoodItem from "./Pages/Add Edit Food Item/AddEditFoodItem";
import RestaurantHomePage from "./Pages/Restaurant Home Page/RestaurantHomePage";
import RestaurantProtectedLayout from "./Components/Restaurant Protected Layout/RestaurantProtectedLayout";
import Orders from "./Pages/Orders/Orders";
import RestaurantSettings from "./Pages/Restaurant Settings/RestaurantSettings";
import CustomerProtectedLayout from "./Components/Customer Protected Layout/CustomerProtectedLayout";
import CustomerHomePage from "./Pages/Customer Home Page/CustomerHomePage";
import CustomerSettings from "./Pages/Customer Settings/CustomerSettings";
import RestaurantList from "./Components/Restaurant List/RestaurantList";
import Cart from "./Components/Cart/Cart";
import ItemsList from "./Components/Items List/ItemsList";
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
          <Route path="/restaurant" element={<RestaurantProtectedLayout />}>
            <Route
              path="/restaurant/home"
              element={<RestaurantHomePage />}
            ></Route>
            <Route
              path="/restaurant/addfooditem"
              element={<AddEditFoodItem />}
            ></Route>
            <Route
              path="/restaurant/editfooditem"
              element={<AddEditFoodItem />}
            ></Route>
            <Route path="/restaurant/orders" element={<Orders />}></Route>
            <Route
              path="/restaurant/settings"
              element={<RestaurantSettings />}
            ></Route>
          </Route>
          <Route path="/customer" element={<CustomerProtectedLayout />}>
            <Route path="/customer/home" element={<CustomerHomePage />}></Route>
            <Route
              path="/customer/restaurant"
              element={<RestaurantList />}
            >
            </Route>
            <Route
              path="/customer/restaurant/itemslist"
              element={<ItemsList />}
            ></Route>
            <Route path="/customer/cart" element={<Cart />}></Route>
            <Route
              path="/customer/settings"
              element={<CustomerSettings />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
