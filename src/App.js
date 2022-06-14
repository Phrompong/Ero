import { Routes, Route, useHistory, useLocation } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import ProfileView from "./containers/profile";
import ImportData from "./containers/ImportData";
import Buy from "./containers/Buy";
import CheckRightAdmin from "./containers/CheckRights/Admin";
import CheckRightCustomer from "./containers/CheckRights/Customer";
import CustomerServiceAdmin from "./containers/CustomerService/Admin";
import CustomerService from "./containers/CustomerService/Customer";
//import CustomerService from "./containers/customerService/Customer";
import CheckRightInfo from "./containers/CheckRights/CheckRightInfo";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import "./App.css";

const App = (props) => {
  const routes = (
    <Routes>
      <Route path="/admin" element={<Auth {...props} />} />
      <Route path="/import" element={<ImportData {...props} />} />
      <Route
        path="/admin/service"
        element={<CustomerServiceAdmin {...props} />}
      />
      <Route
        path="/customer/service"
        element={<CustomerService {...props} />}
      />
      <Route path="/checkRightAdmin" element={<CheckRightAdmin {...props} />} />

      <Route path="" element={<Login {...props} />} />
      {/* <Route path="/buy" element={<Buy {...props} />} /> */}
      <Route path="/editBuy" element={<Buy {...props} />} />
      <Route
        path="/checkRightCustomer"
        element={<CheckRightCustomer {...props} />}
      />
      <Route
        path="/checkRightCustomer/info"
        element={<CheckRightInfo {...props} />}
      />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/profile" element={<ProfileView />} />
    </Routes>
  );

  return <Layout>{routes}</Layout>;
};

export default App;
