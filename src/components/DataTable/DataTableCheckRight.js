import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ModalAlert } from "../../components/ModalAlert/ModalAlert";
import { httpPutRequest, httpPatchRequest } from "../../utils/fetch";
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
import { Button } from "../../components/UI/Button";
import { Spinner } from "../Logo/Spinner";
import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { InfoCircle } from "@styled-icons/bootstrap/InfoCircle";

import { httpGetRequest } from "../../utils/fetch";
const DataTableProfile = ({
  header,
  theaders,
  data,
  refreshData,
  isFetching,
}) => {
  const [alertMessage, setAlertMessage] = useState();
  const { user } = useSelector((state) => state);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState();
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState();

  const [verifyOrder, setVerifyOrder] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const fetchData = async () => {
    const endpoint = "status";
    const [res, status] = await httpGetRequest(endpoint);
    handleFetchStatusOption(res);
  };

  useEffect(() => {
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
    setShowDetails(true);
    if (Object.prototype.hasOwnProperty.call(details["orders"], "isCheck")) {
      setVerifyOrder(details["orders"].isCheck ? 1 : 2);
    }
    setDetails(details);
  };

  const formatNumber = (number) => {
    return Number(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    setVerifyOrder(0);
  }, [showDetails]);

  useEffect(() => {
    if (isSubmit) {
      isPatchData(verifyOrder);
      setIsSubmit(false);
    }
  }, [isSubmit]);

  const handleOnUpdate = async () => {
    setIsSubmit(true);
  };

  const isPatchData = async (isVerifyOrder) => {
    const orderId = details["orders"]._id;

    const endpoint = `orders/${orderId}`;

    const [res, status] = await httpPatchRequest(
      { isCheck: Number(isVerifyOrder) === 1 ? true : false },
      endpoint
    );
    if (status === 200) {
      setStatus(200);
      setAlertMessage("บันทึกสำเร็จ");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setShowDetails(false);
        refreshData();
      }, 2000);
    } else {
      setStatus(400);
      setAlertMessage("บันทึกไม่สำเร็จสำเร็จ");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  };

  const detailsModal = useMemo(() => {
    if (details && user.role === "admin") {
      return (
        <Modal show={showDetails}>
          <ModalContainer>
            <ModalDetail
              fullname={`${details["customers"].name} ${details["customers"].lastname}`}
              shareId={details["registrationNo"]}
              phoneNo={
                details["customers"].telephone
                  ? details["customers"].telephone
                  : Object.keys(details["orders"]).length > 0
                  ? details["orders"].customerTel
                  : "-"
              }
              dropdownSelect={{
                code:
                  Object.keys(details["orders"]).length > 0
                    ? details["orders"].brokerId
                      ? details["orders"].brokerId.code
                      : "-"
                    : "-",
                name:
                  Object.keys(details["orders"]).length > 0
                    ? details["orders"].brokerId
                      ? details["orders"].brokerId.name
                      : "-"
                    : "-",
              }}
              tradingAccountNo={
                Object.keys(details["orders"]).length > 0
                  ? details["orders"].accountNo
                  : "-"
              }
              rightStockName={
                Object.keys(details["orders"]).length > 0
                  ? details["orders"].rightStockName
                  : "-"
              }
              stockVolume={details["stockVolume"]}
              offerPrice={details["offerPrice"]}
              rightStockVolume={details.rightStockVolume}
              rightSpecialName={
                Object.keys(details["orders"]).length > 0
                  ? details["orders"].rightSpecialName
                  : "-"
              }
              excessVolume={
                Object.keys(details["orders"]).length > 0
                  ? details["orders"].excessAmount
                  : "-"
              }
              currentPrice={
                Object.keys(details["orders"]).length > 0
                  ? details["orders"].paymentAmount
                  : "-"
              }
              optional1={
                Object.keys(details["orders"]).length > 0
                  ? Number(details["orders"].rightVolume)
                  : "-"
              }
              optional2={
                Object.keys(details["orders"]).length > 0
                  ? Number(details["orders"].moreThanVolume)
                  : "-"
              }
              optional3={
                Object.keys(details["orders"]).length > 0
                  ? Number(details["orders"].allVolume)
                  : "-"
              }
              optional4={
                Object.keys(details["orders"]).length > 0
                  ? Number(details["orders"].warrantList)
                  : "-"
              }
              depositBank={
                Object.keys(details["orders"]).length > 0
                  ? details["orders"].bankRefund
                  : "-"
              }
              bank={
                Object.keys(details["orders"]).length > 0
                  ? details["orders"].bankRefundNo
                  : "-"
              }
              hanlderOnBack={() => setShowDetails(false)}
              handlerOnAccept={() => {
                setShowDetails(false);
              }}
              isCheckRight={true}
              checkRightStatus={details["status"]}
              verifyOrder={verifyOrder}
              setVerifyOrder={(e) => setVerifyOrder(e)}
              submitVerify={handleOnUpdate}
              bookbankImage={details["orders"].attachedFileBookBank}
            />
          </ModalContainer>
        </Modal>
      );
    }
  }, [details, showDetails]);

  return (
    <Container>
      <ModalAlert show={show} msg={alertMessage} status={status} />
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
          {isFetching ? (
            <TBody>
              <TR>
                <TD>
                  <Spinner />
                </TD>
                <TD>
                  <Spinner />
                </TD>
                <TD>
                  <Spinner />
                </TD>
                <TD>
                  <Spinner />
                </TD>
                <TD>
                  <Spinner />
                </TD>
                <TD>
                  <Spinner />
                </TD>
                <TD>
                  <Spinner />
                </TD>
                <TD>
                  <Spinner />
                </TD>
              </TR>
            </TBody>
          ) : (
            <TBody>
              {data.map((x, index) => (
                <TR key={index}>
                  <TD style={{ width: "100px" }}>จองซื้อ / Book</TD>
                  <TD>{x["rightStockName"]}</TD>
                  <TD>{x["registrationNo"]}</TD>
                  <TD>{x["customers"].refNo}</TD>
                  <TD>{`${
                    x["customers"].name + " " + x["customers"].lastname
                  }`}</TD>
                  <TD>{formatNumber(x["stockVolume"])}</TD>
                  <TD>{formatNumber(x["rightStockVolume"])}</TD>
                  {x["status"].length > 0 ? (
                    x["status"].map((obj) => (
                      <TD color={color[obj["value"]]}>{obj["status"]}</TD>
                    ))
                  ) : (
                    <TD color={color[0]}>ยังไม่ได้ดำเนินการ</TD>
                  )}
                  <TD
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Button
                      style={{
                        width: "100px",
                        background: x["status"].length > 0 ? "gray" : "",
                      }}
                      disabled={x["status"].length > 0 ? true : false}
                      onClick={() => {
                        // * Clear localstorage
                        localStorage.clear();

                        // * Set customerId
                        localStorage.setItem("customerId", x["customerId"]);

                        // * Set orderId
                        localStorage.setItem("orderId", x["_id"]);

                        window.open(`/buy?event=add`);
                      }}
                    >
                      จองซื้อ
                    </Button>
                    {/* <InfoCircle
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      key={index}
                      onClick={() => handleClicked(x)}
                    ></InfoCircle> */}
                  </TD>
                </TR>
              ))}
            </TBody>
          )}
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
  background: #ffffff;
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
