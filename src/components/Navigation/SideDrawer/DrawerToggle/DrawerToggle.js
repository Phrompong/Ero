import styled from "styled-components";
import { persianblue } from "../../../../utils/color";

const Toggle = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;

  div {
    width: 90%;
    height: 3%;
    background-color: ${persianblue};
  }

  @media (min-width: 999px) {
    display: none;
  }
`;

const DrawerToggle = (props) => (
  <Toggle onClick={props.clicked}>
    <div />
    <div />
    <div />
  </Toggle>
);

export default DrawerToggle;
