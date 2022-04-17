import styled from "styled-components";
import { useState, useEffect } from "react";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";

import change from "../assets/icon_change.png";

import { Card } from "../components/UI/Card";
import { FlexContainer } from "../components/UI/FlexContainer";
import { Dropdown, DropdownSelect } from "../components/UI/Dropdown";
import { LineCard } from "../components/UI/Card";
import { FieldInput } from "../components/UI/Search";

import { balihai, ivory, persianblue } from "../utils/color";

const Buy = () => {
  const [page, setPage] = useState(1)

  // step 1
  const [shareName, setShareName] = useState(null)
  const [shareDescription, setShareDescription] = useState(null)
  const [fullname, setFullname] = useState(null)
  const [shareId, setShareId] = useState(null)
  const [holderAccountID, setHolderAccountID] = useState(null)
  const [phoneNo, setPhoneNo] = useState(null)
  const [accountID, setAccountID] = useState(null)
  const [shareOption, setShareOption] = useState([])

  const endpoint = 'http://134.209.108.248:3000'

  const fetchStep1 = () => {
    fetch(`${endpoint}/api/v1/masterCustomers/6258d347930c4c210c0f5b97`)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        const payload = json.data
        setFullname(`${payload.name} ${payload.lastname}`)
        setShareId(payload.id)
        setPhoneNo(`0${payload.telephone}`)
      })

    fetch(`${endpoint}/api/v1/masterBrokers`)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        const payload = json.data
        setShareOption(payload)
      })
  }

  useEffect(() => {
    setShareName('บมจ.สกาย ทาวเวอร์ (STOWER)')
    const desc = `บมจ.สกาย ทาวเวอร์ (STOWER) เปิดเผยว่า ที่ประชุมคณะกรรมการบริษัท ครั้งที่ 3/2565 เมื่อวันที่ 18 มี.ค.65 มีมติให้นำเสนอต่อที่ประชุมสามัญผู้ถือหุ้น ประจำปี 2565 เพื่อพิจารณาอนุมัติการออกและเสนอขายหุ้นสามัญเพิ่มทุนของบริษัทจำนวนไม่เกิน 17,979,717,949 หุ้นให้แก่ผู้ถือหุ้นเดิมตามสัดส่วนจำนวนหุ้น
    ที่ผู้ถือหุ้นแต่ละรายถือยู่ (Right Offering) ในอัตราส่วนการจัดสรร 1.5 หุ้นสามัญเดิมต่อ 1 หุ้นสามัญเพิ่มทุน โดยมีราคาเสนอขาย หุ้นละ 0.05 บาท พร้อมใบสำคัญแสดงสิทธิ STOWER -W4 ในอัตราส่วน 2.7 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
               และหุ้นสามัญเพิ่มทุนส่วนที่เหลือจาก Right Offering จะจัดสรรให้กับบุคคลในวงจำกัด พร้อมใบสำคัญแสดงสิทธิ STOWER-W4 ในอัตราส่วน 3 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
    `
    setShareDescription(desc)
    fetchStep1()
  }, [])

  return (
    <Card>
      <Container>
        <FlexContainer >
          <StepDiv>
            <div style={{ display: 'block', margin: '0 20px' }}>
              <Step isActive={page === 1} onClick={() => setPage(1)}><b>1</b><Line /></Step>
              <StepDetail>
                ขั้นตอนที่ 1 - ลงทะเบียนจองสิทธิ์
              </StepDetail>
            </div>
            <div style={{ display: 'block', margin: '0 20px' }}>
              <Step isActive={page === 2} onClick={() => setPage(2)}><b>2</b><Line /></Step>
              <StepDetail>
                ขั้นตอนที่ 2 - จัดการคำสั่งซื้อ
              </StepDetail>
            </div>
            <div style={{ display: 'block', margin: '0 20px' }}>
              <Step isActive={page === 3} onClick={() => setPage(3)}><b>3</b></Step>
              <StepDetail>
                ขั้นตอนที่ 3 - ชำระเงิน
              </StepDetail>
            </div>
          </StepDiv>
        </FlexContainer>
        <FlexContainer style={{ display: 'block', justifyContent: "flex-start" }}>
          {
            (() => {
              if (page === 1) {
                return (
                  <>
                    <LineCard style={{ width: '100%', marginBottom: '20px', paddingBottom: '30px' }}>
                      <Header>
                        <h3>ข้อมูลการเสนอขายหุ้นเพิ่มทุน</h3>
                        <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>{shareName}</h3>
                      </Header>
                      <Content>
                        <p style={{
                          color: '#1D3AB1',
                          fontWeight: 'bold'
                        }}>
                          ข้อมูลโดยสรุป
                        </p>
                        <div className="desc">
                          <p style={{ height: '157.4px' }}>
                            {shareDescription}
                          </p>
                        </div>
                      </Content>
                    </LineCard>
                    <LineCard style={{ width: '100%', paddingBottom: '20px' }}>
                      <Header>
                        <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>กรอกข้อมูลจองสิทธิ์</h3>
                      </Header>
                      <ContentSpace>
                        <InputDiv>
                          <div className="inputField">
                            <p>ชื่อ-นามสกุล</p>
                            <p>{fullname}</p>
                          </div>
                        </InputDiv>
                        <InputDiv>
                          <div className="inputField">
                            <p>เลขทะเบียนผู้ถือหุ้น</p>
                            <p>{shareId}</p>
                          </div>
                        </InputDiv>
                      </ContentSpace>
                      <Content>
                        <InputDiv>
                          <div className="inputField">
                            <p>เบอร์โทรศัพท์ที่สามารถติดต่อได้</p>
                            <p>{phoneNo}</p>
                          </div>
                        </InputDiv>
                      </Content>
                      <Header>
                        <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>รายละเอียดการจัดสรรหุ้น</h3>
                      </Header>
                      <Content>
                        <InputDiv>
                          <Dot />
                          <p>ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก</p>
                        </InputDiv>
                        <InputDiv style={{ marginTop: '20px', marginLeft: '50px' }}>
                          <DropdownSelect options={shareOption}/>
                        </InputDiv>
                        <InputDiv style={{ marginLeft: '50px' }}>
                          <p>เลขที่บัญชีซื้อขาย</p>
                        </InputDiv>
                        <InputDiv style={{ marginLeft: '50px' }}>
                          <FieldInput />
                        </InputDiv>
                      </Content>
                    </LineCard>
                  </>
                )
              }

              if (page === 2) {
                return (
                  <>
                    <div className="card-tag">
                      <LineCard style={{ width: '100%', marginBottom: '20px', paddingBottom: '30px' }}>
                        <Header>
                          <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>จำนวนหุ้นเดิมของท่าน</h3>
                        </Header>
                        <ShareDetail>
                          <p>STOWER</p>
                          <b>35,000</b>
                          <p>หุ้น</p>
                        </ShareDetail>
                      </LineCard>
                      <LineCard style={{ width: '100%', marginBottom: '20px', paddingBottom: '30px' }}>
                        <ShareDetail style={{ display: 'flex', top: '15px', position: 'relative' }}>
                          <Header>
                            <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>ราคาเสนอขายหุ้นละ</h3>
                          </Header>
                          <Header>
                            <h3>10.50</h3>
                          </Header>
                          <Header>
                            <h3>บาท</h3>
                          </Header>
                        </ShareDetail>
                      </LineCard>
                    </div>
                    <div className="card-tag">
                      <LineCard style={{ width: '100%', marginBottom: '20px', paddingBottom: '30px' }}>
                        <Header>
                          <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>สิทธิในการซื้อหุ้นเพิ่มทุนของท่าน</h3>
                        </Header>
                        <ShareDetail>
                          <p>STOWER</p>
                          <b>70,000</b>
                          <p>หุ้น</p>
                        </ShareDetail>
                        <ShareDetail style={{ fontSize: '14px', color: '#1D3AB1', fontWeight: 'bold' }}>
                          <p>เป็นจำนวนเงิน</p>
                          <b>735,000</b>
                          <p>บาท</p>
                        </ShareDetail>
                        <ShareDetail style={{ fontSize: '14px' }}>
                          <p>(การคำนวนจากราคาเสนอขาย 10.50 บาท ต่อ หุ้น)</p>
                        </ShareDetail>
                      </LineCard>
                      <LineCard style={{ width: '100%', marginBottom: '20px', paddingBottom: '30px' }}>
                        <Header>
                          <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>สิทธิเพิ่มเติม</h3>
                        </Header>
                        <ShareDetail>
                          <p>STOWER-W4</p>
                          <b>140,000</b>
                          <p>หุ้น</p>
                        </ShareDetail>
                      </LineCard>
                    </div>
                    <div className="card-tag">
                      <LineCard
                        style={{
                          width: '100%', marginBottom: '20px', paddingBottom: '30px',
                          border: '5px solid #1D3AB1', boxSizing: 'border-box', borderRadius: '10px'
                        }}>
                        <Header>
                          <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>การสั่งซื้อหุ้นเพิ่มทุนของท่าน</h3>
                        </Header>
                        <ShareDetail style={{ marginBottom: '-10px' }}>
                          <p>STOWER</p>
                          <div className="num-box" style={{ position: 'relative' }}>71,000</div>
                          {/* <div className="unit">หุ้น</div> */}
                          <p style={{ position: 'relative' }}>หุ้น</p>
                        </ShareDetail>
                        <ShareDetail>
                          <p></p>
                          <div className="num-box-hidden" style={{ position: 'relative' }}><Icon /></div>
                          {/* <div className="unit">หุ้น</div> */}
                          <p style={{ position: 'relative' }}>
                            <img src={change} className="icon-change" />
                          </p>
                        </ShareDetail>
                        <ShareDetail>
                          <p>จำนวนเงิน</p>
                          <div className="num-box">745,000</div>
                          <p>บาท</p>
                        </ShareDetail>
                        <Header>
                          <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>สิทธิเพิ่มเติมที่ท่านได้รับ</h3>
                        </Header>
                        <ShareDetail>
                          <p>STOWER-W4</p>
                          <b>140,000</b>
                          <p>หุ้น</p>
                        </ShareDetail>
                      </LineCard>
                      <div style={{ width: '100%' }}>
                        <LineCard
                          style={{
                            width: '100%', marginBottom: '20px', paddingBottom: '30px',
                            border: '1px solid #1D3AB1', boxSizing: 'border-box', borderRadius: '10px'
                          }}>
                          <Header>
                            <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>จำนวนหุ้นที่ท่านซื้อเกินสิทธิ์</h3>
                          </Header>
                          <ShareDetail>
                            <p>STOWER</p>
                            <b>1,000</b>
                            <p>หุ้น</p>
                          </ShareDetail>
                        </LineCard>
                        <LineCard
                          style={{
                            width: '100%', marginBottom: '20px', paddingBottom: '30px',
                            border: '1px solid #1D3AB1', boxSizing: 'border-box', borderRadius: '10px'
                          }}>
                          <Header>
                            <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>กรณีไม่ได้จัดสรรหุ้นส่วนที่เกินสิทธิ์ ขอให้โอนเงินเข้าบัญชี</h3>
                          </Header>
                          <ShareDetail style={{ display: 'block' }}>
                            <div className="input-div">
                              <InputDiv style={{ width: '100%' }}>
                                <p>ฝากเงินเข้าบัญชีธนาคาร</p>
                              </InputDiv>
                              <InputDiv style={{ marginTop: '20px', width: '100%' }}>
                                <FieldInput />
                              </InputDiv>
                            </div>
                            <div className="input-div">
                              <InputDiv style={{ width: '100%' }}>
                                <p>หมายเลขบัญชีธนาคาร</p>
                              </InputDiv>
                              <InputDiv style={{ marginTop: '20px', width: '100%' }}>
                                <FieldInput />
                              </InputDiv>
                            </div>
                          </ShareDetail>
                        </LineCard>
                        <LineCard style={{ width: '100%' }}>
                          <Button
                            type="submit"
                            value="ยืนยันคำสั่งซื้อ"
                          // onClick={handleSubmited}
                          />
                        </LineCard>
                      </div>
                    </div>
                  </>
                )
              }

              if (page === 3) {
                return (
                  <>
                    <LineCard style={{ width: '729px', margin: 'auto' }}>
                      <ShareDetail>
                        <b style={{ color: persianblue }}>ส่งหลักฐานการชำระเงิน</b>
                        <Button
                          type="submit"
                          value="ดูวิธีการชำระเงิน"
                          style={{ width: '20%', fontSize: '17px', color: '#000000', backgroundColor: '#EDB52D', height: '42px' }} />
                      </ShareDetail>
                      <ShareDetail>
                        <p>ท่านสามารถดำเนินการชำระเงินในการซื้อหุ้นเพิ่มทุนของท่านได้ที่</p>
                      </ShareDetail>
                      <ShareDetail style={{ fontSize: '22px' }}>
                        <b>ยอดที่ท่านต้องทำรายการ</b>
                        <b>745,500</b>
                        <b>บาท</b>
                      </ShareDetail>
                      <ShareDetail>
                        <div className="payment-image">
                          <img src='https://bit.ly/3JPQt8C' height={'105px'} width={'105px'} />
                          <div className="payment-detail">
                            <p>ธนาคารไทนพานิชย์</p>
                            <p>REF 1: 0000000</p>
                            <p>REF 2: XXXXX</p>
                          </div>
                        </div>
                        <img src='https://bit.ly/3JPQt8C' height={'200px'} width={'200px'} style={{ margin: 'auto' }} />
                      </ShareDetail>
                      <ShareDetail>
                        <Button
                          type="submit"
                          value="แนบหลักฐานการชำระเงิน"
                          style={{ width: '50%', fontSize: '17px', margin: 'auto', marginBottom: '20px', marginTop: '20px' }} />
                      </ShareDetail>
                    </LineCard>
                  </>
                )
              }
            })()
          }
        </FlexContainer>
      </Container>
    </Card >
  )
};

