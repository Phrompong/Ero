import styled, { css } from "styled-components";

import { persianblue } from "../../utils/color";

export const Button = styled.button`
  /* background-color: #ce6a6b; */
  background-color: ${({ background }) =>
    background ? background : persianblue};

  border: none;
  color: white;
  outline: none;
  /* font-weight: bold; */
  cursor: pointer;
  font-size: 13px;
  border-radius: 7px;
  overflow: hidden;
  width: ${({ width }) => (width ? width : "fit-content")};
  height: ${({ height }) => (height ? height : "40px")};
  padding: 10px 20px;
`;

export const CancelButton = styled(Button)`
  background-color: #ce6a6b;
`;

export const SaveButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #4a919e;
  color: #4a919e;
  margin-right: 10px;

  :hover {
    background-color: #4a919e;
    color: #fff;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #ce6a6b;
  padding: 1px 1px;
`;
