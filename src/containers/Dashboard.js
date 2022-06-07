import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import DataTable from "../components/DataTable/DataTable";
import Overview from "../components/Overview/Overview";
import Paginate from "../components/Paginate/Paginate";

import { Button } from "../components/UI/Button";
import { InputSearch } from "../components/UI/Input";
import { Card, LineCard } from "../components/UI/Card";
import { Dropdown } from "../components/UI/Dropdown";
import { FlexContainer } from "../components/UI/FlexContainer";
import { balihai, shamrock } from "../utils/color";
import { httpGetRequest } from "../utils/fetch";

import { Search } from "@styled-icons/bootstrap/Search";
import { FileExport } from "@styled-icons/boxicons-solid/FileExport";
import {
  DropdownSelect,
  DropdownSelectMasterBank,
  DropdownArrow,
  DropdownMasterExport,
} from "../components/UI/Dropdown";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState("year");
  const [currentOrderAmount, setCurrentOrderAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [saleAmount, setSaleAmount] = useState(0);
  const [currentSaleAmount, setCurrentSaleAmount] = useState(0);
  const [realtimeDate, setRealtimeDate] = useState(new Date());

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [masterExport, setMasterExport] = useState([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [valueMasterExport, setValueMasterExport] = useState(null);

  const searchInputRef = useRef("");

  async function fetchDataTable() {
    setIsFetching(true);
    let endpoint = `orders/search/value?type=${selectedType}&page=${currentPage}`;
    const inputValue = searchInputRef.current.value;
    if (inputValue) {
      endpoint = `${endpoint}&key=${inputValue}`;
    }

    if (startDate && endDate) {
      endpoint = `${endpoint}&startDate=${startDate}&endDate=${endDate}`;
    }

    const [res, status] = await httpGetRequest(endpoint);
    const { totalPages } = res["_metadata"];

    setTotalPages(totalPages);
    setData(res["data"]);
    setIsFetching(false);
  }

  async function fetchDataProgress(path, key, type, func) {
    let endpoint = `orders/progressPie/${path}?type=${type}`;

    if (key) endpoint = `${endpoint}&key=${key}`;

    if (startDate && endDate) {
      endpoint = `${endpoint}&startDate=${startDate}&endDate=${endDate}`;
    }

    const [res, status] = await httpGetRequest(endpoint);
    func(res["data"]);
  }

  async function fetchDataMasterExport() {
    let endpoint = `masterExport`;

    const [res, status] = await httpGetRequest(endpoint);

    console.log(res["data"]);
    setMasterExport(res["data"]);
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
    fetchDataMasterExport();
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

  const handleExport = async () => {
    const { value, fileExtension } = valueMasterExport;

    window.open(
      `https://ero-test.asiawealth.co.th/api/v1/exports?topic=${value}&fileExtension=${fileExtension}`
    );
  };

  const theaders = [
    "วันที่",
    "ชื่อ-นามสกุล",
    "รายละเอียด",
    "จำนวนการจองซื้อหุ้นเพิ่มทุน",
    "สิทธิเพิ่มเติม",
    "มูลค่าการจองซื้อ",
    "สถานะรายการ",
  ];

  const type = [
    { label: "This year", value: "year" },
    { label: "This day", value: "day" },
  ];

  useEffect(() => {
    setInterval(() => {
      setRealtimeDate(new Date());
    }, 1000);
  }, []);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Card>
      <Container>
        <FlexContainer>
          <Header>
            <h3>Overview</h3>
            <p>{`${realtimeDate.getDate()}/${
              month[realtimeDate.getMonth()]
            }/${realtimeDate.getFullYear()} ${realtimeDate.getHours()}:${realtimeDate.getMinutes()}:${realtimeDate.getSeconds()}`}</p>
            {/* <p>12:15 PM at 19th November 2020</p> */}
          </Header>
          <SearchDiv>
            <div className="search-div block">
              <InputSeacrh
                className="date-input"
                type="text"
                placeholder={"Start date"}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="search-div block">
              <InputSeacrh
                className="date-input"
                type="text"
                placeholder={"End date"}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
            {/* <div className="search-div">
              <Dropdown
                options={type}
                selected={selectedType}
                setSelected={setSelectedType}
                style={{ height: "42px" }}
              />
            </div> */}
            <div className="search-div flex">
              <InputSeacrh placeholder="Search..." ref={searchInputRef} />
              <Button
                onClick={handleSearchButtonClicked}
                style={{ marginLeft: "1rem" }}
              >
                <SearchIcon />
              </Button>
            </div>
          </SearchDiv>
        </FlexContainer>
        <FlexContainer style={{ justifyContent: "end" }}>
          <InputDiv style={{ marginTop: "20px", paddingRight: "10px" }}>
            <DropdownMasterExport
              options={masterExport}
              isOpen={isOpenDropdown}
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              onBlur={() => setIsOpenDropdown(false)}
              setSelected={setValueMasterExport}
              selected={valueMasterExport}
              display={"name"}
              //     selected={{
              //       registraionNo:
              //         allRegistrations.length > 0 && !shareId
              //           ? allRegistrations[0].registraionNo
              //           : shareId,
              //     }}
              // <DropdownArrow
              //     options={allRegistrations}
              //     isOpen={isOpenDropdownArrow}
              //     onClick={() => setIsOpenDropdownArrow(!isOpenDropdownArrow)}
              //     onBlur={() => setIsOpenDropdownArrow(false)}
              //     setSelected={(e) => setShareId(e.registraionNo)}
              //     selected={{
              //       registraionNo:
              //         allRegistrations.length > 0 && !shareId
              //           ? allRegistrations[0].registraionNo
              //           : shareId,
              //     }}
              //     display={"registraionNo"}
              //   />
            />
          </InputDiv>
          <Button onClick={handleExport}>
            <ExportIcon />
            Export file
          </Button>
        </FlexContainer>
        <FlexContainer
          style={{
            justifyContent: "flex-start",
          }}
        >
          <div className="overview">
            <div className="overview-content">
              <Overview
                header="จำนวนคำจองซื้อในปัจจุบัน"
                pvalue={currentOrderAmount}
                p1="ยอดรวมที่ชำระเงินแล้ว"
                num1={paidAmount}
                p2="จากยอดจองซื้อทั้งหมด"
                num2={paymentAmount}
              />
            </div>
            <div className="overview-content">
              <Overview
                header="จำนวนคำจองซื้อเมื่อเทียบกับยอดจัดจำหน่าย"
                pvalue={currentSaleAmount}
                color={shamrock}
                p1="คำจองซื้อทั้งหมด"
                num1={orderAmount}
                p2="ยอดจัดจำหน่ายทั้งหมด"
                num2={saleAmount}
              />
            </div>
          </div>
        </FlexContainer>
        <TableSection>
          <LineCard>
            <div className="table-detail">
              <DataTable
                header="รายการจองซื้อทั้งหมดในระบบ"
                theaders={theaders}
                data={data}
                refreshData={refreshData}
                isFetching={isFetching}
              />
              <Paginate
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
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
  display: flex;
  // justify-content: center;
  flex-direction: column;
  height: 90vh;
  width: 80vw;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;

  > * {
    margin: 10px 0;
  }

  /* For Mobile */
  @media screen and (max-width: 880px) {
    justify-content: flex-start;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  /* justify-content: center; */

  > :not(:first-child) {
    margin-left: 10px;
  }

  .block {
    display: block;
    text-align: end;
  }

  /* For Mobile */
  @media screen and (max-width: 880px) {
    display: block;

    .search-div {
      width: 100%;
      margin: 0.25rem 0;
    }
    .flex {
      margin-top: 0.5rem;
      display: flex;
      justify-content: space-between;
    }

    > :not(:first-child) {
      margin-left: 0px;
    }
  }
`;

const ExportIcon = styled(FileExport)`
  width: 17px;
  vertical-align: text-top;
  color: #FFFFFFF;
  margin-right: 1rem;
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

  .date-input {
    width: 200px;
    height: 42px;
  }

  :focus {
    outline: none;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 100%;

    .date-input {
      width: 100%;
      height: 42px;
    }
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

const InputDiv = styled.div`
  margin: 10px 0;

  .input-file-upload {
    width: 200px;
  }

  .inputField {
    display: flex;
    text-align: start;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;

    p {
      position: relative;
      margin: 0 10px;
      width: 50%;
    }

    .label-input-flex {
      width: 20%;
      margin-top: auto;
      margin-bottom: auto;
    }

    .div-dropdown {
      width: 100%;
      display: flex;

      .label-dropdown {
        width: 30%;
        max-width: 1000px;
      }
    }

    .label-input {
      justify-content: start;
      width: 50%;
    }

    .share-detail {
      white-space: nowrap;
      width: 100%;
    }

    .bank-detail-title {
      width: 20%;
    }
    .bank-detail {
      width: 80%;
    }
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    .inputField {
      display: block;
      width: 100%;
      align-items: baseline;

      p {
        position: static;
        width: 100%;

        span {
          width: 200px;
        }
      }

      .label-input {
        justify-content: start;
        width: 100%;
      }

      .bank-detail-title {
        width: 100%;
      }
      .bank-detail {
        width: 100%;
      }
    }

    .inputField > .div-dropdown {
      width: 100%;
      display: block;

      .label-input-flex {
        width: 100%;
        margin: 0 0 0.5rem 0;
      }

      .label-dropdown {
        width: 100%;
      }
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    .inputField > .div-dropdown {
      .label-input-flex {
        width: 100%;
      }

      .label-dropdown {
        width: 100%;
      }
    }
  }
`;
