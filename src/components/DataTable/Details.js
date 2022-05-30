import { useEffect, useState, useMemo } from "react";

import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";
import styled from "styled-components";
import { balihai, carmine, gold, ivory, persianblue } from "../../utils/color";
import { Card, LineCard } from "../UI/Card";
import { FlexContainer } from "../UI/FlexContainer";
import { Modal } from "../UI/Modal";
import { Button, OutlineButton } from "../UI/Button";
import { Dropdown } from "../UI/Dropdown";

import change from "../../assets/icon_change.png";
import transaction from "../../assets/transaction.png";
import { httpGetRequest, httpPutRequest } from "../../utils/fetch";
import { format } from "date-fns";

const Details = ({ show, details, closed, options }) => {
  console.log(show);
  console.log(details);
  console.log(options);
  const [selectedStatus, setSelectedStatus] = useState(
    details["status"]["_id"]
  );

  const handleConfirmStatus = async () => {
    const orderId = details["_id"];
    const endpoint = `orders/${orderId}`;
    const body = {
      status: selectedStatus,
    };

    const [res, status] = await httpPutRequest(body, endpoint);
    if (status === 200) closed();
  };

  const info = (label, value) => (
    <FlexContainer style={{ marginBottom: 10 }}>
      <p>{label}</p>
      <p>{value}</p>
    </FlexContainer>
  );

  const customer = details["customerId"];

  console.log(details);

  const formatDate = (date) => {
    return date ? format(new Date(date), "dd/MM/yyyy") : "";
  };

  const formatTime = (date) => {
    return date ? format(new Date(date), "HH:mm:ss") : "";
  };

  const formatNumber = (number) => {
    return number
      ? Number(number)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "-";
  };

  return (
    <Modal show={show}>
      {details && (
        <Card>
          <Container>
            <Header>ตรวจสอบข้อมูลการชำระเงิน / เปลี่ยนสถานะ</Header>
            <LineCard>
              <UserInfo>
                <SubHeader>ข้อมูลทั่วของผู้สั่งซื้อ</SubHeader>
                <div className="info">
                  {info(
                    "ชื่อ-นามสกุล / Name-Lastname   :",
                    `${customer["name"]} ${customer["lastname"]} `
                  )}
                  {info(
                    "โทรศัพท์ / Telephone  :",
                    details["customerTel"] || "-"
                  )}
                  {info("อีเมล์ / Email  :", customer["email"] || "-")}
                  {info("หมายเลขบัญชี ATS :", customer["atsBankNo"] || "-")}
                  {info("BANK ATS :", customer["atsBank"] || "-")}
                </div>
              </UserInfo>
            </LineCard>
            <FlexContainer>
              <LineCard style={{ flex: 1 }}>
                <TransactionInfo>
                  <SubHeader>การสั่งซื้อหุ้นเพิ่มทุน</SubHeader>
                  <div className="transaction-details">
                    <div className="row">
                      <p className="text-box">{details["rightStockName"]}</p>
                      <div className="num-box">
                        {formatNumber(details["paidRightVolume"])}
                      </div>
                      <p className="unit">หุ้น</p>
                    </div>
                    <div className="row">
                      <div className="text-box" />
                      <div className="icon-to">
                        <Icon />
                      </div>
                      <img src={change} className="icon-change" />
                    </div>
                    <div className="row">
                      <p className="text-box">จำนวนเงิน</p>
                      <div className="num-box">
                        {formatNumber(details["paymentAmount"])}
                      </div>
                      <p className="unit">บาท</p>
                    </div>
                  </div>
                  <SubHeader>สิทธิเพิ่มเติมที่ท่านได้รับ</SubHeader>
                  <div className="row">
                    <p>{details["customerStock"]["rightSpecialName"]}</p>
                    <BoldText>
                      {details["customerStock"]["rightSpecialVolume"]}
                    </BoldText>
                    <p className="unit">หุ้น</p>
                  </div>
                  <BoldText style={{ margin: "20px 0 5px 0" }}>
                    ซื้อเกินสิทธิเป็นเงิน{" "}
                    {formatNumber(details["excessAmount"])} บาท
                  </BoldText>

                  <div className="row">
                    <SmallText>
                      {`วันที่โอนเงิน ${formatDate(details["paymentDate"])}`}
                      {console.log(details)}
                      {/* waiting for api */}
                    </SmallText>
                    <SmallText>
                      {`เวลาที่โอนเงิน ${formatTime(details["paymentDate"])}`}
                      {/* waiting for api */}
                    </SmallText>
                  </div>
                  <div className="row">
                    <SmallText>
                      {`ส่งคำสั่งซื้อเมื่อ ${formatDate(details["createdOn"])}`}
                    </SmallText>
                    <SmallText>
                      {`แนบหลักฐานการโอนเมื่อ ${formatDate(
                        details["attachedOn"]
                      )}`}
                    </SmallText>
                  </div>
                </TransactionInfo>
              </LineCard>
              <LineCard style={{ flex: 1 }}>
                <TransactionPhoto>
                  <img src={details["attachedFile"]} height="400px" />
                </TransactionPhoto>
              </LineCard>
            </FlexContainer>
            <Footer>
              <Dropdown
                options={options}
                setSelected={setSelectedStatus}
                selected={selectedStatus}
              />
              <Button onClick={() => handleConfirmStatus()}>ยืนยันสถานะ</Button>
              <Button background={carmine} onClick={closed}>
                ยกเลิกการยืนยันสถานะ
              </Button>
            </Footer>
          </Container>
        </Card>
      )}
    </Modal>
  );
};
export default Details;

