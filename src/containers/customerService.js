import { useState, useEffect } from "react";
import styled from "styled-components";

import bg from "../assets/bg.jpg";

import logo from "../assets/logo_awsc.jpg";

import { DropdownArrow } from "../components/UI/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { persianblue } from "../utils/color";

const CustomerService = () => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [selectedTitle, setSelectedTitle] = useState([])

    return (
        <Container>
            <div className="bg-img">
                <div className="bg-text">
                    <p>Customer Service</p>
                    <Button><FontAwesomeIcon icon={faCircleLeft} style={{ marginRight: '0.25rem' }} />Back</Button>
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
                        <FontAwesomeIcon icon={faPhone} style={{ margin: "0", marginRight: "0.5rem" }} />
                        02-680-5033-5
                    </Info>
                    <Info>
                        <FontAwesomeIcon icon={faEnvelope} style={{ margin: "0", marginRight: "0.5rem" }} />
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
                    <div className="form-input-detail">
                        <div className="form-label">
                            <label style={{ width: "100%" }}>โปรดระบุอีเมล์ของท่าน /Your email address</label>
                        </div>
                        <div className="tag-input">
                            <Input />
                        </div>
                    </div>
                    <div className="form-input-detail">
                        <div className="form-label">
                            <label style={{ width: "100%" }}>โปรดระบุหัวข้อของท่าน / Subject</label>
                        </div>
                        <div className="tag-input">
                            <Input />
                        </div>
                    </div>
                    <div className="form-input-detail">
                        <div className="form-label">
                            <label style={{ width: "100%" }}>โปรดเลือกปัญหาที่ท่านต้องการแจ้งทราบ /What's the issue?</label>
                        </div>
                        <div className="tag-input">
                            <DropdownArrow
                                options={[
                                    {
                                        title: "ทดสอบ 1"
                                    },
                                    {
                                        title: "ทดสอบ 2"
                                    },
                                    {
                                        title: "ทดสอบ 3"
                                    }
                                ]}
                                isOpen={isOpenDropdown}
                                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                                onBlur={() => setIsOpenDropdown(false)}
                                setSelected={setSelectedTitle}
                                selected={selectedTitle}
                                display={"title"}
                            />
                        </div>
                    </div>
                    <div className="form-input-detail">
                        <div className="form-label">
                            <label style={{ width: "100%" }}>โปรดระบุรายละเอียด / Please specify your issue on the subject field</label>
                        </div>
                        <div className="tag-input">
                            <Input />
                        </div>
                    </div>
                    <div className="btn-submit">
                        <SubmitButton value={"Submit"} />
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
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;

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
        margin: 2rem 2rem 2rem 2rem;
    }
    .form-input-detail {
        width: 100%;
        display: block;
        color: #687987;

        .tag-input {
            padding-left: 2rem;
            padding-right: 2rem;
            margin-bottom: 1rem;
        }

        .dropdown-div {
            width: 80%;
        }

        .form-label {
            padding-left: 2rem;
            padding-right: 2rem;
            margin-bottom: 0.5rem;
        }
    }

    .btn-submit {
        width: 200px;
        text-align: center;
        margin: auto;
    }
  }

  .form-input {
      width: 60%;
  }
`

const Header = styled.p`
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 600;
`

const Info = styled.p`
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
`

const Button = styled.button`
    color: #FFFFFF;
    font-weight: 600;
    font-size: 16px;
    background: transparent;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 11px;
    height: 40px;
    width: 100px;
`

const Input = styled.input`
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #BFCCD6;
    box-sizing: border-box;
    border-radius: 9px;
    height: 34px;
    font-size: 16px;
    padding-left: 15px;
    padding-right: 15px;
`

const SubmitButton = styled.input`
  width: 100%;
  height: 35px;
  background-color: ${persianblue};
  color: #fff;
  border: none;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 17px;
  font-weight: 700;
  border-radius: 10px;
  text-transform: capitalize;
  cursor: pointer;

  &:hover {
    background: #edb52d;
    color: #000000;
  }

  &:disabled {
    background: #809FB8;
  }
`;

export default CustomerService