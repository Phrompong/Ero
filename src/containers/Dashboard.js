import styled from "styled-components";
import { Card } from "../components/UI/Card";
import { Dropdown } from "../components/UI/Dropdown";
import { FlexContainer } from "../components/UI/FlexContainer";
import { SearchableInput } from "../components/UI/Search";
import { balihai, shamrock } from "../utils/color";

import { LineCard } from "../components/UI/Card";
import Overview from "../components/Overview/Overview";
import DataTable from "../components/DataTable/DataTable";

const Dashboard = () => {
  let nowDate = new Date().toDateString();

  const fakedata = [
    {
      date: "20/4/2022",
      name: "รชดี ชื่นภักดี",
      phone: "0890389311",
      email: "rachadeec@gmail.com",
      ats: "00877755656",
      bank: "SCB",
      details: "หุ้นเพิ่มทุน STOWER 2022",
      amount: "70,000",
      extraOffer: "STOWER-W4   140,000",
      totalPrice: "2,200,000",
      status: { status: 1, text: "ยืนยันการชำระเงิน" },
    },
    {
      date: "20/8/2022",
      name: "รชดี ชื่นภักดี",
      phone: "0890389311",
      email: "rachadeec@gmail.com",
      ats: "00877755656",
      bank: "SCB",
      details: "หุ้นเพิ่มทุน MFEC 2022",
      amount: "170,000",
      extraOffer: "-",
      totalPrice: "2,100,000",
      status: { status: 2, text: "รอหลักฐานการโอนเงิน" },
    },
    {
      date: "20/4/2022",
      name: "รชดี ชื่นภักดี",
      phone: "0890389311",
      email: "rachadeec@gmail.com",
      ats: "00877755656",
      bank: "SCB",
      details: "หุ้นเพิ่มทุน MFEC 2022",
      amount: "170,000",
      extraOffer: "-",
      totalPrice: "2,100,000",
      status: { status: 3, text: "ยืนยันการชำระเงินเกินสิทธิ" },
    },
    {
      date: "20/4/2022",
      name: "รชดี ชื่นภักดี",
      phone: "0890389311",
      email: "rachadeec@gmail.com",
      ats: "00877755656",
      bank: "SCB",
      details: "หุ้นเพิ่มทุน MFEC 2022",
      amount: "170,000",
      extraOffer: "-",
      totalPrice: "2,100,000",
      status: { status: 4, text: "รอดำเนินการโอนเงินคืน" },
    },
  ];
  return (
    <Card>
      <Container>
        {/* <HeaderSection>
          <div>
            <h3>Overview</h3>
            <p className="date">{nowDate.toString()}</p>
          </div>
          <div className="search">
            <SearchableInput />
            <Dropdown />
          </div>
        </HeaderSection> */}
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
            <DataTable theader="รายการสั่งซื้อทั้งหมดในระบบ" data={fakedata} />
          </LineCard>
        </TableSection>
        {/* <OverviewSection>
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
        </OverviewSection>

        <TableSection>
          <LineCard>
            <DataTable theader="รายการสั่งซื้อทั้งหมดในระบบ" data={fakedata} />
          </LineCard>
        </TableSection> */}
      </Container>
    </Card>
  );
};
export default Dashboard;

const Container = styled.div`
  padding: 20px 20px;
  height: 90vh;
  width: 70vw;
  display: flex;
  flex-direction: column;
  overflow: auto;

  > * {
    margin: 10px 0;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    width: 80vw;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
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

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  > :first-child {
    flex-grow: 2;
    margin-left: 10px;
  }

  h3 {
    font-weight: 400;
  }

  .search {
    display: flex;

    > :last-child {
      margin-left: 10px;
    }
  }

  .date {
    color: ${balihai};
  }
`;

const OverviewSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  > :not(:first-child) {
    margin-left: 10px;
  }

  div {
    display: flex;
  }
`;

const TableSection = styled.section`
  /* background-color: lightblue; */
  height: 100%;
  display: flex;
`;
