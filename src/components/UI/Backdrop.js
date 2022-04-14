import styled from "styled-components";

const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(253, 253, 250, 0.95);
`;

export const Backdrop = (props) =>
  props.show ? <StyledBackdrop onClick={props.clicked} /> : null;
