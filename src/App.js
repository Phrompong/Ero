import { Routes, Route, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import ProfileView from "./containers/profile";
import ImportData from "./containers/ImportData";
import Buy from "./containers/Buy";

import "./App.css";

const App = (props) => {
  const routes = (
    <Routes>
      <Route path="/login/admin" element={<Auth {...props} />} />
      <Route path="/login/customer" element={<Login {...props} />} />
      <Route path="/import" element={<ImportData {...props} />} />
      <Route path="/buy" element={<Buy {...props} />} />
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/profile" exact element={<ProfileView />} />
    </Routes>
  );

  return <Layout>{routes}</Layout>;
};

export default App;
