import styled from "styled-components";

import { white } from "../../utils/color";

export const StyledCard = styled.div`
  /* padding: 1rem; */
  border-radius: 15px;
  background: ${white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Card = ({ children }) => <StyledCard>{children}</StyledCard>;
