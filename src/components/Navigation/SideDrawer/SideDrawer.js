import styled from "styled-components";

import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "./DrawerToggle/DrawerToggle";

const StyledSideDrawer = styled.div`
  /* position: fixed; */
  width: 280px;
  background-color: blueviolet;
  left: 0;
  top: 0;
  z-index: 200;
  height: 100%;
  display: flex;
  /* background-color: #fff; */
  background-color: yellow;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-out;

  @media (min-width: 500px) {
    display: none;
  }
`;

const SideDrawer = ({ open, drawerToggleClicked }) => (
  <StyledSideDrawer open={open}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <nav>
      <NavigationItems />
    </nav>
  </StyledSideDrawer>
);

export default SideDrawer;
