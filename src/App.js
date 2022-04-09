import { Routes, Route, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth";
import Dashboard from "./containers/Dashboard";
import ImportData from "./containers/ImportData";

import "./App.css";

const App = (props) => {
  const routes = (
    <Routes>
      <Route path="/login" element={<Auth {...props} />} />
      <Route path="/import" element={<ImportData {...props} />} />
      <Route path="/" exact element={<Dashboard />} />
    </Routes>
  );

  return <Layout>{routes}</Layout>;
};

export default App;