const Container = styled.div`
  padding: 20px 20px;
  height: 90vh;
  width: 70vw;
  display: flex;
  flex-direction: column;
  overflow: auto;

  > * {
    margin: 10px 0;
  }

  .card-tag {
    display: flex;
    justify-content: space-between;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;
    
    .card-tag {
      display: inline;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    width: 80vw;

    .card-tag {
      display: inline;
    }
  }
`;

const Step = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  text-align: center;
  display: flex;
  width: 60px;
  height: 60px;
  color: #fff;
  font-weight: 400;
  margin: auto;
  background: ${({ isActive }) => (isActive ? '#1D3AB1' : '#C4C4C4')};
  position: relative;
  font-size: 20px;
`

const StepDiv = styled.div`
  text-align: center;
  display: flex;
  background-color: transparent;
  border: 1px solid transparent;
  float: left;
  margin: auto;
`

const InputDiv = styled.div`
  margin: 10px 0;

  .inputField {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;

    p {
      position: relative;
      margin: 0 10px;
    }
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    .inputField {
      display: block;
      width: 100%;
  
      p {
        position: static;
      }
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

const Line = styled.hr`
  width: 10em;
  position: absolute;
  top: 20px;
  left: 90px;
  background: #C4C4C4;
`

const StepDetail = styled.p`
  font-style: bold;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  width: 300px;

  text-align: center;
  color: #000000;
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
  clear: both;
`

const Spacer = styled.div`

  margin: 0px 20px 5px 50px;
`

const Header = styled.div`
  margin: 10px;
  h3 {
    font-weight: 400;
  } 

  /* For Mobile */
  @media screen and (max-width: 540px) {
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Content = styled.div`
  margin: 0 10px;
  .desc {
    font-size: 17px;
    overflow-y: scroll;
    scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
  }
  p {
    font-size: 17px;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    display: flex;
    justify-content: space-between;
  }
`

const ContentSpace = styled.div`
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
  .desc {
    font-size: 17px;
    overflow-y: scroll;
    scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
  }
  p {
    font-size: 17px;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    display: block;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    display: block;
  }
`

const ShareDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px;

  .payment-detail {
    margin: auto;
    display: block;
  }

  .payment-image {
    display: flex;
    margin: auto;
  }

  .input-div {
    display: flex;
    justify-content: space-between;
    
    p {
      margin-top: 10px;
    }

    @media screen and (max-width: 540px) {
      display: block;

      p {
        margin-top: 0;
      }
    }
  
    /* For Tablets */
    @media screen and (min-width: 540px) and (max-width: 880px) {
      display: block;

      p {
        margin-top: 0;
      }
    }
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

    @media screen and (max-width: 540px) {
      width: 150px;
    }
  
    /* For Tablets */
    @media screen and (min-width: 540px) and (max-width: 880px) {
      width: 180px;
    }
  }

  .num-box-hidden {
    width: 200px;
    text-align: center;
    padding: 7px 0;
    font-size: 1.1rem;
    font-weight: bold;

    @media screen and (max-width: 540px) {
      width: 150px;
    }
  
    /* For Tablets */
    @media screen and (min-width: 540px) and (max-width: 880px) {
      width: 180px;
    }
  }

  .unit {
    margin-right: 10px;
    width: 25px;
  }

  .icon-change {
    width: 20px;
    margin-top: 10px;
    // margin-right: 10px;
    // position: absolute;
    // top: 5px;
    // right: -12px;
  }
`

const Icon = styled(DownArrow)`
  color: ${persianblue};
  margin-top: 10px;
  position: relative;
  left: 30px;

  width: 20px;
  text-align: center;

  @media screen and (max-width: 540px) {
    left: 27.5px;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    // width: 180px;
  }
`;

export default Buy;
