import styled from "styled-components";

import { ProgressPie } from "../UI/ProgressPie";
import { persianblue } from "../../utils/color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

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
`;

const Header = styled.h3`
  color: ${persianblue};
`;

const Info = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

const Progress = styled.div``;

const Paragraph = styled.p``;

const Overview = ({ header, pvalue, color, p1, p2, num1, num2 }) => (
  <Container color={color}>
    <Header>{header}</Header>
    <div>
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
    </div>
  </Container>
);

export default Overview;
