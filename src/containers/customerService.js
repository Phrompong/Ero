import bg from "../assets/bg.jpg";

import styled from "styled-components";

import logo from "../assets/logo_awsc.jpg";

const customerService = () => {
    return (
        <Container>
            <div className="bg-img">
                <div className="bg-text">
                    <p>Customer Service</p>
                    <Button type="button" value="Back" />
                </div>
            </div>
            <Card>
                <div className="info-detail">
                    <div className="logo-img-div">
                        <img src={logo} className="logo-img" />
                    </div>
                    <Header style={{ fontSize: "24px" }}>
                        Asia Wealth Securities Co.,Ltd. (AWS)
                    </Header>
                    <Info>
                        02-680-5033-5
                    </Info>
                    <Info>
                        cs@asiawealth.co.th
                    </Info>
                    <Header>
                        (วันทำการ จันทร์-ศุกร์ เวลา 08.30 -17.00 น.)
                    </Header>
                </div>
                <div className="form-input">
                    <div className="form-header">
                        <Header style={{ color: "#1D3AB1", fontSize: "24px" }}>
                            Submit a request
                        </Header>
                    </div>
                    <div className="form-input-detail" style={{ margin: '1rem 2rem' }}>
                        <label style={{ width: "100%" }}>โปรดระบุอีเมล์ของท่าน /Your email address</label>
                        <input placeholder="กรอกข้อมูล" style={{ width: "80%" }}></input>
                    </div>
                </div>
            </Card>
        </Container>
    )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 600px;
  min-height: 740px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  .bg-img {
    position: absolute;
    top: 0;
    background-image: url(${bg});
    background-position: center center;
    background-size: cover;
    height: 40%;
    width: 100%;

    .bg-text {
        color: #FFFFFF;
        font-weight: 600;
        font-size: 48px;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5rem;
        display: flex;
        justify-content: space-between;
    }
  }
`;

const Card = styled.div`
  position: absolute;
  width: 80%;
  height: 60%;
  margin-top: 2rem;
  background: #FFFFFF;
  border: 1px solid #B2C7D8;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;

  .info-detail {
      width: 40%;
      background: #1D3AB1;
      display: block;

      * {
          margin: 1rem 2rem;
      }

      .logo-img-div {
        height: 118px;
        width: 312px;
        position: relative;
        left: -50px;
        background: #FFFFFF;
        border-radius: 0px 8px 8px 0px;

        .logo-img {
            height: 100px;
            width: 220px;
        }
      }
  }

  .form-input {
    .form-header {
        margin: 4rem 2rem 2rem 2rem;
    }
    .form-input-detail {
        width: 100%;
        display: block;
    }
  }

  .form-input {
      width: 60%;
  }
`

const Header = styled.p`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 600;
`

const Info = styled.p`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 600;
`

const Button = styled.input`
    color: #FFFFFF;
    font-weight: 600;
    font-size: 16px;
    background: black;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 11px;
    height: 40px;
    width: 100px;
`

export default customerService