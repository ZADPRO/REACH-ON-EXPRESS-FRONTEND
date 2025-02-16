import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";

import Header from "./components/01-Header/Header";
import Dashboard from "./components/02-Dashboard/Dashboard";
import Key from "./components/03-Key/Key";
import Employees from "./components/04-Employees/Employees";
import Tracking from "./components/05-Tracking/Tracking";
import Settings from "./components/06-Settings/Settings";
import Profile from "./components/07-Profile/Profile";
import Login from "./components/08-Login/Login";
import Booking from "./components/09-Booking/Booking";
import Report from "./components/10-Report/Report";
import TestingPDF from "./components/11-TestingPDF/TestingPDF";
import ReportPDF from "./components/12-ReportPDF/ReportPDF";

import "./App.css";

function PrivateRoute({ children }) {
  const userDetails = localStorage.getItem("userDetails");
  return userDetails ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <ConditionalHeader>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/testingPDF" element={<TestingPDF />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/mapping"
            element={
              <PrivateRoute>
                <Key />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
          <Route
            path="/tracking"
            element={
              <PrivateRoute>
                <Tracking />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/reportPDF"
            element={
              <PrivateRoute>
                <ReportPDF />
              </PrivateRoute>
            }
          />
        </Routes>
      </ConditionalHeader>
    </Router>
  );
}

function ConditionalHeader({ children }) {
  const location = useLocation();
  const excludedRoutes = ["/login", "/testingPDF"];
  const isExcluded = excludedRoutes.includes(location.pathname);

  return isExcluded ? children : <Header>{children}</Header>;
}

export default App;

ConditionalHeader.propTypes = {
  children: PropTypes.node,
};
