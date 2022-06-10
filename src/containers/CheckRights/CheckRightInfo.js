import styled from "styled-components";
import logo from "../../assets/icon_logo.png";
import { Button } from "../../components/UI/Button";
import { Card } from "../../components/UI/Card";
import { InputSearch } from "../../components/UI/Input";
import { persianblue } from "../../utils/color";
import { useState, useEffect, useRef } from "react";
import { httpGetRequest } from "../../utils/fetch";
import { useDispatch, useSelector } from "react-redux";

import { DropdownArrow } from "../../components/UI/Dropdown";

const Container = styled.div`
  padding: 30px 20px;
  display: flex;
  height: 90vh;
  width: 80vw;
  // justify-content: center;
  flex-direction: column;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
`;

const Header = styled.h2`
  font-size: 22px;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    vertical-align: sub;
    margin-right: 10px;
  }
`;

const HighLightText = styled.div`
  padding: 1rem 1.5rem;
  margin: 20px 0;
  background: #f1f7fb;
  h3 {
    font-size: 20px;
    color: ${persianblue};
  }

  p {
    margin-top: 0.5rem;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 16px;
`;

const Details = styled(Info)`
  justify-content: center;

  > :nth-child(1) {
    width: 400px;
  }

  > :nth-child(2) {
    width: 50px;
  }

  > :nth-child(3) {
    width: 200px;
    text-align: right;

    span {
      text-align: right;
      display: inline-block;
      width: 80px;
    }
  }
`;

const Section = styled.section`
  .inner {
    padding-left: 3.5rem;
  }

  .search {
    padding-top: 2rem;
  }

  .modal-block {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .modal-block-label {
      display: flex;
      width: 50%;
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 0;
    }
  }
`;

const Search = styled.div`
  margin-top: 10px;
  display: flex;
  width: 80%;
`;

const Line = styled.div`
  height: 1px;
  background-color: #d9e1e7;
  margin: 1.5rem 0;
`;

