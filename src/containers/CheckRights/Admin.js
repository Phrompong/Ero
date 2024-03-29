import styled from "styled-components";
import Overview from "../../components/Overview/Overview";
import DataTable from "../../components/DataTable/DataTable";
import DataTableCheckRight from "../../components/DataTable/DataTableCheckRight";
import ViewProfile from "../../components/ViewProfile/ViewProfile";
import News from "../../components/News/News";
import Paginate from "../../components/Paginate/Paginate";

import { Card, LineCard } from "../../components/UI/Card";
import { SearchableInput } from "../../components/UI/Search";
import { balihai, shamrock } from "../../utils/color";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { httpGetRequest } from "../../utils/fetch";
import { Search } from "@styled-icons/bootstrap/Search";
import { Button } from "../../components/UI/Button";

const CheckRightAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [news, setNews] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const searchInputRef = useRef("");
  const { user } = useSelector((state) => state);

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
    "หมายเลขประจำตัวประชาชน",
    "ชื่อผู้ถือหุ้น",
    "จำนวนหุ้นสามัญเดิม",
    "จำนวนสิทธิที่ได้จัดสรร",
    "สถานะการจอง",
  ];

  async function fetchDataTable() {
    setIsFetching(true);
    const inputValue = searchInputRef.current.value;
    let endpoint = `customerStocks/search/value?page=${currentPage}${
      inputValue ? "&key=" + inputValue : ""
    }`;

    const [res, status] = await httpGetRequest(endpoint);
    const { totalPages } = res["_metadata"];
    setTotalPages(totalPages);
    setData(res["data"]);
    handleSearchButtonClicked()
    setIsFetching(false);
  }

  useEffect(() => {
    fetchDataTable();
  }, []);

  useEffect(() => {
    fetchDataTable();
  }, [currentPage]);

  const handleSearchButtonClicked = async () => {
    setCurrentPage(1);
  };

  return (
    <Card>
      <Container>
        <SearchDiv>
          <InputSeacrh
            placeholder="ค้นหาหมายเลขบัตรประจำตัวประชาชน / เลขทะเบียนผู้ถือหุ้น / ชื่อ-นามสกุล"
            ref={searchInputRef}
          />
          <Button onClick={fetchDataTable}>ค้นหา</Button>
        </SearchDiv>

        <TableSection>
          {/* <div style={{ overflow: "scroll" }}> */}
          <LineCard>
            <div className="table-detail">
              <DataTableCheckRight
                header="ตรวจสอบสิทธิการจองซื้อหุ้นสามัญเพิ่มทุน"
                theaders={theaders}
                data={data}
                refreshData={fetchDataTable}
                isFetching={isFetching}
              />
              {/* <Paginate setCurrentPage={setCurrentPage} totalPages={totalPages} /> */}
            </div>
            <Paginate setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </LineCard>
          {/* </div> */}
        </TableSection>
      </Container>
    </Card>
  );
};

export default CheckRightAdmin;

const Container = styled.div`
  padding: 20px 20px;
  height: 90vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;

  > * {
    margin: 10px 0;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    justify-content: flex-start;
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    justify-content: flex-start;
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
