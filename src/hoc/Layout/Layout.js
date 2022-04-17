import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import DrawerToggle from "../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { ivory } from "../../utils/color";
const Container = styled.div`
  overflow: hidden;
`;

const Main = styled.main`
  position: relative;
  background-color: ${ivory};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${({ isLogin }) => (isLogin ? "280px" : 0)};
  overflow: hidden;

  @media screen and (max-width: 540px) {
    margin-left: 0;
  }

  @media screen and (min-width: 540px) and (max-width: 990px) {
    margin-left: 0;
  }
`;

const Layout = ({ children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const location = useLocation();
  const path = location.pathname;
  const isLogin = path !== "/login/admin" && path !== "/login/customer";
  const sidebar = isLogin ? (
    <>
      <Sidebar />
      <SideDrawer
        open={showSideDrawer}
        clicked={() => setShowSideDrawer(!showSideDrawer)}
      />
      <DrawerToggle clicked={() => setShowSideDrawer(true)} />
    </>
  ) : null;
  return (
    <Container>
      {!isLogin || sidebar}
      <Main isLogin={isLogin}>
        {/* <DrawerToggle clicked={showSideDrawer} /> */}
        {children}
        {/* <Card>{children}</Card> */}
      </Main>
    </Container>
  );
};

export default Layout;
