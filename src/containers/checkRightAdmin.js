import styled from "styled-components";
import Overview from "../components/Overview/Overview";
import DataTable from "../components/DataTable/DataTable";
import DataTableCheckRight from "../components/DataTable/DataTableCheckRight";
import ViewProfile from "../components/ViewProfile/ViewProfile";
import News from "../components/News/News";

import { Card, LineCard } from "../components/UI/Card";
import { Dropdown } from "../components/UI/Dropdown";
import { SearchableInput } from "../components/UI/Search";
import { balihai, shamrock } from "../utils/color";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { httpGetRequest } from "../utils/fetch";
import { Search } from "@styled-icons/bootstrap/Search";
import { Button } from "../components/UI/Button";

const CheckRightAdmin = () => {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [news, setNews] = useState(null);

  const { user } = useSelector((state) => state);
  const [totalPages, setTotalPages] = useState(1);

  // nowDate = `${nowDate.getHours()}:${nowDate.getMinutes()} at ${nowDate.getDate()}th ${nowDate.getMonth()}`;
  const fakedata = [
    {
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
  ];

  const theaders = [
    "รายการ",
    "ถือหุ้น",
    "เลขทะเบียนผู้ถือหุ้น",
    "ชื่อผู้ถือหุ้น",
    "จำนวนหุ้นสามัญเดิม",
    "จำนวนสิทธิที่ได้จัดสรร",
    "สถานะการจอง",
  ];

  const searchInputRef = useRef("");

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

    const [res, status] = await httpGetRequest(endpoint);
    console.log(res["data"][0]);
    setNews(res["data"][0]);
    console.log(news);
  }

  useEffect(() => {
    fetchDataTable();
    fetchDataProfile();
    fetchDataNews();
  }, []);

  return (
    <Card>
      <Container>
        <SearchDiv>
          <InputSeacrh
            placeholder="ค้นหาหมายเลขประจำตัวประชาชน / เลขที่หนังสือเดินทาง / เลขทะเบียนนิติบุคคล"
            ref={searchInputRef}
          />
          <Button>ค้นหา</Button>
        </SearchDiv>

        <TableSection>
          <DataTableCheckRight
            header="ตรวจสอบสิทธิการจองซื้อหุ้นสามัญเพิ่มทุน"
            theaders={theaders}
            data={fakedata}
            // refreshData={fetchDataTable}
          />
        </TableSection>
      </Container>
    </Card>
  );
};
export default CheckRightAdmin;

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

const InputSeacrh = styled.input`
  border: 2px solid #d9e1e7;
  border-radius: 10px;
  background: #fff;
  position: relative;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  :focus {
    outline: none;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  /* justify-content: center; */

  > :not(:first-child) {
    margin-left: 10px;
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
