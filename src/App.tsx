import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Star } from "lucide-react";
import Register from "./pages/register";
import Login from "./pages/login";
import VerifyEmail from "./pages/verifyEmail";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          index
          element={
            <div className="flex flex-col items-center justify-center h-screen w-screen">
              <Star className="text-primary w-screen h-100" />
              <h1 className="text-2xl font-bold text-primary">
                Welcome to Trade Connect
              </h1>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
