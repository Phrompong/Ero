import styled from "styled-components";
import logo from "../../assets/icon_logo.png";
import { Button } from "../../components/UI/Button";
import { Card } from "../../components/UI/Card";
import { InputSearch } from "../../components/UI/Input";
import { persianblue } from "../../utils/color";

const Container = styled.div`
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: scroll;
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
`;

const Search = styled.div`
  margin-top: 10px;
  display: flex;
  width: 80%;

  input {
    flex: 1;
    margin-right: 20px;
  }
`;

const Line = styled.div`
  height: 1px;
  background-color: #d9e1e7;
  margin: 1.5rem 0;
`;

const CheckRightInfo = () => {
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
            <b>E-RO</b> ตรวจสอบสิทธิ์การจองซื้อหุ้นสามัญเพิ่มทุน
            <b>บริษัท เน็คซ์ แคปปิตอล จำกัด(มหาชน)</b>
          </p>
          <div className="inner search">
            <p>เพื่อตรวจสอบสิทธิ์ของท่านแล้วกรอกข้อมูลให้ถูกต้อง</p>
            <Search>
              <InputSearch placeholder="ค้นหาหมายเลชประจำตัวประชาชน / เลขที่หนังสือเดินทาง/เลขทะเบียนนิติบุคคล" />
              <Button>ค้นหา</Button>
            </Search>
          </div>
          <HighLightText>
            <h3>
              NCAP (อัตราส่วน 2 หุ้น สามัญเดิม : 1 หุ้นสามัญเพิ่มทุน)
              จองเกินสิทธิ์ได้
            </h3>
            <p>
              ผู้จองซื้อหุ้นสามัญเพิ่มทุนที่จองซื้อและได้รับการจัดสรรหุ้นสามัญเพิ่มทุน
              จะได้รับการจัดสรรใบสำคัญแสดงสิทธในอัตราส่วน 2 หุ้นสามัญเพิ่มทุน
              ต่อ 1 หน่วยใบสำคัญแสดงสิทธิ
            </p>
          </HighLightText>
          <Info>
            <p style={{ color: persianblue, fontWeight: 600 }}>
              ตรวจสอบผลการจองซื้อ
            </p>
            <p>4000000000021</p>
            <p>มนัส ไพรวงศ์</p>
          </Info>
        </Section>
        <Line />
        <Section>
          {header}
          <HighLightText>
            <h3>ผลการจองซื้อ</h3>
          </HighLightText>
          <p className="inner">
            ท่านได้รับการจัดสรรหุ้นเพิ่มทุนของ
            หุ้นสามัญเพิ่มทุนและใบสำคัญแสดงสิทธิ ดังนี้
          </p>
        </Section>
        <Details style={{ marginTop: 15 }}>
          <p>จองตามสิทธิ์</p>
          <p>จำนวน</p>
          <p className="unit">
            100,000<span>หุ้น</span>
          </p>
        </Details>
        <Details>
          <p>จองเกินสิทธิ์</p>
          <p>จำนวน</p>
          <p className="unit">
            1,000<span>หุ้น</span>
          </p>
        </Details>
        <Details style={{ fontWeight: "bold" }}>
          <p>รวมจำนวนหุ้นที่ได้รับทั้งสิ้น</p>
          <p>จำนวน</p>
          <p className="unit">
            1,101,000<span>หุ้น</span>
          </p>
        </Details>
        <Details style={{ fontWeight: "bold" }}>
          <p>รวมจำนวนใบสำคัญแสดงสิทธที่ได้รับทั้งสิ้น</p>
          <p>จำนวน</p>
          <p className="unit">
            50,500<span>หน่วย</span>
          </p>
        </Details>
      </Container>
    </Card>
  );
};

export default CheckRightInfo;
