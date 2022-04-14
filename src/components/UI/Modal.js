import styled from "styled-components";

import { Backdrop } from "./Backdrop";

export const ModalStyled = styled.div`
  position: absolute;
  z-index: 300;
  width: 80%;
  margin: 0 auto;
  /* min-width: 400px; */
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19); */
  box-sizing: border-box;
  /* left: 15%; */
  /* left: calc(100% - 50%);
  top: 20%; */

  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: ${({ show }) => (show ? "block" : "none")};

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90%;
    top: 80%;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 780px) {
    width: 90%;
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
