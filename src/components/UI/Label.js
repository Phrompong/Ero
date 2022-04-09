import styled from "styled-components";

export const Label = styled.label`
  position: absolute;
  /* top: -20%; */
  top: ${(props) => (props.top ? props.top : "-50%")};
  left: 3%;
  font-size: 16px;
  /* color: #ce6a6b; */
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
`;
