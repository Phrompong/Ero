import styled from "styled-components";

import { Backdrop } from "./Backdrop";

export const ModalStyled = styled.div`
  position: fixed;
  padding-top: 1rem;
  padding-bottom: 1rem;
  z-index: 300;
  width: 90%;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: ${({ show }) => (show ? "block" : "none")};
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;

  .bank-validate {
    width: 700px;
    margin: auto;
  }  

  /* For Mobile */
  @media screen and (max-width: 540px) {
    padding: ${props => props.isBuy && "10rem"};
    overflow: scroll;
    overflow-x: auto;
    overflow-y: auto;

    .bank-validate {
      width: 100%;
      margin: auto;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    overflow: scroll;
    overflow-x: auto;
    overflow-y: auto;
    margin: auto;

    .bank-validate {
      width: 100%;
      margin: auto;
    }
  }
`;

export const Modal = ({ show, modalClosed, children, coord, style }) => (
  <>
    <Backdrop show={show} clicked={modalClosed} />
    <ModalStyled show={show} coord={coord} style={style}>
      {children}
    </ModalStyled>
  </>
);
