import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import DrawerToggle from "../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { ivory } from "../../utils/color";
import { useSelector } from "react-redux";
import Notfound from "../../assets/notfound.png";
import UnAuth from "../../assets/unAuth.png";
import Cookies from "js-cookie";

const Container = styled.div`
  overflow: hidden;
`;

const Main = styled.main`
  position: relative;
  background-color: ${ivory};
  // height: 100vh;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${({ isLogin }) => (isLogin ? "280px" : 0)};
  overflow: hidden;

  @media screen and (max-width: 540px) {
    margin-left: 0;
  }

  @media screen and (min-width: 541px) and (max-width: 990px) {
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
    "/admin/service",
  ];

  const pagesCustomer = [
    "/login/customer",
    "/buy",
    "/checkRightCustomer",
    "/checkRightCustomer/info",
    "/profile",
    "/customer/service",
  ];

  const pagesAll = pagesAdmin.concat(pagesCustomer);
  const location = useLocation();
  const path = location.pathname;

  const isPage = pagesAll.includes(path);

  const isLogin =
    path !== "/login/admin" &&
    path !== "/login/customer" &&
    path !== "/customer/service" &&
    path !== "/admin/service";

  console.log(user);

  // * Case path is not pages allow
  if (!isPage) {
    return (
      <>
        <DisplayNotfound></DisplayNotfound>
      </>
    );
  }

  // * Case normally login
  if (
    (path === "/login/admin" ||
      path === "/login/customer" ||
      path === "/customer/service" ||
      path === "/admin/service") &&
    (!user || user.length === 0)
  ) {
    return <>{children}</>;
  }

  // * Case no authentication
  if (isPage && user.length === 0) {
    return (
      <>
        <DisplayUnAuth></DisplayUnAuth>
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
              <DisplayUnAuth></DisplayUnAuth>
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
              <DisplayUnAuth></DisplayUnAuth>
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

const DisplayNotfound = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 600px;
  min-height: 740px;
  background-image: url(${Notfound});
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 510px;
    height: 740px;
  }
`;

const DisplayUnAuth = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 600px;
  min-height: 740px;
  background-image: url(${UnAuth});
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 510px;
    height: 740px;
  }
`;

export default Layout;
