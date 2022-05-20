import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import {
  balihai,
  carmine,
  persianblue,
  shamrock,
  gold,
  red,
} from "../../utils/color";

import Details from "./Details";
import { ModalDetail } from "../Modal/ModalDetail";
import Paginate from "../Paginate/Paginate";

import { Modal } from "../UI/Modal";

import { Spinner } from "../Logo/Spinner"

import { httpGetRequest } from "../../utils/fetch";

const DataTableProfile = ({ header, theaders, data, refreshData, isFetching }) => {
  const { user } = useSelector((state) => state);
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
    0: red,
    1: shamrock,
    2: gold,
    3: persianblue,
    4: carmine,
  };

  const handleClicked = (details) => {
    console.log(user.role == "client")
    console.log(details)
    setShowDetails(true);
    setDetails(details);
  };

  const handleClosedModal = () => {
    setShowDetails(false);
    refreshData();
  };

  const detailsModal = useMemo(
    () => {
      if (details && user.role === "admin") {
        return (
          <Modal show={showDetails}>
            <ModalContainer>
              <ModalDetail
                fullname={`${details["customers"].name} ${details["customers"].lastname}`}
                shareId={details["registrationNo"]}
                phoneNo={details["customers"].telephone}
                dropdownSelect={{
                  code: details["orders"].brokerId.code,
                  name: details["orders"].brokerId.name
                }}
                tradingAccountNo={details["orders"].accountNo}
                rightStockName={details["orders"].rightStockName}
                stockVolume={details["stockVolume"]}
                offerPrice={details["offerPrice"]}
                rightStockVolume={details.rightStockVolume}
                rightSpecialName={details["orders"].rightSpecialName}
                excessVolume={details["orders"].excessAmount}
                currentPrice={details["orders"].paymentAmount}
                optional1={Number(details["orders"].paidRightVolume) - (Number(details["orders"].excessAmount) / Number(details.offerPrice))}
                optional2={Number(details["orders"].excessAmount) / Number(details.offerPrice)}
                optional3={Number(details["orders"].paidRightVolume)}
                optional4={Number(details["orders"].paidRightVolume) /  Number(details.getRight)}
                depositBank={details["orders"].bankRefund}
                bank={details["orders"].bankRefundNo}
                hanlderOnBack={() => setShowDetails(false)}
                handlerOnAccept={() => setShowDetails(false)}
                isCheckRight={true}
              />
            </ModalContainer>
          </Modal>
        )
      } 
      // else if (details && user.role == "client") {
      //   return (
      //     <Details
      //       options={options}
      //       show={showDetails}
      //       closed={handleClosedModal}
      //       details={details}
      //     />
      //   )
      // }
    },
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
                <TH style={{ backgroundColor: "#F1F7FB" }} key={header}>
                  {header}
                </TH>
              ))}
            </TR>
          </THead>
          {
            isFetching ? (
              <TBody>
                <TR>
                  <TD><Spinner/></TD>
                  <TD><Spinner/></TD>
                  <TD><Spinner/></TD>
                  <TD><Spinner/></TD>
                  <TD><Spinner/></TD>
                  <TD><Spinner/></TD>
                  <TD><Spinner/></TD>
                </TR>
              </TBody> ) : (
                <TBody>
                  {data.map((x, index) => (
                    <TR key={index} onClick={() => handleClicked(x)}>
                      <TD style={{ width: "100px" }}>
                        จองซื้อ / Book
                      </TD>
                      <TD>{x["rightStockName"]}</TD>
                      <TD>{x["registrationNo"]}</TD>
                      <TD>{`${
                        x["customers"].name + " " + x["customers"].lastname
                      }`}</TD>
                      <TD>{x["stockVolume"]}</TD>
                      <TD>{x["rightStockVolume"]}</TD>
                      {x["status"].length > 0 ? (
                        x["status"].map((obj) => (
                          <TD color={color[obj["value"]]}>
                            {obj["status"]}
                          </TD>
                        ))
                      ) : (
                        <TD color={color[0]}>
                          ยังไม่ได้ดำเนินการ
                        </TD>
                      )}
                    </TR>
                  ))}
              </TBody>
            )
          }
        </Table>
      )}
      {showDetails && detailsModal}
    </Container>
  );
};

export default DataTableProfile;

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
  color: ${({ color }) => (color ? color : "#000000")};
  :not(:first-child) {
    padding: 5px 25px;
  }
`;

const Status = styled.td`
  color: ${({ color }) => (color ? color : "#000")};
  font-weight: bold;
  padding: 5px 20px;
`;

const ModalContainer = styled.div`
  height: 90vh;
  // width: 80vw;
  border-radius: 10px;
  border: 1px solid #d9e1e7;
  background: #FFFFFF;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;

  > * {
    margin: 10px 0;
  }

  .card-tag {
    display: flex;
    justify-content: space-between;
  }

  .text-title-end {
    width: 40%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .content-member {
    color: #809fb8;

    .content-detail-text {
      margin: 10px 0;
      display: flex;
      align-items: baseline;
    }

    .content-detail-condition {
      display: flex;
      text-align: center;

      .text-title {
        width: 100px;
      }
    }

    .content-detail-share {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      .text-title {
        width: 40%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      }
    }

    .text-black {
      color: #000000;
    }

    .text-amount {
      display: flex;
      justify-content: space-between;
      width: 40%;
      align-items: baseline;
    }
  }

  .buy-flex {
    width: 48%;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;

    .card-tag {
      display: inline;
    }
    .buy-flex {
      width: 100%;
    }

    .content-member {
      .content-detail-condition {
        display: block;
        text-align: center;

        .text-title {
          // width: 100%;
        }
      }

      // .content-detail-share {
      //   width: 100%;
      //   display: block;
      //   align-items: baseline;
  
      //   .text-title {
      //     width: 40%;
      //     display: flex;
      //     align-items: baseline;
      //     justify-content: space-between;
      //   }
      // }
    }

    .text-title-end {
      width: 100%;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    width: 90vw;

    .card-tag {
      display: inline;
    }
    
    .buy-flex {
      width: 100%;
    }
    .buy-flex {
      width: 100%;
    }

    .content-member {
      .content-detail-condition {
        display: block;
        text-align: center;

        .text-title {
          width: 100%;
        }
      }

      .content-detail-share {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
  
        .text-title {
          width: 50%;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
      }
  
    }

    .text-title-end {
      width: 50%;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
  }
`;
