import styled from "styled-components";

import NavigationItems from "../NavigationItems/NavigationItems";
import { Logo } from "../../Logo/Logo";
import logo from "../../../assets/logo_awsc.jpg";

import { ivory, balihai } from "../../../utils/color";
const StyledSidebar = styled.div`
  position: fixed;
  width: 280px;
  left: 0;
  top: 0;
  z-index: 200;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${ivory};
  /* padding: 20px; */
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

const Sidebar = () => (
  <StyledSidebar>
    <Nav>
      <Logo small />
      <NavigationItems />
    </Nav>
    <Footer>
      <div className="img">
        <img src={logo} />
        <p className="year">© 2022 </p>
      </div>
      <p className="text">
        สงวนสิทธิ์ในการใช้งาน <br />
        เป็นไปตามเงื่อนไขที่บริษัทกำหนด
      </p>
    </Footer>
  </StyledSidebar>
);

export default Sidebar;
