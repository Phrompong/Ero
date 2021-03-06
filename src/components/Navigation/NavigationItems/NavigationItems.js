import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "styled-components";

import traffic from "../../../assets/icon_traffic.png";
import account from "../../../assets/icon_account.png";

const Items = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-top: 20px;
`;

const NavigationItems = () => (
  <Items>
    <NavigationItem link="/" exact="true" img={traffic}>
      dashboard
    </NavigationItem>
    <NavigationItem link="/import" img={account}>
      import data
    </NavigationItem>
  </Items>
);

export default NavigationItems;
