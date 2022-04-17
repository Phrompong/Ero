import styled from "styled-components";
import { persianblue } from "../../../../utils/color";

const Toggle = styled.div`
  width: 50px;
  height: 40px;
  display: none;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;

  > div {
    width: 90%;
    height: 20%;
    border-radius: 500px;
    background-color: ${persianblue};
  }

  @media screen and (max-width: 540px) {
    display: flex;
  }

  @media screen and (min-width: 540px) and (max-width: 1000px) {
    display: flex;
  }
`;

const DrawerToggle = ({ clicked }) => (
  <Toggle onClick={clicked}>
    <div />
    <div />
    <div />
  </Toggle>
);

export default DrawerToggle;
