import styled from "styled-components";

import { ExclamationCircle } from "@styled-icons/bootstrap/ExclamationCircle";
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";

const ModalAlert = styled.div`
  border-top: 3px solid #479099;
  position: fixed;
  /* position: absolute; */
  z-index: 500;
  width: 200px;
  /* left: 50%;
  margin-left: -100px; */
  padding: 10px;
  right: 20px;
  margin-right: -150px;
  top: 10px;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  box-sizing: border-box;

  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: all 0.4s ease-in;

  @media (min-width: 600px) {
    width: 200px;
    top: 50px;
    right: 40px;
    margin-right: 0;
  }

  h1 {
    margin: 15px 0 10px 0;
    font-weight: lighter;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid hsl(0, 0%, 80%);
    margin-bottom: 10px;
  }
`;

const Error = styled(ModalAlert)`
  color: #7e0f12;
  background: #e6b7b0;
  border: none;
  border-left: 4px solid #ce6a6b;
  display: flex;
  flex-direction: row;
  width: fit-content;
  /* top: 5%; */
  h4,
  p {
    margin: 0;
    display: inline-block;
  }
  h4 {
    margin-left: 10px;
  }
`;

const Success = styled(Error)`
  color: #5c8a03;
  background: #e1ebd5;
  border-left: 4px solid #5c8a03;
  padding: 10px;
`;

const Warning = styled.div`
  margin-top: 40px;
  color: #5e6464;
  padding: 10px;
  background: rgba(232, 166, 40, 20%);
  border-left: 4px solid #e8a628;
  display: flex;
  align-items: flex-start;
  line-height: 30px;
  color: #e8a628;
  h4,
  p {
    margin: 0;
    margin-left: 10px;
    color: #905628;
  }
`;

export const Alert = ({ children, show, error }) => {
  return (
    <ModalAlert show={show} error={error}>
      {children}
    </ModalAlert>
  );
};

export const WarningAlert = ({ children }) => (
  <Warning>
    <div>
      <ExclamationCircle width="20px" height="20px" />
    </div>
    {children}
  </Warning>
);

export const ErrorAlert = ({ children, show }) => (
  <Error show={show}>
    <ExclamationCircle width="20px" height="20px" />
    {children}
  </Error>
);

export const SuccessAlert = ({ children, show }) => (
  <Success show={show}>
    <CheckCircle width="20px" height="20px" />
    {children}
  </Success>
);
