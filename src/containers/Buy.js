import styled from "styled-components";
import { useState, useEffect } from "react"; 
import { Row, Col } from 'react-grid-system'

import { Card } from "../components/UI/Card";

const Container = styled.div`
  padding: 20px;
  height: 80vh;
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  // .step {
  //   @media (max-width: 1600px) {
  //     display: none;
  //   }
  // }
`;

const Step = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  text-align: center;
  display: flex;
  // width: 95px;
  // height: 95px;
  width: 2em;
  height: 2em;
  color: #fff;
  // font-size: 39px;
  font-size: 2vw;
  margin: auto;
  background: ${({ isActive }) => (isActive ? '#1D3AB1' : '#C4C4C4' )};
`

const Line = styled.hr`
  width: 7.5em;
  margin: -30px -30px 20px -30px;
  background: #C4C4C4;
  // @media (max-width: 1600px) {
  //   display: none;
  // }
`

const StepDetail = styled.div`
  font-style: bold;
  font-weight: 700;
  font-size: 1.5vw;
  line-height: 32px;

  text-align: center;
  margin-top: 20px;
`

const Detail = styled.div`
  flex-basis: 100%;
  border: 1px solid #D9E1E7;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 15px;
  margin: 1em;

  .title {
    font-family: 'Segoe UI';
    font-style: normal;
    font-size: 1.5vw;
    line-height: 32px;

    span {
      color: #1D3AB1;
      font-weight: bold;
    }
  }

  .title-contact {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5vw;
    line-height: 32px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #1D3AB1;
  }

  .detail {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 500;
    font-size: 1.25vw;
    line-height: 23px;
    color: #1D3AB1;
    position: relative;
    height: 160px;

    p {
      padding-top: 10px;
      text-indent: 20px;
      color: #000000;
      white-space: pre-line;
      font-weight: 400;
      height: 130px;
      overflow-y: scroll;
      scrollbar-color: rebeccapurple green;
      scrollbar-width: thin;
    }
  }

  .contact {
    font-weight: 400;
    font-size: 1.25em;
    line-height: 32px;
    
    // display: flex;
    // justify-content: space-between;
  }

  .share {
    font-family: 'Segoe UI';
    font-style: normal;
    font-size: 1.25em;
    line-height: 32px;
    
    position: relative;
  }
`

const Button = styled.button`
  width: 5vw;
  height: 40px;
  background-color: #1D3AB1;
  color: #fff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 17px;
  font-weight: 400;
  border-radius: 10px;
  text-transform: capitalize;
  cursor: pointer;

  position: absolute;
  right:    0;
  bottom:   0;
`;

const Dot = styled.div`
  width: 34px;
  height: 34px;
  background: #1D3AB1;
  border: 5px solid #B8B8B8;
  box-sizing: border-box;
  border-radius: 100%;

  margin: 0px 20px 5px 0px;
  float: left;
`

const Select = styled.select`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 32px;
  margin: 10px 0px 10px 0px;
  width: 80%;
  background: #FFFFFF;
  border: 1px solid rgba(217, 225, 231, 0.8);
  box-sizing: border-box;
  border-radius: 10px;
`

const Input = styled.input`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 1.25em;
  line-height: 32px;
  // margin: 10px 0px 10px 0px;
  width: 80%;
  background: #FFFFFF;
  border: 1px solid rgba(217, 225, 231, 0.8);
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0px 20px 0px 20px;
`

const Spacer = styled.div`
  width: 34px;
  height: 34px;

  margin: 0px 20px 5px 0px;
  float: left;
