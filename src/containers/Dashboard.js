import styled from "styled-components";

import Overview from "../components/Overview/Overview";
import DataTable from "../components/DataTable/DataTable";

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
      details: "หุ้นเพิ่มทุน STOWER 2022",
      amount: "70,000",
      extraOffer: "STOWER-W4   140,000",
      totalPrice: "2,200,000",
      status: { status: 1, text: "ยืนยันการชำระเงิน" },
    },
    {
      date: "20/8/2022",
      name: "รชดี ชื่นภักดี",
      details: "หุ้นเพิ่มทุน MFEC 2022",
      amount: "170,000",
      extraOffer: "-",
      totalPrice: "2,100,000",
      status: { status: 2, text: "รอหลักฐานการโอนเงิน" },
    },
    {
      date: "20/4/2022",
      name: "รชดี ชื่นภักดี",
      details: "หุ้นเพิ่มทุน MFEC 2022",
      amount: "170,000",
      extraOffer: "-",
      totalPrice: "2,100,000",
      status: { status: 3, text: "ยืนยันการชำระเงินเกินสิทธิ" },
    },
    {
      date: "20/4/2022",
      name: "รชดี ชื่นภักดี",
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
        <HeaderSection>
          <div>
            <h3>Overview</h3>
            <p className="date">{nowDate.toString()}</p>
          </div>
          <div className="search">
            <SearchableInput />
            <Dropdown />
          </div>
        </HeaderSection>
        <OverviewSection>
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
