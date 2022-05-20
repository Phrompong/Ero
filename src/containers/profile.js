import styled from "styled-components";

import Overview from "../components/Overview/Overview";
import DataTable from "../components/DataTable/DataTable";
import DataTableProfile from "../components/DataTable/DataTableProfile";
import ViewProfile from "../components/ViewProfile/ViewProfile";
import News from "../components/News/News";

import { Card, LineCard } from "../components/UI/Card";
import { Dropdown } from "../components/UI/Dropdown";
import { SearchableInput } from "../components/UI/Search";
import { balihai, shamrock } from "../utils/color";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { httpGetRequest } from "../utils/fetch";

import { Spinner } from "../components/Logo/Spinner"
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [news, setNews] = useState(null);

  const { user } = useSelector((state) => state);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(true)

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

  const theaders = [
    "วันที่",
    "รายละเอียด",
    "จำนวนการจองซื้อหุ้นเพิ่มทุน",
    "สิทธิเพิ่มเติม",
    "มูลค่าการจองซื้อ",
    "สถานะรายการ",
  ];

  async function fetchDataTable() {
    let endpoint = `orders?customerId=${user.customerId}`;

    const [res, status] = await httpGetRequest(endpoint);
    const { totalPages } = res["_metadata"];

    setTotalPages(totalPages);
    setData(res["data"]);
  }

  async function fetchDataProfile() {
    let endpoint = `masterCustomers/${user.customerId}`;

    const [res, status] = await httpGetRequest(endpoint);
    console.log(res["data"]);
    setProfile(res["data"]);
  }

  async function fetchDataNews() {
    let endpoint = `news`;
    const [res, status] = await httpGetRequest(endpoint)
    console.log(res["data"][0]);
    setNews(res["data"][0]);
    console.log(news);
  }

  useEffect(async () => {
    setIsFetching(true)
    await fetchDataTable();
    await fetchDataProfile();
    await fetchDataNews();
    setIsFetching(false)
  }, []);

  return (
    <Card>
      <Container>
        <OverviewSection>
          <LineCard>
            <ViewProfile header="ข้อมูลทั่วไปของท่าน" profile={profile} />
          </LineCard>
        </OverviewSection>

        <TableSection>
          <LineCard>
            <div className="table-detail">
              <DataTableProfile
                header="รายการจองซื้อของท่าน"
                theaders={theaders}
                data={data}
                refreshData={fetchDataTable}
                isFetching={isFetching}
              />
            </div>
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
  width: 80vw;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;

  section {
    margin: 10px 0;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    width: 90vw;
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
