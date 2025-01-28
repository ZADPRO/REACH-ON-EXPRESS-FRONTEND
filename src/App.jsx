import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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

import "./App.css";

function App() {
  return (
    <Router>
      <ConditionalHeader>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mapping" element={<Key />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ConditionalHeader>
    </Router>
  );
}

function ConditionalHeader({ children }) {
  const location = useLocation();

  const excludedRoutes = ["/login"];
  const isExcluded = excludedRoutes.includes(location.pathname);

  return isExcluded ? children : <Header>{children}</Header>;
}

export default App;

ConditionalHeader.propTypes = {
  children: PropTypes.node,
};
