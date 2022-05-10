import styled from "styled-components";

import { ProgressPie } from "../UI/ProgressPie";
import { persianblue } from "../../utils/color";

import { LineCard } from "../UI/Card";

const Overview = ({ header, pvalue, color, p1, p2, num1, num2 }) => (
  <Container color={color}>
    <LineCard style={{ padding: 15 }}>
      <Header>{header}</Header>
      <Div>
        <Progress>
          <ProgressPie value={pvalue} color={color} />
        </Progress>
        <Info>
          <Paragraph>{p1}</Paragraph>
          <h2>
            {num1}
            <span>บาท</span>
          </h2>
          <Paragraph>{p2}</Paragraph>
          <h4>
            {num2}
            <span>บาท</span>
          </h4>
        </Info>
      </Div>
    </LineCard>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  min-width: 375px;

  h2 {
    margin-bottom: 10px;
    font-size: 3rem;
    color: ${({ color }) => (color ? color : persianblue)};
  }

  h4 {
    font-size: 1.5rem;
  }
  span {
    font-size: 1rem;
    margin-left: 10px;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    h2 {
      font-size: 2rem;
    }

    h4 {
      font-size: 1.2rem;
    }

    span {
      font-size: 0.7rem;
      margin-left: 5px;
    }
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  /* For Mobile */
  @media screen and (max-width: 880px) {
    justify-content: center;
  }
`;

const Header = styled.h3`
  color: ${persianblue};

  /* For Mobile */
  @media screen and (max-width: 880px) {
    text-align: center;
  }
`;

const Info = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

const Progress = styled.div``;

const Paragraph = styled.p`
  /* white-space: nowrap; */
`;

export default Overview;
