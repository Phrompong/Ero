import styled from "styled-components";
import logo from "../../../assets/logo_awsc.jpg";
import { balihai, ivory } from "../../../utils/color";
import { Logo } from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const StyledSidebar = styled.div`
  position: fixed;
  width: 280px;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${ivory};
  transform: translateX(0);
  transition: all 0.4s ease-in;

  @media screen and (max-width: 540px) {
    transform: translateX(-100%);
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 980px) {
    transform: translateX(-100%);
  }
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
    {/* <NavigationItems /> */}
  </StyledSidebar>
);

export default Sidebar;
