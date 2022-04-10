import styled from "styled-components";

import DrawerToggle from "./DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";

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

const SideDrawer = ({ open }) => (
  <StyledSideDrawer open={open}>
    <nav>
      <NavigationItems />
    </nav>
  </StyledSideDrawer>
);

export default SideDrawer;
