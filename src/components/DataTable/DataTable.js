import { useState, useEffect, useMemo } from "react";

import styled from "styled-components";

import {
  balihai,
  carmine,
  persianblue,
  shamrock,
  gold,
} from "../../utils/color";

import Details from "./Details";
import Paginate from "../Paginate/Paginate";
import { httpGetRequest } from "../../utils/fetch";

const DataTable = ({ theader }) => {
  const [data, setData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchData() {
    const endpoint = `orders?limit=10&page=${currentPage}`;
    const [res, status] = await httpGetRequest(endpoint);
    handleFetchData(res, status);
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleFetchData = (res) => {
    const { totalPages } = res["_metadata"];
    setTotalPages(totalPages);
    setData(res["data"]);
  };

  const headers = [
    "วันที่",
    "ชื่อ-นามสกุล",
    "รายละเอียด",
    "จำนวนการสั่งซื้อหุ้นเพิ่มทุน",
    "สิทธิเพิ่มเติม",
    "มูลค่าการสั่งซื้อ",
    "สถานะรายการ",
  ].map((header) => <TH key={header}>{header}</TH>);

  const color = {
    1: shamrock,
    2: gold,
    3: persianblue,
    4: carmine,
  };

  const handleClicked = (details) => {
    setShowDetails(true);
    setDetails(details);
  };

  const refreshData = () => {
    setShowDetails(false);
    fetchData();
  };

  const detailsModal = useMemo(
    () => <Details show={showDetails} closed={refreshData} details={details} />,
    [details, showDetails]
  );

  return (
    <Container>
      <TableHeader>{theader}</TableHeader>
      {data && (
        <div className="table">
          <Table>
            <THead>
              <TR>{headers}</TR>
            </THead>
            <TBody>
              {data.map((x, index) => (
                <TR key={index} onClick={() => handleClicked(x)}>
                  <TD className="left">
                    {new Date(x["createdOn"]).toLocaleDateString()}
                  </TD>
                  <TD className="left">{`${x["customerId"]["name"]} ${x["customerId"]["lastname"]} `}</TD>
                  <TD>{x["rightStockName"]}</TD>
                  <TD>{x["paidRightVolume"]}</TD>
                  <TD>{`${x["rightSpacialName"]} ${x["rightSpacialVolume"]}`}</TD>
                  <TD>{x["paymentAmount"]}</TD>
                  <Status className="left" color={color[x["status"]["value"]]}>
                    {x["status"]["status"]}
                  </Status>
                </TR>
              ))}
            </TBody>
          </Table>
          <Paginate setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      )}
      {showDetails && detailsModal}
    </Container>
  );
};

export default DataTable;

const Container = styled.div`
  padding: 15px;
  min-width: 1200px;

  .table {
    min-height: 400px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const TableHeader = styled.h3`
  color: ${persianblue};
`;

const Table = styled.table`
  margin: 20px 0;
  text-align: center;
  border-collapse: collapse;
  width: 100%;

  .left {
    text-align: left;
  }
`;

const THead = styled.thead`
  > :first-child:hover {
    background-color: transparent;
    cursor: default;
  }
`;

const TH = styled.th`
  text-align: center;
  font-weight: 400;
  color: ${balihai};
  font-size: 16px;
  padding: 10px 20px;
`;

const TBody = styled.tbody``;

const TR = styled.tr`
  :hover {
    background-color: #ecedf8;
    cursor: pointer;
  }
`;

const TD = styled.td`
  :not(:first-child) {
    padding: 5px 25px;
  }
`;

const Status = styled.td`
  color: ${({ color }) => (color ? color : "#000")};
  font-weight: bold;
  padding: 5px 20px;
`;
