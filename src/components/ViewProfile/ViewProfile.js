import styled from "styled-components";

import { ProgressPie } from "../UI/ProgressPie";
import { persianblue } from "../../utils/color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 650px;
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
  display: grid;
  grid-template-columns: auto auto;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
`;

const gridItem = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
`;

const Progress = styled.div``;

const Paragraph = styled.p``;

const Overview = ({ header, pvalue, color, p1, p2, num1, num2 }) => (
  <Container color={color}>
    <Header>{header}</Header>
    <div>
      <Info>
        <Paragraph>ชื่อ-นามสกุล / Name-Lastname : </Paragraph>
        <Paragraph>ชื่อ-นามสกุล / Name-Lastname : </Paragraph>

        {/* <Paragraph>ชื่อ-นามสกุล / Name-Lastname :</Paragraph>
        <Paragraph>โทรศัพท์ / Telephone :</Paragraph>
        <Paragraph>อีเมล์ / Email :</Paragraph>
        <Paragraph>หมายเลขบัญชี ATS :</Paragraph>
        <Paragraph>Bank ATS :</Paragraph> */}
      </Info>
    </div>
  </Container>
);

export default Overview;