`

const Buy = () => {
  const [page, setPage] = useState(1)
  const [shareName, setShareName] = useState(null)
  const [shareDescription, setShareDescription] = useState(null)
  const [fullname, setFullname] = useState(null)
  const [holderAccountID, setHolderAccountID] = useState(null)
  const [phoneNo, setPhoneNo] = useState(null)
  const [accountID, setAccountID] = useState(null)

  useEffect(() => {
    setShareName('บมจ.สกาย ทาวเวอร์ (STOWER)')
    const desc = `บมจ.สกาย ทาวเวอร์ (STOWER) เปิดเผยว่า ที่ประชุมคณะกรรมการบริษัท ครั้งที่ 3/2565 เมื่อวันที่ 18 มี.ค.65 มีมติให้นำเสนอต่อที่ประชุมสามัญผู้ถือหุ้น ประจำปี 2565 เพื่อพิจารณาอนุมัติการออกและเสนอขายหุ้นสามัญเพิ่มทุนของบริษัทจำนวนไม่เกิน 17,979,717,949 หุ้นให้แก่ผู้ถือหุ้นเดิมตามสัดส่วนจำนวนหุ้น
    ที่ผู้ถือหุ้นแต่ละรายถือยู่ (Right Offering) ในอัตราส่วนการจัดสรร 1.5 หุ้นสามัญเดิมต่อ 1 หุ้นสามัญเพิ่มทุน โดยมีราคาเสนอขาย หุ้นละ 0.05 บาท พร้อมใบสำคัญแสดงสิทธิ STOWER -W4 ในอัตราส่วน 2.7 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
               และหุ้นสามัญเพิ่มทุนส่วนที่เหลือจาก Right Offering จะจัดสรรให้กับบุคคลในวงจำกัด พร้อมใบสำคัญแสดงสิทธิ STOWER-W4 ในอัตราส่วน 3 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
    `
    setShareDescription(desc)
  }, [])

  return (
    <Card>
      <Container>
        <div className="step">
          <Step isActive={page === 1} onClick={() => setPage(1)}>1</Step>
          <StepDetail>
            ขั้นตอนที่ 1 - ลงทะเบียนจองสิทธิ์
          </StepDetail>
        </div>
        <Line/>
        <div className="step">
          <Step isActive={page === 2} onClick={() => setPage(2)}>2</Step>
          <StepDetail>
            ขั้นตอนที่ 2 - จัดการคำสั่งซื้อ
          </StepDetail>
        </div>
        <Line/>
        <div className="step">
          <Step isActive={page === 3} onClick={() => setPage(3)}>3</Step>
          <StepDetail>
            ขั้นตอนที่ 3 - ชำระเงิน
          </StepDetail>
        </div>
        
        <Detail>
          <div className="title">
            <Row>
              <Col xl={4} lg={12}>
                ข้อมูลการเสนอขายหุ้นเพิ่มทุน
              </Col>
              <Col xl={8} lg={12}>
                <span>{shareName}</span>
              </Col>
            </Row>
          </div>
          <div className="detail">
            ข้อมูลโดยสรุป
            <p>
              {shareDescription}
            </p>
          </div>
        </Detail>
        <Detail>
          <div className="title-contact">
            กรอกข้อมูลจองสิทธิ์
          </div>
          <div className="contact">
            <Row>
              <Col xl={3} lg={6}>
                ชื่อ-นามสกุล
              </Col>
              <Col xl={3} lg={6}>
                <Input value={fullname} onChange={(e) => setFullname(e.target.value)}/>
              </Col>
              <Col xl={3} lg={6}>
              เลขทะเบียนผู้ถือหุ้น
              </Col>
              <Col xl={3} lg={6}>
                <Input value={holderAccountID} onChange={(e) => setHolderAccountID(e.target.value)}/>
              </Col>
            </Row>
          </div>
          <div className="contact">
            <Row>
              <Col xl={3} lg={6}>
              เบอร์โทรศัพท์ที่สามารถติดต่อได้
              </Col>
              <Col xl={3} lg={6}>
                <Input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
              </Col>
            </Row>
          </div>
          <div className="title-contact">
            รายละเอียดจัดสรรหุ้น
          </div>
          <div className="share">
            <Row>
              <Col xl={12}>
                <Col xl={12}>
                  <Dot/>
                  ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก
                </Col>
                <Col xl={12}>
                  <Select>
                    <option>005 บริษัทหลักทรัพย์ แลน แอน เฮ้าส  จำกัด (มหาชน)</option>
                  </Select>
                </Col>
                <Col xl={12}>
                 <Spacer/>
                เลขที่บัญชีซื้อขาย
                </Col>
                <Col xl={12}>
                  <Input value={accountID} onChange={(e) => setAccountID(e.target.value)}/>
                </Col>
              </Col>
            </Row>
          </div>
        </Detail>
        <Spacer/>
      </Container>
    </Card>
  )
};
export default Buy;
