import styled from "styled-components";

import { white } from "../../utils/color";

export const StyledCard = styled.div`
  /* padding: 1rem; */
  /* width: 100%; */
  width: fit-content;
  margin: 1rem;
  border-radius: 15px;
  background: ${white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
`;

export const StyledLineCard = styled.div`
  border-radius: 10px;
  border: 1px solid #d9e1e7;
  margin: 0 10px;

  @media screen and (max-width: 540px) {
    margin: 0;
  }
`;

export const Card = ({ children }) => <StyledCard>{children}</StyledCard>;

export const LineCard = ({ children, style }) => (
  <StyledLineCard style={style}>{children}</StyledLineCard>
);
