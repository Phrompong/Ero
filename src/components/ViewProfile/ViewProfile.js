import styled from "styled-components";

import { ProgressPie } from "../UI/ProgressPie";
import { persianblue } from "../../utils/color";
import { FlexContainer } from "../UI/FlexContainer";
import { gold } from "../../utils/color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 1141px;
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

const Div = styled.div`
  padding: 10px;
`;

const UserInfo = styled(Div)`
  .info {
    padding: 2px 0;
    flex: 1;
  }
`;

const Link = styled.div`
  a {
    text-decoration: underline;
    color: ${gold};
  }
  text-align: right;

  @media screen and (max-width: 540px) {
    text-align: left;
  }
`;

const Datagrid = styled(Div)`
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    background-color: #2196f3;
    padding: 10px;
  }
`;

const ViewProfile = ({ header, profile }) => {
  if (!profile) return;

  const {
    name,
    lastname,
    telephone,
    email,
    atsBankNo,
    atsBank,
    color,
    address,
    zipcode,
  } = profile;
  const info = (label, value, link) => (
    <FlexContainer
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "baseline",
      }}
    >
      <p className="info-label">{label}</p>
      <p className="info-detail">{value}</p>
      <p>{link}</p>
    </FlexContainer>
  );
  return (
    <Container color={color}>
      <Header>{header}</Header>
      {info("ชื่อ-นามสกุล / Name-Lastname   :", name + " " + lastname)}
      {info("โทรศัพท์ / Telephone  :", telephone)}
      {info("ที่อยู่ / Address  :", address + " " + zipcode)}
    </Container>
  );
};

export default ViewProfile;
