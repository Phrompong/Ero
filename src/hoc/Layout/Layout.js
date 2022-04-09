import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DrawerToggle from "../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle";

import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Container = styled.div``;

const Drawer = styled.div`
  height: 56px;
`;

const Main = styled.main``;

const Layout = ({ children }) => {
  const [showSideDrawer, setSideDrawer] = useState(true);

  const location = useLocation();
  const path = location.pathname;

  const sidedrawer =
    path !== "/login" ? (
      <>
        {/* <Drawer onClick={() => setSideDrawer(true)}>
          <DrawerToggle />
        </Drawer> */}
        <DrawerToggle />
        <SideDrawer open={showSideDrawer} closed={() => setSideDrawer(false)} />
      </>
    ) : null;
  return (
    <>
      {sidedrawer} <Main>{children}</Main>
    </>
  );
};

export default Layout;
