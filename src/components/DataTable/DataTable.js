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

const DataTable = ({ header, theaders, data, refreshData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const endpoint = "status";

      const [res, status] = await httpGetRequest(endpoint);
      handleFetchStatusOption(res);
    }
    fetchData();
  }, []);

  const handleFetchStatusOption = (res) => {
    const options = res["data"].map((x) => ({
      label: x["status"],
      value: x["_id"],
    }));
    setOptions(options);
  };

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

  const handleClosedModal = () => {
    setShowDetails(false);
    refreshData();
  };

  const detailsModal = useMemo(
    () => (
      <Details
        options={options}
        show={showDetails}
        closed={handleClosedModal}
        details={details}
      />
    ),
    [details, showDetails]
  );

  return (
    <Container>
      <TableHeader>{header}</TableHeader>
      {data && (
        <Table>
          <THead>
            <TR>
              {theaders.map((header) => (
                <TH key={header}>{header}</TH>
              ))}
            </TR>
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
                <TD>{`${x["rightSpacialName"] || ""} ${
                  x["rightSpacialVolume"] || ""
                }`}</TD>
                <TD>{x["paymentAmount"]}</TD>
                <Status className="left" color={color[x["status"]["value"]]}>
                  {x["status"]["status"]}
                </Status>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
      {showDetails && detailsModal}
    </Container>
  );
};

export default DataTable;

const Container = styled.div`
  padding: 15px;
  min-width: 1200px;
  min-height: 450px;
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
