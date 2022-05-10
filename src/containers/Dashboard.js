import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import DataTable from "../components/DataTable/DataTable";
import Overview from "../components/Overview/Overview";
import Paginate from "../components/Paginate/Paginate";

import { Button } from "../components/UI/Button";
import { Card, LineCard } from "../components/UI/Card";
import { Dropdown } from "../components/UI/Dropdown";
import { FlexContainer } from "../components/UI/FlexContainer";
import { balihai, shamrock } from "../utils/color";
import { httpGetRequest } from "../utils/fetch";

import { Search } from "@styled-icons/bootstrap/Search";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState("year");
  const [currentOrderAmount, setCurrentOrderAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [saleAmount, setSaleAmount] = useState(0);
  const [currentSaleAmount, setCurrentSaleAmount] = useState(0);

  const searchInputRef = useRef("");

  async function fetchDataTable() {
    let endpoint = `orders/search/value?type=${selectedType}&page=${currentPage}`;
    const inputValue = searchInputRef.current.value;
    if (inputValue) {
      endpoint = `${endpoint}&key=${inputValue}`;
    }

    const [res, status] = await httpGetRequest(endpoint);
    const { totalPages } = res["_metadata"];

    setTotalPages(totalPages);
    setData(res["data"]);
  }

  async function fetchDataProgress(path, key, type, func) {
    let endpoint = `orders/progressPie/${path}?type=${type}`;

    if (key) endpoint = `${endpoint}&key=${key}`;

    console.log(`data progress : ${endpoint}`);

    const [res, status] = await httpGetRequest(endpoint);
    func(res["data"]);
  }

  async function refreshData() {
    fetchDataTable();
    fetchDataProgress(
      "currentOrderAmount",
      null,
      selectedType,
      handleFetchCurrentOrderAmount
    );
    fetchDataProgress(
      "orderCompareSales",
      null,
      selectedType,
      handleFetchOrderAmount
    );
  }

  useEffect(() => {
    fetchDataTable();
    fetchDataProgress(
      "currentOrderAmount",
      null,
      selectedType,
      handleFetchCurrentOrderAmount
    );
    fetchDataProgress(
      "orderCompareSales",
      null,
      selectedType,
      handleFetchOrderAmount
    );
  }, [selectedType]);

  useEffect(() => {
    fetchDataTable();
  }, [currentPage]);

  const handleFetchCurrentOrderAmount = (data) => {
    if (data) {
      setPaidAmount(data["paidAmount"]);
      setPaymentAmount(data["paymentAmount"]);
      setCurrentOrderAmount(Math.round(data["percent"]));
    } else {
      setPaidAmount(0);
      setPaymentAmount(0);
      setCurrentOrderAmount(0);
    }
  };

  const handleFetchOrderAmount = (data) => {
    if (data) {
      setOrderAmount(data["order"]);
      setSaleAmount(data["paymentAmount"]);
      setCurrentSaleAmount(Math.round(data["percent"]));
    } else {
      setOrderAmount(0);
      setSaleAmount(0);
      setCurrentSaleAmount(0);
    }
  };

  const handleSearchButtonClicked = async () => {
    const inputValue = searchInputRef.current.value;
    setCurrentPage(1);
    fetchDataTable();
    fetchDataProgress(
      "currentOrderAmount",
      inputValue,
      selectedType,
      handleFetchCurrentOrderAmount
    );
    fetchDataProgress(
      "orderCompareSales",
      inputValue,
      selectedType,
      handleFetchOrderAmount
    );
  };

  const theaders = [
    "วันที่",
    "ชื่อ-นามสกุล",
    "รายละเอียด",
    "จำนวนการสั่งซื้อหุ้นเพิ่มทุน",
    "สิทธิเพิ่มเติม",
    "มูลค่าการสั่งซื้อ",
    "สถานะรายการ",
  ];

  const type = [
    { label: "This year", value: "year" },
    { label: "This day", value: "day" },
  ];

  return (
    <Card>
      <Container>
        <FlexContainer>
          <Header>
            <h3>Overview</h3>
            <p>12:15 PM at 19th November 2020</p>
          </Header>
          <SearchDiv>
            <div className="search-div">
              <Dropdown
                options={type}
                selected={selectedType}
                setSelected={setSelectedType}
              />
            </div>
            <div className="search-div flex">
              <InputSeacrh placeholder="Search..." ref={searchInputRef} />
              <Button onClick={handleSearchButtonClicked}>
                <SearchIcon />
              </Button>
            </div>
          </SearchDiv>
        </FlexContainer>
        <FlexContainer
          style={{
            justifyContent: "flex-start",
            width: "100px",
          }}
        >
          <Overview
            header="จำนวนคำสั่งซื้อในปัจจุบัน"
            pvalue={currentOrderAmount}
            p1="ยอดรวมที่ชำระเงินแล้ว"
            num1={paidAmount}
            p2="จากยอดสั่งซื้อทั้งหมด"
            num2={paymentAmount}
          />
          <Overview
            header="จำนวนคำสั่งซื้อเมื่อเทียบกับยอดจัดจำหน่าย"
            pvalue={currentSaleAmount}
            color={shamrock}
            p1="คำสั่งซื้อทั้งหมด"
            num1={orderAmount}
            p2="ยอดจัดจำหน่ายทั้งหมด"
            num2={saleAmount}
          />
        </FlexContainer>
        <TableSection>
          <LineCard>
            <DataTable
              header="รายการสั่งซื้อทั้งหมดในระบบ"
              theaders={theaders}
              data={data}
              refreshData={refreshData}
            />
            <Paginate setCurrentPage={setCurrentPage} totalPages={totalPages} />
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
  @media screen and (min-width: 540px) and (max-width: 880px) {
    justify-content: flex-start;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  /* justify-content: center; */

  > :not(:first-child) {
    margin-left: 10px;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    display: block;

    .search-div {
      width: 100%;
      margin: 0.25rem 0;
    }

    .flex {
      margin-top: 0.5rem;
      display: flex;
      justify-content: space-between
    }

    > :not(:first-child) {
      margin-left: 0px;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
  }
`;

const SearchIcon = styled(Search)`
  width: 17px;
  vertical-align: text-top;
  color: darkgray;
  margin: 0 -10px;
`;

const InputSeacrh = styled.input`
  border: 2px solid #d9e1e7;
  border-radius: 10px;
  background: #fff;
  position: relative;
  font-size: 16px;
  padding: 10px;

  :focus {
    outline: none;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 85%;
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
