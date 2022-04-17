import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Container = styled.div`
  width: 120px;
  height: 120px;
  padding: 30px 30px 10px 0;
`;

export const ProgressPie = ({ value, color }) => (
  <Container>
    <CircularProgressbar
      value={value}
      text={`${value}%`}
      counterClockwise={true}
      strokeWidth={4}
      styles={buildStyles({
        strokeLinecap: "butt",
        pathColor: color,
        textColor: "#000",
        textSize: "33px",
      })}
    />
  </Container>
);
