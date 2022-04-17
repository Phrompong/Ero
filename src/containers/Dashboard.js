import styled from "styled-components";
import DataTable from "../components/DataTable/DataTable";
import Overview from "../components/Overview/Overview";
import { Card, LineCard } from "../components/UI/Card";
import { Dropdown } from "../components/UI/Dropdown";
import { FlexContainer } from "../components/UI/FlexContainer";
import { SearchableInput } from "../components/UI/Search";
import { balihai, shamrock } from "../utils/color";

const Dashboard = () => {
  return (
    <Card>
      <Container>
        <FlexContainer>
          <Header>
            <h3>Overview</h3>
            <p>12:15 PM at 19th November 2020</p>
          </Header>
          <SearchDiv>
            <SearchableInput />
            <Dropdown />
          </SearchDiv>
        </FlexContainer>
        <FlexContainer style={{ justifyContent: "flex-start" }}>
          <LineCard>
            <Overview
              header="จำนวนคำสั่งซื้อในปัจจุบัน"
              pvalue={62}
              p1="ยอดรวมที่ชำระเงินแล้ว"
              num1="32,000,000"
              p2="จากยอดสั่งซื้อทั้งหมด"
              num2="51,000,000"
            />
          </LineCard>
          <LineCard>
            <Overview
              header="จำนวนคำสั่งซื้อเมื่อเทียบกับยอดจัดจำหน่าย"
              pvalue={88}
              color={shamrock}
              p1="คำสั่งซื้อทั้งหมด"
              num1="51,000,000"
              p2="ยอดจัดจำหน่ายทั้งหมด"
              num2="57,950,000"
            />
          </LineCard>
        </FlexContainer>
        <TableSection>
          <LineCard>
            <DataTable theader="รายการสั่งซื้อทั้งหมดในระบบ" />
          </LineCard>
        </TableSection>
      </Container>
    </Card>
  );
};
export default Dashboard;

const Container = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: scroll;

  > * {
    margin: 10px 0;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    justify-content: flex-start;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    justify-content: flex-start;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  > :last-child {
    margin-left: 10px;
  }
`;

const Header = styled.div`
  margin-left: 10px;
  h3 {
    font-weight: 400;
  }

  p {
    color: ${balihai};
    word-break: keep-all;
  }
`;

const TableSection = styled.section`
  display: flex;
`;
