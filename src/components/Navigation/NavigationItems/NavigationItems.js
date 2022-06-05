import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "styled-components";

import traffic from "../../../assets/icon_traffic.png";
import account from "../../../assets/icon_account.png";
import profile from "../../../assets/icon_profile.png";
import Vector from "../../../assets/vector.png";
import Logout from "../../../assets/logout.png";
import Notfound from "../../../assets/notfound.png";

import { Logo } from "../../Logo/Logo";
import { balihai, ivory } from "../../../utils/color";
import logo from "../../../assets/logo_awsc.jpg";

import { useSelector } from "react-redux";

const Items = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-top: 20px;
`;

const Footer = styled.div`
  /* width: 100%; */
  width: 90%;
  color: ${balihai};
  margin-bottom: 3rem;

  .img {
    display: flex;
    align-items: flex-end;

    img {
      width: 131px;
      height: 56px;
    }
  }
  .year {
    margin-bottom: 5px;
    font-family: "Arial";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #1234b0;
  }

  .text {
    font-family: "Segoe UI";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    margin-left: 10px;
  }
`;

const Nav = styled.nav`
  padding-top: 2rem;
  position: relative;
`;

const NavigationItems = () => {
  const { user } = useSelector((state) => state);
  return (
    <>
      <Nav>
        <Logo small />

        <Items>
          {(() => {
            if (user.role === "admin") {
              return (
                <>
                  <NavigationItem link="/dashboard" exact="true" img={traffic}>
                    แดชบอร์ด / Dashboard
                  </NavigationItem>
                  <NavigationItem link="/import" img={account}>
                    นำเข้าข้อมูล / Import data
                  </NavigationItem>
                  <NavigationItem link="/checkRightAdmin" img={Vector}>
                    ตรวจสอบสิทธิ / Check rights
                  </NavigationItem>
                  <NavigationItem link="/admin" exact="true" img={Logout}>
                    ออกจากระบบ / Log out
                  </NavigationItem>
                </>
              );
            } else if (user.role === "client") {
              return (
                <>
                  <NavigationItem link="/profile" img={profile}>
                    ข้อมูลของฉัน / Profile
                  </NavigationItem>
                  <NavigationItem link="/checkRightCustomer" img={Vector}>
                    ตรวจสอบสิทธิ / Check rights
                  </NavigationItem>
                  <NavigationItem link="/buy" img={traffic}>
                    จองซื้อ / Book
                  </NavigationItem>
                  <NavigationItem link="/" exact="true" img={Logout}>
                    ออกจากระบบ / Log out
                  </NavigationItem>
                </>
              );
            }
          })()}
        </Items>
      </Nav>
      <Footer>
        <div className="img">
          <img src={logo} />
          <p className="year">© 2022 </p>
        </div>
        <p className="text">
          สงวนสิทธิในการใช้งาน <br />
          เป็นไปตามเงื่อนไขที่บริษัทกำหนด
        </p>
      </Footer>
    </>
  );
};

export default NavigationItems;
