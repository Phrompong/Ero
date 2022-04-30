import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import DrawerToggle from "../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { ivory } from "../../utils/color";
import { useSelector } from "react-redux";

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
  const { user } = useSelector((state) => state);

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const pagesAdmin = [
    "/login/admin",
    "/dashboard",
    "/checkRightAdmin",
    "/import",
  ];

  const pagesCustomer = [
    "/login/customer",
    "/buy",
    "/checkRightCustomer",
    "/profile",
  ];

  const pagesAll = pagesAdmin.concat(pagesCustomer);
  const location = useLocation();
  const path = location.pathname;

  const isPage = pagesAll.includes(path);

  const isLogin = path !== "/login/admin" && path !== "/login/customer";

  // * Case path is not pages allow
  if (!isPage) {
    return (
      <>
        <h1>Notfound</h1>
      </>
    );
  }

  // * Case normally login
  if (
    (path === "/login/admin" || path === "/login/customer") &&
    (!user || user.length === 0)
  ) {
    return <>{children}</>;
  }

  // * Case no authentication
  if (isPage && user.length === 0) {
    return (
      <>
        <h1>Please login</h1>
      </>
    );
  }

  // * Case path allow and authentication
  if (isPage && (user || user.length > 0)) {
    const { role } = user;

    let isPageAllow = false;
    switch (role) {
      case "admin":
        pagesAdmin.push("/login/customer");
        isPageAllow =
          pagesAdmin.filter((o) => o.includes(path)).length > 0 ? true : false;

        if (!isPageAllow) {
          return (
            <>
              <h1>Please login for customer</h1>
            </>
          );
        }

        break;
      case "client":
        pagesCustomer.push("/login/admin");
        isPageAllow =
          pagesCustomer.filter((o) => o.includes(path)).length > 0
            ? true
            : false;

        if (!isPageAllow) {
          return (
            <>
              <h1>Please login for admin</h1>
            </>
          );
        }
        break;
    }

    const sidebar = (
      <>
        <Sidebar />
        <SideDrawer
          open={showSideDrawer}
          clicked={() => setShowSideDrawer(!showSideDrawer)}
        />
        <DrawerToggle clicked={() => setShowSideDrawer(true)} />
      </>
    );

    return (
      <Container>
        {sidebar}
        <Main isLogin={isLogin}>{children}</Main>
      </Container>
    );
  }
};

export default Layout;
