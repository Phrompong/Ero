import styled from "styled-components";
import { useState, useEffect } from "react";
import { Row, Col, Container } from 'react-grid-system'

import { Card } from "../components/UI/Card";

import { persianblue } from "../utils/color";

// const Container = styled.div`
//   padding: 20px;
//   height: 80vh;
//   // width: 70vw;
//   display: table;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;

//   // .step {
//   //   @media (max-width: 1600px) {
//   //     display: none;
//   //   }
//   // }
// `;

const Step = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  text-align: center;
  display: flex;
  width: 2em;
  height: 2em;
  color: #fff;
  font-size: 2vw;
  margin: auto;
  background: ${({ isActive }) => (isActive ? '#1D3AB1' : '#C4C4C4')};
`

const Line = styled.hr`
  width: 10em;
  margin: -30px -30px 20px -30px;
  position: absolute;
  right: 0;
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
  margin: 1em 0;

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
    margin-top: 2.5px;
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

  .label {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: 1.5em;

    span {
      font-style: bold;
      color: #000000;
    }
  }

  .dot {
    width: 50px;
    height: 50px;
    position: absolute;
    border-radius: 100%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    margin: auto;
    z-index: 10;

    .arrow-down {
      width: 0; 
      height: 0; 
      margin-top: 10px;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      z-index: 11;
      border-top: 25px solid #1D3AB1;
    }
  }
