import styled from "styled-components";

import { Card } from "../components/UI/Card";

const Container = styled.div`
  padding: 20px;
  height: 80vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => (
  <Card>
    <Container>Dashboard</Container>
  </Card>
);
export default Dashboard;
