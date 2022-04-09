import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { ivory, persianblue } from "../../../../utils/color";

const Item = styled.li``;

const Link = styled(NavLink)`
  &.active {
    color: ${ivory};
    background-color: ${persianblue};
  }
`;
const NavigationItem = ({ children, link, exact }) => (
  <Item>
    <Link to={link} exact={exact}>
      {children}
    </Link>
  </Item>
);

export default NavigationItem;
