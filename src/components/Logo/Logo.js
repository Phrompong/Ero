import styled from "styled-components";

import { persianblue, portage } from "../../utils/color";

const Container = styled.div`
  text-align: center;

  h1 {
    font-size: ${({ small }) => (small ? "81px" : "90px")};
    color: ${persianblue};
    margin-bottom: -10px;
  }

  p {
    color: ${portage};
    font-size: ${({ small }) => (small ? "15px" : "24px")};
  }
`;

export const Logo = ({ small }) => (
  <Container small={small}>
    <h1>eRO</h1>
    <p>electronic - Right Offering</p>
  </Container>
);
