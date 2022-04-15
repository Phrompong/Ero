import styled from "styled-components";

import NavigationItems from "../NavigationItems/NavigationItems";
import { Backdrop } from "../../UI/Backdrop";
import { ivory, persianblue } from "../../../utils/color";

const StyledSideDrawer = styled.div`
  position: fixed;
  width: 280px;
  background-color: ${ivory};
  left: 0;
  top: 0;
  z-index: 200;
  height: 100%;
  display: flex;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-out;

  nav {
    width: 90%;
  }
`;

const SideDrawer = ({ open, clicked }) => (
  <>
    <Backdrop show={open} clicked={clicked} bgcolor="rgba(0, 0, 0, 0.8)" />
    <StyledSideDrawer open={open} onClick={clicked}>
      <nav>
        <NavigationItems />
      </nav>
    </StyledSideDrawer>
  </>
);

export default SideDrawer;
