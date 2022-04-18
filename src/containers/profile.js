import styled from "styled-components";

import Overview from "../components/Overview/Overview";
import DataTable from "../components/DataTable/DataTable";
import ViewProfile from "../components/ViewProfile/ViewProfile";
import News from "../components/News/News";

import { Card, LineCard } from "../components/UI/Card";
import { Dropdown } from "../components/UI/Dropdown";
import { SearchableInput } from "../components/UI/Search";
import { balihai, shamrock } from "../utils/color";

const Dashboard = () => {
  let nowDate = new Date();
  // nowDate = `${nowDate.getHours()}:${nowDate.getMinutes()} at ${nowDate.getDate()}th ${nowDate.getMonth()}`;
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
        <OverviewSection>
          <LineCard>
            <ViewProfile
              header="ข้อมูลทั่วไปของท่าน"
              name="รชดี ชื่นภัคดี"
              telephone="085-515-4560"
              email="test@mail.com"
              bankNumber="1234567891"
              bankName="SCB"
            />
          </LineCard>

          <LineCard>
            <News header="ข้อมูลประชาสัมพันธ์" imageUrl="" />
          </LineCard>
        </OverviewSection>

        <TableSection>
          <LineCard>
            {/* <DataTable theader="รายการสั่งซื้อทั้งหมดในระบบ" data={fakedata} /> */}
          </LineCard>
        </TableSection>
      </Container>
    </Card>
  );
};
export default Dashboard;

const Container = styled.div`
  padding: 20px 20px;
  height: 90vh;
  min-width: 60vw;
  display: flex;
  flex-direction: column;
  section {
    margin: 10px 0;
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
