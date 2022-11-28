import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "styled-components";

import traffic from "../../../assets/icon_traffic.png";
import account from "../../../assets/icon_account.png";
import profile from "../../../assets/icon_profile.png";
import Vector from "../../../assets/vector.png";
import Logout from "../../../assets/logout.png";
import Notfound from "../../../assets/notfound.png";
import { useLocation } from "react-router-dom";

import { Logo } from "../../Logo/Logo";
import mapAsiaWealth from "../../../assets/mapAsiaWealth.png";
import { balihai, ivory } from "../../../utils/color";
import logo from "../../../assets/logo_awsc.jpg";

import { useSelector } from "react-redux";

const Items = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-top: 2px;
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
  const search = useLocation().search;
  const event = new URLSearchParams(search).get("event");
  const path = window.location.pathname;
  console.log(user.role);
  console.log(path);
  console.log(event);

  return (
    <>
      <Nav>
        <Logo small />
        <Items>
          {(() => {
            if (
              (user.role === "admin" &&
                path !== "/profile" &&
                path !== "/checkRightCustomer" &&
                path !== "/buy") ||
              event === "change" ||
              event === "add"
            ) {
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
            } else {
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
        <p className="text" style={{ color: "#1D3AB1", fontSize: "11px" }}>
          ติดต่อเรา บริษัทหลักทรัพย์ เอเชีย เวลท์ จำกัด
        </p>
        <p className="text" style={{ fontSize: "10px", fontWeight: "bold" }}>
          สำนักงานใหญ่ (อาคารเมอร์คิวรี่ทาวเวอร์)
        </p>
        <p className="text" style={{ fontSize: "10px" }}>
          เลขที่ 540 อาคารเมอร์คิวรี่ ทาวเวอร์ ชั้น 14
        </p>
        <p className="text" style={{ fontSize: "10px" }}>
          ห้อง 1401-1402 ถนนเพลินจิต
        </p>
        <p className="text" style={{ fontSize: "10px" }}>
          แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330
        </p>
        <p className="text" style={{ fontSize: "10px" }}>
          โทรศัพท์ : 02-680-5000
        </p>
        <p className="text" style={{ fontSize: "10px" }}>
          โทรสาร : 02-680-5111
        </p>
        <p className="text" style={{ fontSize: "10px", fontWeight: "bold" }}>
          Customer Service : 02-680-5033-5
        </p>
        <p className="text" style={{ fontSize: "10px" }}>
          (วันทำการ จ-ศ เวลา 08:30 - 17:00 น.)
        </p>
        <p className="text" style={{ fontSize: "10px" }}>
          cs@asiawealth.co.th
        </p>
        <div className="img">
          <img src={mapAsiaWealth} />
        </div>
        <div className="img">
          <img src={logo} width="10px" />
          <p className="year">© 2022 </p>
        </div>
        <p className="text" style={{ fontSize: "10px" }}>
          สงวนสิทธิในการใช้งาน <br />
          เป็นไปตามเงื่อนไขที่บริษัทกำหนด
        </p>
      </Footer>
    </>
  );
};

export default NavigationItems;
