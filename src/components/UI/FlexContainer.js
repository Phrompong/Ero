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
  @media screen and (min-width: 540px) and (max-width: 880px) {
    /* flex-direction: column;

    > div {
      margin-left: 0;
      margin-bottom: 20px;
    } */
  }
`;
export const FlexContainer = ({ children, style }) => (
  <Container style={style}>{children}</Container>
);
