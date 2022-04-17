import { useState } from "react";

import styled from "styled-components";

import {
  balihai,
  carmine,
  persianblue,
  shamrock,
  gold,
} from "../../utils/color";

import Details from "./Details";

const Container = styled.div`
  padding: 15px;
  /* width: 100%; */
`;
const TableHeader = styled.h3`
  color: ${persianblue};
`;
const Table = styled.table`
  margin-top: 20px;
  min-width: 900px;
  text-align: center;
  border-collapse: collapse;

  .left {
    text-align: left;
  }
`;

const THead = styled.thead`
  > :first-child {
    text-align: left;
  }

  > :first-child:hover {
    background-color: transparent;
    cursor: default;
  }
`;
const TH = styled.th`
  font-weight: 400;
  color: ${balihai};
  font-size: 16px;
  padding: 10px 10px;
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
    padding: 5px 20px;
  }
`;

const Status = styled.td`
  color: ${({ color }) => (color ? color : shamrock)};
  font-weight: bold;
  padding: 5px 20px;
`;

const DataTable = ({ theader, data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState();
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

  return (
    <Container>
      <TableHeader>{theader}</TableHeader>
      <Table>
        <THead>
          <TR>{headers}</TR>
        </THead>
        <TBody>
          {data.map((x, index) => (
            <TR key={index} onClick={() => handleClicked(x)}>
              <TD className="left">{x["date"]}</TD>
              <TD>{x["name"]}</TD>
              <TD className="left">{x["details"]}</TD>
              <TD>{x["amount"]}</TD>
              <TD>{x["extraOffer"]}</TD>
              <TD>{x["totalPrice"]}</TD>
              <Status className="left" color={color[x["status"]["status"]]}>
                {x["status"]["text"]}
              </Status>
            </TR>
          ))}
        </TBody>
      </Table>
      <Details
        show={showDetails}
        closed={() => setShowDetails(false)}
        details={details}
      />
    </Container>
  );
};

export default DataTable;
