import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { balihai, ivory, persianblue } from "../../../../utils/color";

const Item = styled.li`
  margin-top: 10px;
  vertical-align: center;
`;

const Link = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  border-radius: 10px;
  width: 100%;
  padding: 10px 0;
  text-transform: capitalize;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
  color: ${balihai};

  img {
    width: 25px;
    margin-left: 20px;
    margin-right: 10px;
    vertical-align: text-bottom;
  }
  &.active {
    color: ${ivory};
    background-color: ${persianblue};
  }
`;
const NavigationItem = ({ children, link, exact, img }) => (
  <Item>
    <Link to={link} exact={exact}>
      <span>
        <img src={img} />
      </span>
      {children}
    </Link>
  </Item>
);

export default NavigationItem;
