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
  transition: all 0.3s ease-out;

  @media screen and (max-width: 540px) {
    transform: translateX(-100%);
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 980px) {
    transform: translateX(-100%);
  }
`;

const Sidebar = () => (
  <StyledSidebar>
    <NavigationItems />
  </StyledSidebar>
);

export default Sidebar;
