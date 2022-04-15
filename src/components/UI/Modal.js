import styled from "styled-components";

import { Backdrop } from "./Backdrop";

export const ModalStyled = styled.div`
  position: absolute;
  z-index: 300;
  width: 80%;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-65%, -50%);
  display: ${({ show }) => (show ? "block" : "none")};

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90%;
    top: 80%;
    transform: translate(-50%, -50%);
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    width: 60%;
    top: 55%;
    transform: translate(-40%, -50%);
  }
`;

export const Modal = ({ show, modalClosed, children, coord }) => (
  <>
    <Backdrop show={show} clicked={modalClosed} />
    <ModalStyled show={show} coord={coord}>
      {children}
    </ModalStyled>
  </>
);
