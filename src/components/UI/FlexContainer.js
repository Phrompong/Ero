import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0px;

  /* For Mobile */
  @media screen and (max-width: 540px) {
    flex-direction: column;

    > div {
      margin-left: 0;
      margin-bottom: 20px;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 780px) {
    /* flex-direction: column; */
  }
`;
export const FlexContainer = ({ children }) => (
  <Container>{children}</Container>
);
