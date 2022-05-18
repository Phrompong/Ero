import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import Overview from "../../components/Overview/Overview";
import DataTable from "../../components/DataTable/DataTable";
import DataTableCheckRight from "../../components/DataTable/DataTableCheckRight";
import ViewProfile from "../../components/ViewProfile/ViewProfile";
import News from "../../components/News/News";
import Paginate from "../../components/Paginate/Paginate";

import { Card, LineCard } from "../../components/UI/Card";
import { InputSearch } from "../../components/UI/Input";
import { Dropdown } from "../../components/UI/Dropdown";
import { SearchableInput } from "../../components/UI/Search";
import { balihai, shamrock } from "../../utils/color";

import { httpGetRequest } from "../../utils/fetch";
import { Search } from "@styled-icons/bootstrap/Search";
import { Button } from "../../components/UI/Button";

const CheckRightCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const searchInputRef = useRef("");
  const [news, setNews] = useState(null);

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
    "ชื่อผู้ถือหุ้น",
    "จำนวนหุ้นสามัญเดิม",
    "จำนวนสิทธิที่ได้จัดสรร",
    "สถานะการจอง",
  ];

  const handleSearchButtonClicked = async () => {
    setCurrentPage(1);
    fetchDataTable();
  };

  async function fetchDataTable() {
    const inputValue = searchInputRef.current.value;
    let endpoint = `customerStocks/search/value?customerId=${
      user.customerId
    }&page=${currentPage}${inputValue ? "&key=" + inputValue : ""}`;

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
          <Input
            placeholder="ค้นหาหมายเลขประจำตัวประชาชน / เลขที่หนังสือเดินทาง / เลขทะเบียนนิติบุคคล"
            ref={searchInputRef}
          />
          <Button onClick={handleSearchButtonClicked}>ค้นหา</Button>
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
                />
                {/* <Paginate setCurrentPage={setCurrentPage} totalPages={totalPages} /> */}
              </div>
              <div className="button-section">
                <Button onClick={() => navigate(`${location.pathname}/info`)}>
                  ท่านสามารถกดตรวจสอบสิทธิการจองซื้อหุ้นภายหลังวันที่ 16 มิถุนายน
                  2565 เป็นต้นไป
                </Button>
              </div>
              <Paginate setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </LineCard>
          {/* </div> */}
        </TableSection>
      </Container>
    </Card>
  );
};
export default CheckRightCustomer;

const Container = styled.div`
  padding: 20px 20px;
  height: 90vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  // overflow: auto;
  overflow-y: auto;

  > * {
    margin: 10px 0;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;
    justify-content: flex-start;
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    width: 90vw;
    justify-content: flex-start;
  }
`;

const Input = styled(InputSearch)`
  width: 100%;
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
  display: block;

  .button-section {
    margin: auto;
    padding: 1rem 0;
    width: 100%;
    text-align: center;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    overflow: scroll;
    overflow-x: auto;
    overflow-y: auto;
  }
`;