`

const Button = styled.input`
  width: 100%;
  height: 54px;
  background-color: ${persianblue};
  color: #fff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.25em;
  font-weight: 700;
  border-radius: 10px;
  text-transform: capitalize;
  cursor: pointer;
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
  font-weight: bold;
  font-size: 1em;
  line-height: 32px;
  width: 100%;
  padding: 0px 20px;
  text-align: center;
  background: #FDFDFA;
  border: 1px solid #809FB8;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
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
      <Container fluid>
        <Row>
          <Col xl={4}>
            <div className="step">
              <Step isActive={page === 1} onClick={() => setPage(1)}><b>1</b></Step>
              <Line />
              <StepDetail>
                ขั้นตอนที่ 1 - ลงทะเบียนจองสิทธิ์
              </StepDetail>
            </div>
          </Col>
          <Col xl={4}>
            <div className="step">
              <Step isActive={page === 2} onClick={() => setPage(2)}><b>2</b></Step>
              <Line />
              <StepDetail>
                ขั้นตอนที่ 2 - จัดการคำสั่งซื้อ
              </StepDetail>
            </div>
          </Col>
          <Col xl={4}>
            <div className="step">
              <Step isActive={page === 3} onClick={() => setPage(3)}><b>3</b></Step>
              <StepDetail>
                ขั้นตอนที่ 3 - ชำระเงิน
              </StepDetail>
            </div>
          </Col>
        </Row>

        {
          (() => {
            if (page === 1) {
              return (
                <>
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
                          <Input value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </Col>
                        <Col xl={3} lg={6}>
                          เลขทะเบียนผู้ถือหุ้น
                        </Col>
                        <Col xl={3} lg={6}>
                          <Input value={holderAccountID} onChange={(e) => setHolderAccountID(e.target.value)} />
                        </Col>
                      </Row>
                    </div>
                    <div className="contact">
                      <Row>
                        <Col xl={3} lg={6}>
                          เบอร์โทรศัพท์ที่สามารถติดต่อได้
                        </Col>
                        <Col xl={3} lg={6}>
                          <Input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
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
                            <Dot />
                            ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก
                          </Col>
                          <Col xl={12}>
                            <Select>
                              <option>005 บริษัทหลักทรัพย์ แลน แอน เฮ้าส  จำกัด (มหาชน)</option>
                            </Select>
                          </Col>
                          <Col xl={12}>
                            <Spacer />
                            เลขที่บัญชีซื้อขาย
                          </Col>
                          <Col xl={12}>
                            <Input value={accountID} onChange={(e) => setAccountID(e.target.value)} style={{ width: '80%' }} />
                          </Col>
                        </Col>
                      </Row>
                    </div>
                  </Detail>
                  <Spacer />
                </>
              )
            }

            if (page === 2) {
              return (
                <>
                  <Row>
                    <Col xl={6}>
                      <Detail style={{ height: '109px', top: '50%' }}>
                        <Row style={{ display: 'block', marginBottom: '2rem', display: 'block' }}>
                          <Col xl={12}>
                            <div className="title-contact">
                              จำนวนหุ้นเดิมของท่าน
                            </div>
                          </Col>
                          <div className="label">
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <p>STOWER</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <b>35,000</b>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>หุ้น</p>
                            </Col>
                          </div>
                        </Row>
                      </Detail>
                    </Col>
                    <Col xl={6}>
                      <Detail style={{ height: '109px' }}>
                        <Row justify="between" style={{ marginBottom: '2rem', display: 'block' }}>
                          <div className="label" style={{ display: 'flex', top: '25px', position: 'relative' }}>
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <div className="title-contact">
                                ราคาเสนอหุ้นละ
                              </div>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>10.50</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>บาท</p>
                            </Col>
                          </div>
                        </Row>
                      </Detail>
                    </Col>
                    <Col xl={6}>
                      <Detail style={{ height: '155px' }}>
                        <Row style={{ display: 'block' }}>
                          <Col xl={12}>
                            <div className="title-contact">
                              สิทธิในการซื้อหุ้นเพิ่มทุนของท่าน
                            </div>
                          </Col>
                          <div className="label">
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <p>STOWER</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <b>70,000</b>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>หุ้น</p>
                            </Col>
                          </div>
                          <div className="label" style={{ color: '#1D3AB1', fontSize: '1em' }}>
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <b>เป็นจำนวนเงิน</b>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <b>735,000</b>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <b>บาท</b>
                            </Col>
                          </div>
                          <div className="label" style={{ fontSize: '1em' }}>
                            <Col style={{ textAlign: 'start' }}>
                              <p>
                                (การคำนวนจากราคาเสนอขาย 10.50 บาท ต่อ หุ้น)
                              </p>
                            </Col>
                          </div>
                        </Row>
                      </Detail>
                    </Col>
                    <Col xl={6}>
                      <Detail style={{ height: '155px' }}>
                        <Row justify="between" style={{ marginBottom: '2rem', display: 'block' }}>
                          <Col xl={12}>
                            <div className="title-contact">
                              สิทธิเพิ่มเติม
                            </div>
                          </Col>
                          <div className="label">
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <p>STOWER-W4</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p style={{ fontWeight: 'bold' }}>140,000</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>หุ้น</p>
                            </Col>
                          </div>
                        </Row>
                      </Detail>
                    </Col>
                    <Col xl={6}>
                      <Detail style={{ height: '343px', border: '5px solid #1D3AB1' }}>
                        <Row justify="between" style={{ marginBottom: '2rem', display: 'block' }}>
                          <Col xl={12}>
                            <div className="title-contact">
                              การสั่งซื้อหุ้นเพิ่มทุนของท่าน
                            </div>
                          </Col>
                          <div className="label">
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <p>STOWER</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <Input value={'71,000'} onChange={(e) => setFullname(e.target.value)} style={{ width: '100%', marginLeft: '2rem' }} />
                              <div className="dot arrow-down" style={{ left: '135px', top: '28px' }}>
                                <div className="arrow-down">
                                </div>
                              </div>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>หุ้น</p>
                            </Col>
                          </div>
                        </Row>
                        {/* Button */}
                        <Row justify="between" style={{ marginBottom: '2rem', display: 'block' }}>
                          <div className="label">
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <p>จำนวนเงิน</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <Input value={'745,500'} onChange={(e) => setFullname(e.target.value)} style={{ width: '100%', marginLeft: '2rem' }} />
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>หุ้น</p>
                            </Col>
                          </div>
                        </Row>
                        <Row style={{ display: 'block' }}>
                          <Col xl={12}>
                            <div className="title-contact">
                              สิทธิเพิ่มเติมที่ท่านได้รับ
                            </div>
                          </Col>
                          <div className="label">
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <p>STOWER-W4</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>140,000</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>หุ้น</p>
                            </Col>
                          </div>
                        </Row>
                      </Detail>
                    </Col>
                    <Col xl={6}>
                      <Detail style={{ height: '103px', border: '1px solid #1D3AB1' }}>
                        <Row justify="between" style={{ marginBottom: '2rem', display: 'block' }}>
                          <Col xl={12}>
                            <div className="title-contact">
                              จำนวนหุ้นที่ท่านซื้อเกินสิทธิ์
                            </div>
                          </Col>
                          <div className="label">
                            <Col xl={4} style={{ textAlign: 'start' }}>
                              <p>STOWER</p>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <b>1,000</b>
                            </Col>
                            <Col xl={4} style={{ textAlign: 'end' }}>
                              <p>หุ้น</p>
                            </Col>
                          </div>
                        </Row>
                      </Detail>
                      <Detail style={{ height: '144px', border: '1px solid #1D3AB1' }}>
                        <Row justify="between" style={{ marginBottom: '2rem', display: 'block' }}>
                          <Col xl={12}>
                            <div className="title-contact" style={{ fontSize: '1.25vw' }}>
                              กรณีไม่ได้จัดสรรหุ้นส่วนที่เกินสิทธิ์ ขอให้โอนเงินเข้าบัญชี
                            </div>
                          </Col>
                          <div className="label" style={{ marginBottom: '0.5rem' }}>
                            <Col xs={6} style={{ textAlign: 'start' }}>ฝากเงินเข้าบัญชีธนาคาร</Col>
                            <Col xs={6} style={{ textAlign: 'start' }}>
                              <Input value={fullname} onChange={(e) => setFullname(e.target.value)} />
                            </Col>
                          </div>
                          <div className="label">
                            <Col xs={6} style={{ textAlign: 'start' }}>หมายเลขบัญชีธนาคาร</Col>
                            <Col xs={6} style={{ textAlign: 'start' }}>
                              <Input value={fullname} onChange={(e) => setFullname(e.target.value)} />
                            </Col>
                          </div>
                        </Row>
                      </Detail>
                      <Button
                        type="submit"
                        value="ยืนยันคำสั่งซื้อ"
                      // onClick={handleSubmited}
                      />
                    </Col>
                  </Row>
                </>
              )
            }

            if (page === 3) {
              return (
                <>
                  <Row>
                    <Col xl={12}>
                      <Detail style={{ width: '800px', margin: 'auto', marginTop: '40px', marginBottom: '40px' }}>
                        <Row justify="between">
                          <Col xl={6} style={{ textAlign: 'start' }}>
                            <div className="title-contact" style={{ fontSize: '17px' }}>
                              ส่งหลักฐานการชำระเงิน
                            </div>
                          </Col>
                          <Col xl={6} style={{ textAlign: 'end' }}>
                            <Button
                              type="submit"
                              value="ดูวิธีการชำระเงิน"
                              style={{ width: '40%', fontSize: '17px', color: '#', backgroundColor: '#EDB52D', height: '42px' }}
                            // onClick={handleSubmited}
                            />
                          </Col>
                          <Col xl={12} style={{ margin: '20px 0px' }}>
                            <p style={{ fontSize: '21px' }}>ท่านสามารถดำเนินการชำระเงินในการซื้อหุ้นเพิ่มทุนของท่านได้ที่</p>
                          </Col>
                          <Col xl={6}>
                            <b style={{ fontSize: '29px' }}>ยอดที่ท่านต้องทำรายการ</b>
                          </Col>
                          <Col xl={4} style={{ textAlign: 'start' }}>
                            <b style={{ fontSize: '29px' }}>745,000</b>
                          </Col>
                          <Col xl={2} style={{ textAlign: 'end' }}>
                            <b style={{ fontSize: '29px' }}>บาท</b>
                          </Col>
                        </Row>
                        <Row justify="between" style={{ margin: '20px 0px' }}>
                          <Col xl={6}>
                            <Row style={{ position: 'relative', top: '50px' }}>
                              <Col xl={6} style={{ textAlign: 'end' }}>
                                <img src='https://bit.ly/3JPQt8C' height={'105px'} width={'105px'} />
                              </Col>
                              <Col xl={6}>
                                <Row style={{ position: 'relative', top: '20px' }}>
                                  <Col xl={12}><p>ธนาคารไทนพานิชย์</p></Col>
                                  <Col xl={12}><p>REF 1: 0000000</p></Col>
                                  <Col xl={12}><p>REF 2: XXXXX</p></Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={6}>
                            <img src='https://bit.ly/3JPQt8C' height={'200px'} width={'200px'} />
                          </Col>
                          <Col xl={12} style={{ textAlign: 'center' }}>
                            <Button
                              type="submit"
                              value="แนบหลักฐานการชำระเงิน"
                              style={{ width: '50%', fontSize: '17px', margin: '40px 0px 20px 0px' }}
                            // onClick={handleSubmited}
                            />
                          </Col>
                        </Row>
                      </Detail>
                    </Col>
                  </Row>
                </>
              )
            }
          })()
        }

      </Container>
    </Card>
  )
};
export default Buy;
