import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DrawerToggle from "../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle";

import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";

import { white, ivory } from "../../utils/color";

const Container = styled.div`
  /* width: 100vw;
  height: 100vh; */
`;

const Drawer = styled.div`
  height: 56px;
`;

const Main = styled.main`
  background-color: ${ivory};
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 280px; */
  margin-left: ${({ isLogin }) => (isLogin ? "280px" : 0)};

  @media (max-width: 999px) {
    margin-left: 0;
  }
`;

const Layout = ({ children }) => {
  const [showSideDrawer, setSideDrawer] = useState(true);

  const location = useLocation();
  const path = location.pathname;
  const isLogin = path !== "/login/admin" && path !== "/login/customer";
  const sidebar = isLogin ? (
    <>
      <Sidebar />
      <SideDrawer />
    </>
  ) : null;
  return (
    <>
      {sidebar}
      <Main isLogin={isLogin}>
        {children}
        {/* <Card>{children}</Card> */}
      </Main>
    </>
  );
};

export default Layout;
