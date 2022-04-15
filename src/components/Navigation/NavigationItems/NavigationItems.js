import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "styled-components";

import traffic from "../../../assets/icon_traffic.png";
import account from "../../../assets/icon_account.png";

import { Logo } from "../../Logo/Logo";
import { balihai, ivory } from "../../../utils/color";
import logo from "../../../assets/logo_awsc.jpg";

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
  width: 85%;
`;

const NavigationItems = () => (
  <Items>
    <NavigationItem link="/" exact="true" img={traffic}>
      dashboard
    </NavigationItem>
    <NavigationItem link="/import" img={account}>
      import data
    </NavigationItem>
    <NavigationItem link="/buy" img={traffic}>
      Buy / สั่งซื้อ
    </NavigationItem>
  </Items>
);

export default NavigationItems;
