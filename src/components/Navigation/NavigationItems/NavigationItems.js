import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "styled-components";

const Items = styled.ul`
  list-style: none;
  display: flex;
`;

const NavigationItems = () => (
  <Items>
    <NavigationItem link="/">dashboard</NavigationItem>
    <NavigationItem link="/import">import data</NavigationItem>
  </Items>
);

export default NavigationItems;