const Container = styled.div`
  padding: 20px;
  position: relative;
  p {
    font-size: 1rem;
  }
  > :nth-child(2) {
    margin-bottom: 20px;
  }
  @media screen and (min-width: 1400px) {
    min-width: 1000px;
  }
`;

const Div = styled.div`
  padding: 10px;
`;

const UserInfo = styled(Div)`
  .info {
    p {
      padding: 2px 0;
      flex: 1;
    }
  }
`;

const Link = styled.div`
  a {
    text-decoration: underline;
    color: ${gold};
  }
  text-align: right;
  @media screen and (max-width: 540px) {
    text-align: left;
  }
`;

const Icon = styled(DownArrow)`
  width: 20px;
  margin: 5px 0;
  color: ${persianblue};
`;

const Icon2 = styled(DownArrow)`
  width: 15px;
  margin-left: 5px;
  color: #c4c4c4;
`;

const TransactionInfo = styled(Div)`
  flex-grow: 1;
  .transaction-details {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-to {
    width: 180px;
    text-align: center;
  }
  .text-box {
    width: 80px;
  }
  .unit,
  .icon-change {
    margin-right: 10px;
    width: 25px;
  }
  .num-box {
    width: 200px;
    text-align: center;
    padding: 7px 0;
    background: ${ivory};
    border: 1px solid ${balihai};
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

const BoldText = styled.p`
  font-weight: bold;
`;

const SmallText = styled.p`
  font-size: 0.8rem;
`;

const TransactionPhoto = styled(Div)`
  text-align: center;
  width: 100%;
  img {
    /* height: 250px; */
    width: 300px;
  }
`;

const Footer = styled(Div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  > :not(:nth-child(1)) {
    margin-left: 10px;
  }
  > * {
    margin-top: 10px;
  }
  .dropdown {
    width: 200px;
    background-color: pink;
  }
`;

const Header = styled.h3`
  color: ${persianblue};
  margin-bottom: 20px;
  margin-left: 10px;
  @media screen and (max-width: 540px) {
    /* font-size: 16px; */
    margin-left: 0;
  }
  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    margin-left: 0;
  }
`;

const SubHeader = styled.h4`
  color: ${({ color }) => (color ? color : persianblue)};
  margin-bottom: 10px;
`;
