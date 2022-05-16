import styled, { css } from "styled-components";

import { persianblue } from "../../utils/color";

export const Button = styled.button`
  background-color: ${({ background }) =>
    background ? background : persianblue};

  border: none;
  color: ${({ color }) => (color ? color : "#fff")};
  outline: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 7px;
  overflow: hidden;
  width: ${({ width }) => (width ? width : "fit-content")};
  /* height: ${({ height }) => (height ? height : "40px")}; */
  padding: 10px 20px;
  font-weight: bold;

  @media screen and (max-width: 540px) {
    font-size: 14px;
  }

  @media screen and (min-width: 541px) and (max-width: 880px) {
    font-size: 14px;
  }
`;

// export const SaveButton = styled(Button)`
//   background-color: transparent;
//   border: 1px solid #4a919e;
//   color: #4a919e;
//   margin-right: 10px;

//   :hover {
//     background-color: #4a919e;
//     color: #fff;
//   }
// `;

// export const DeleteButton = styled(Button)`
//   background-color: #ce6a6b;
//   padding: 1px 1px;
// `;
