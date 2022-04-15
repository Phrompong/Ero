import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";
import styled from "styled-components";
import { balihai, gold, ivory, persianblue } from "../../utils/color";
import { Card, LineCard } from "../UI/Card";
import { FlexContainer } from "../UI/FlexContainer";
import { Modal } from "../UI/Modal";
import { Button, OutlineButton } from "../UI/Button";

import change from "../../assets/icon_change.png";
import transaction from "../../assets/transaction.png";

const Container = styled.div`
  padding: 20px;
  position: relative;
  width: auto;

  p {
    font-size: 1rem;
  }

  > :nth-child(2) {
    margin-bottom: 20px;
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

  img {
    /* height: 250px; */
    width: 130px;
  }
`;

const Footer = styled(Div)`
  text-align: center;

  > :nth-child(2) {
    margin-left: 10px;
  }
`;

const Header = styled.h3`
  color: ${persianblue};
  margin-bottom: 20px;
  margin-left: 10px;
`;

const SubHeader = styled.h4`
  color: ${({ color }) => (color ? color : persianblue)};
  margin-bottom: 10px;
`;

const Details = ({ show, details, closed }) => {
  const info = (label, value) => (
    <FlexContainer>
      <p>{label}</p>
      <p>{value}</p>
    </FlexContainer>
  );
  return (
    <Modal show={show} modalClosed={closed}>
      {details && (
        <Card>
          <Container>
            <Header>ตรวจสอบข้อมูลการชำระเงิน / เปลี่ยนสถานะ</Header>
            <LineCard>
              <UserInfo>
                <SubHeader>ข้อมูลทั่วของผู้สั่งซื้อ</SubHeader>
                <div className="info">
                  {info("ชื่อ-นามสกุล / Name-Lastname   :", details["name"])}
                  {info("โทรศัพท์ / Telephone  :", details["phone"])}
                  {info("อีเมล์ / Email  :", details["email"])}
                  {info("หมายเลขบัญชี ATS :", details["ats"])}
                  {info("BANK ATS :", details["bank"])}
                </div>
                <Link>
                  <a href="">หากข้อมูลไม่ถูกต้องกรุณาคลิก</a>
                </Link>
              </UserInfo>
            </LineCard>
            <FlexContainer>
              <LineCard style={{ flex: 1 }}>
                <TransactionInfo>
                  <SubHeader>การสั่งซื้อหุ้นเพิ่มทุน</SubHeader>
                  <div className="transaction-details">
                    <div className="row">
                      <p className="text-box">STOWER</p>
                      <div className="num-box">{details["amount"]}</div>
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
                      <div className="num-box">{details["totalPrice"]}</div>
                      <p className="unit">บาท</p>
                    </div>
                  </div>
                  <SubHeader>สิทธิเพิ่มเติมที่ท่านได้รับ</SubHeader>
                  <div className="row">
                    <p>{details["extraOffer"].split(/(\s+)/)[0]}</p>
                    <BoldText>
                      {details["extraOffer"].split(/(\s+)/)[2]}
                    </BoldText>
                    <p className="unit">หุ้น</p>
                  </div>
                  <BoldText style={{ margin: "20px 0 5px 0" }}>
                    ซื้อเกินสิทธิเป็นเงิน 0 บาท
                  </BoldText>

                  <div className="row">
                    <SmallText>ส่งคำสั่งซื้อเมื่อ 22/4/2022</SmallText>
                    <SmallText>แนบหลักฐานการโอนเมื่อ 25/4/2022</SmallText>
                  </div>
                </TransactionInfo>
              </LineCard>
              <LineCard style={{ flex: 1 }}>
                <TransactionPhoto>
                  <img src={transaction} />
                </TransactionPhoto>
              </LineCard>
            </FlexContainer>
            <Footer>
              <OutlineButton>
                ยืนยันการชำระเงิน
                <span>
                  <Icon2 />
                </span>
              </OutlineButton>
              <Button>ยืนยันสถานะ</Button>
            </Footer>
          </Container>
        </Card>
      )}
    </Modal>
  );
};
export default Details;