const CheckRightInfo = () => {
  const [company, setCompany] = useState("");
  const [rightStockName, setRightStockName] = useState("");
  const [getRight, setGetRight] = useState("");
  const [ratio, setRatio] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [bookingRight, setBookingRight] = useState("");
  const [bookingOverRight, setBookingOverRight] = useState("");
  const [paidRightVolume, setPaidRightVolume] = useState("");
  const [numCert, setNumCert] = useState("");
  const searchInputRef = useRef("");

  const [shareId, setShareId] = useState(null);
  const [allRegistrations, setAllRegistrations] = useState([]);

  const [isOpenDropdownArrow, setIsOpenDropdownArrow] = useState(false);

  const { user } = useSelector((state) => state);

  const getCustomerProfile = async () => {
    const [res, status] = await httpGetRequest(
      `customerStocks?customerId=${user.customerId}`
    );

    if (status === 200) {
      const payload = res.data[0];
      const registrations = res.data.map((data) => {
        return { registraionNo: data.registrationNo };
      });
      setAllRegistrations(registrations);
      setShareId(
        registrations.length > 0 ? registrations[0].registraionNo : null
      );
    }
  };

  async function fetchCustomerStock() {
    const endpoint = `customerStocks/search/value?customerId=${user.customerId}`;

    const inputValue = searchInputRef.current.value;
    if (inputValue) {
      endpoint = `${endpoint}&key=${inputValue}`;
    }

    const [res, status] = await httpGetRequest(endpoint);

    if (res["data"].length > 0) {

      const {
        registrationNo,
        customers,
        customerStock,
        offerPrice,
        orders,
        getRight,
      } = res["data"][0];

      const { name, lastname } = customers;

      setRegistrationNo(registrationNo);
      setName(name);
      setLastname(lastname);

      const { excessAmount, paidRightVolume } = orders;

      const tempBooking = excessAmount / offerPrice - paidRightVolume;
      setBookingRight(tempBooking < 0 ? -1 * tempBooking : tempBooking); // * จองตามสิทธิ

      const tempBookingOver = excessAmount / offerPrice;
      setBookingOverRight(tempBookingOver); // * จองเกินสิทธิ

      setPaidRightVolume(paidRightVolume); // * รวมจำนวนหุ้นที่ได้รับทั้งสิ้น

      const tempNumCert = paidRightVolume / getRight;
      setNumCert(paidRightVolume / getRight); // * รวมจำนวนใบสำคัญแสดงสิทธที่ได้รับทั้งสิ้น
    } else {
      setCompany("");
      setRightStockName("");
      setGetRight("");
      setRatio("");
      setRatio("");
      setRegistrationNo("");
      setName("");
      setLastname("");
      setBookingRight("");
      setBookingOverRight("");
      setPaidRightVolume("");
      setNumCert("");
    }
  }

  const handleSearchButtonClicked = async () => {
    fetchCustomerStock();
  };

  useEffect(() => {
    getCustomerProfile();
  }, []);

  const header = (
    <Header>
      <span>
        <img src={logo} />
      </span>
      บริษัทหลักทรัพย์ เอเชีย เวลท์ จำกัด
    </Header>
  );
  return (
    <Card>
      <Container>
        <Section>
          {header}
          <p className="inner">
            <b>E-RO</b> ตรวจสอบสิทธิการจองซื้อหุ้นสามัญเพิ่มทุน
            <b>{company || " บริษัท เน็คซ์ แคปปิตอล จำกัด (มหาชน)"}</b>
          </p>
          <div className="inner search">
            <p>เพื่อตรวจสอบสิทธิของท่านแล้วกรอกข้อมูลให้ถูกต้อง</p>
            <Search>
              {/* <InputSearch
                placeholder="ค้นหาหมายเลชประจำตัวประชาชน / เลขที่หนังสือเดินทาง/เลขทะเบียนนิติบุคคล"
                ref={searchInputRef}
              /> */}
              <div
                className="modal-block-label"
                style={{ marginRight: "1rem" }}
              >
                <DropdownArrow
                  options={allRegistrations}
                  isOpen={isOpenDropdownArrow}
                  onClick={() => setIsOpenDropdownArrow(!isOpenDropdownArrow)}
                  onBlur={() => setIsOpenDropdownArrow(false)}
                  setSelected={(e) => setShareId(e.registraionNo)}
                  selected={{
                    registraionNo:
                      allRegistrations.length > 0 && !shareId
                        ? allRegistrations[0].registraionNo
                        : shareId,
                  }}
                  display={"registraionNo"}
                />
              </div>
              <Button onClick={handleSearchButtonClicked}>ค้นหา</Button>
            </Search>
          </div>
          <HighLightText>
            <h3>
              {rightStockName || "NCAP"} (อัตราส่วน {getRight || "2"} หุ้น
              สามัญเดิม : {ratio || "1 "}
              หุ้นสามัญเพิ่มทุน) จองเกินสิทธิได้
            </h3>
            <p>
              ผู้จองซื้อหุ้นสามัญเพิ่มทุนที่จองซื้อและได้รับการจัดสรรหุ้นสามัญเพิ่มทุน
              จะได้รับการจัดสรรใบสำคัญแสดงสิทธในอัตราส่วน {getRight}{" "}
              หุ้นสามัญเพิ่มทุน ต่อ {ratio} หน่วยใบสำคัญแสดงสิทธิ
            </p>
          </HighLightText>
          <Info>
            <p style={{ color: persianblue, fontWeight: 600 }}>
              ตรวจสอบผลการจองซื้อ
            </p>
            <p>{registrationNo}</p>
            <p>
              {name} {lastname}
            </p>
          </Info>
        </Section>
        <Line />
        <Section>
          {/* {header} */}
          <HighLightText>
            <h3>ผลการจองซื้อ</h3>
          </HighLightText>
          <p className="inner">
            ท่านได้รับการจัดสรรหุ้นเพิ่มทุนของ
            หุ้นสามัญเพิ่มทุนและใบสำคัญแสดงสิทธิ ดังนี้
          </p>
        </Section>
        <Details style={{ marginTop: 15 }}>
          <p>จองตามสิทธิ</p>
          <p>จำนวน</p>
          <p className="unit">
            {bookingRight || "-"}
            <span>หุ้น</span>
          </p>
        </Details>
        <Details>
          <p>จองเกินสิทธิ</p>
          <p>จำนวน</p>
          <p className="unit">
            {bookingOverRight || "-"}
            <span>หุ้น</span>
          </p>
        </Details>
        <Details style={{ fontWeight: "bold" }}>
          <p>รวมจำนวนหุ้นที่ได้รับทั้งสิ้น</p>
          <p>จำนวน</p>
          <p className="unit">
            {paidRightVolume || "-"}
            <span>หุ้น</span>
          </p>
        </Details>
        <Details style={{ fontWeight: "bold" }}>
          <p>รวมจำนวนใบสำคัญแสดงสิทธที่ได้รับทั้งสิ้น</p>
          <p>จำนวน</p>
          <p className="unit">
            {numCert || "-"}
            <span>หน่วย</span>
          </p>
        </Details>
      </Container>
    </Card>
  );
};

export default CheckRightInfo;
