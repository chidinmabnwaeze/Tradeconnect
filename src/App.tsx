import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/register";
import Login from "./components/login";
import VerifyEmail from "./Admin/verifyEmail";
import VerifyOtp from "./Admin/VerifyOtp";
import Dashboard from "./Admin/Dashboard";
import Users from "./Admin/Users.farmers";
import Buyers from "./Admin/Users.buyers";
import Listings from "./Admin/Listings";
import Orders from "./Admin/Orders";
import Disputes from "./Admin/Disputes";
import AddListing from "./Admin/AddListing";
import FarmerProfile from "./Admin/FarmerProfile";
import { Marketplace } from "./Buyers/MarketPlace";
import LandingPage from "./components/LandingPage";
import { CartProvider } from "./Buyers/CartContext";
import BuyerOrders from "./Buyers/Orders";
import BuyerDisputes from "./Buyers/Disputes";
import BuyerSettings from "./Buyers/Settings";
import Checkout from "./Buyers/Checkout";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" index element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/disputes" element={<Disputes />} />
          <Route path="/users/:id" element={<FarmerProfile />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/orders" element={<BuyerOrders />} />
          <Route path="/marketplace/disputes" element={<BuyerDisputes />} />
          <Route path="/marketplace/settings" element={<BuyerSettings />} />
          <Route path="/marketplace/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
