import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Laundry from "./pages/Laundry";
import Calendar from "./pages/Calendar";
import ForYou from "./pages/ForYou";
import Scan from "./pages/Scan";
import MyItems from "./pages/MyItems";
import PackingAssistant from "./pages/PackingAssistant";
import Explore from "./pages/Explore";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Combine from "./pages/Combine";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myitems"
          element={
            <ProtectedRoute>
              <MyItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/laundry"
          element={
            <ProtectedRoute>
              <Laundry />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/foryou"
          element={
            <ProtectedRoute>
              <ForYou />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/combine"
          element={
            <ProtectedRoute>
              <Combine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/packing"
          element={
            <ProtectedRoute>
              <PackingAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
