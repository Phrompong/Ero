import { useState, useEffect } from "react";
import styled from "styled-components";

import logo from "../assets/logo_awsc2.jpeg";
import customerServiceLeft from "../assets/customerServiceLeft.png";
import { DropdownArrow } from "../components/UI/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { persianblue } from "../utils/color";
import { httpGetRequest } from "../utils/fetch";
import { httpFetch } from "../utils/fetch";
import { ModalAlert } from "../components/ModalAlert/ModalAlert";
import { showAlert } from "../utils/showAlert";

const CustomerService = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [masterIssue, setMasterIssue] = useState([]);
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [specifyIssue, setSpecifyIssue] = useState(null);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    getMasterIssue();
  }, []);

  const getMasterIssue = async () => {
    const [res, status] = await httpGetRequest("masterIssue");

    if (status === 200) {
      const payload = res.data;

      setMasterIssue(payload);
    }
  };

  const handlerOnSubmited = async () => {
    console.log(masterIssue);
    const [res, status] = await httpFetch(
      "POST",
      {
        email,
        subject,
        issue: selectedIssue._id,
        specifyIssue,
      },
      "customerService"
    );
    if (status === 200) {
      setStatus(200);
      setAlertMessage("แจ้งปัญหาสำเร็จ");
      showAlert(setShow, 2000);
    }
  };

  return (
    <Container>
      <ModalAlert show={show} msg={alertMessage} status={status} />
      <div className="bg-img">
        <div className="bg-text">
          <p>Customer Service</p>
          <Button>
            <FontAwesomeIcon
              icon={faCircleLeft}
              style={{ marginRight: "0.25rem" }}
            />
            Back
          </Button>
        </div>
      </div>
      <Card>
        <div className="info-detail">
          <div className="logo-img-div">
            <img src={logo} className="logo-img" />
          </div>
          <div>
            <Header style={{ fontSize: "24px" }}>
              Asia Wealth Securities Co.,Ltd. (AWS)
            </Header>
          </div>
          <Info>
            <FontAwesomeIcon
              icon={faPhone}
              height={50}
            // style={{ margin: "0", marginRight: "0.5rem" }}
            />
            <p>02-680-5033-5</p>
          </Info>
          <Info>
            <FontAwesomeIcon
              icon={faEnvelope}
              height={50}
            // style={{ margin: "0", marginRight: "0.5rem" }}
            />
            <p> cs@asiawealth.co.th</p>
          </Info>
          <Header>(วันทำการ จันทร์-ศุกร์ เวลา 08.30 -17.00 น.)</Header>
        </div>
        <div className="form-input">
          <div className="form-header">
            <Header style={{ color: "#1D3AB1", fontSize: "24px" }}>
              Submit a request
            </Header>
          </div>
          <div className="form-input-detail">
            <div className="form-label">
              <label style={{ width: "100%" }}>
                โปรดระบุอีเมล์ของท่าน /Your email address
              </label>
            </div>
            <div className="tag-input">
              <Input onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="form-input-detail">
            <div className="form-label">
              <label style={{ width: "100%" }}>
                โปรดระบุหัวข้อของท่าน / Subject
              </label>
            </div>
            <div className="tag-input">
              <Input onChange={(e) => setSubject(e.target.value)} />
            </div>
          </div>
          <div className="form-input-detail">
            <div className="form-label">
              <label style={{ width: "100%" }}>
                โปรดเลือกปัญหาที่ท่านต้องการแจ้งทราบ /What's the issue?
              </label>
            </div>
            <div className="tag-input">
              <DropdownArrow
                options={masterIssue}
                isOpen={isOpenDropdown}
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                onBlur={() => setIsOpenDropdown(false)}
                setSelected={setSelectedIssue}
                selected={selectedIssue}
                display={"nameTH"}
              />
            </div>
          </div>
          <div className="form-input-detail">
            <div className="form-label">
              <label style={{ width: "100%" }}>
                โปรดระบุรายละเอียด / Please specify your issue on the subject
                field
              </label>
            </div>
            <div className="tag-input">
              <Input />
            </div>
          </div>
          <div className="btn-submit">
            <SubmitButton
              value={"Submit"}
              onClick={() => handlerOnSubmited()}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 600px;
  min-height: 740px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;

  .bg-img {
    position: absolute;
    top: 0;
    background-position: center center;
    background-size: cover;
    height: 40%;
    width: 100%;

    .bg-text {
      color: #ffffff;
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
  margin-top: 2rem;
  background: #ffffff;
  border: 1px solid #b2c7d8;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;

  .info-detail {
    width: 40%;
    background-image: url(${customerServiceLeft});
    display: block;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    * {
      margin: 1rem 1rem;
    }

    .logo-img-div {
      height: 118px;
      width: 312px;
      position: relative;
      left: -50px;
      background: #ffffff;
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
      margin-bottom: 1rem;
    }
  }

  .form-input {
    width: 60%;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    display: inline-block;
    .info-detail {
      width: 100%;
      margin: 0 2rem;
      text-algin: start;

      * {
        width: 100%;
      }

      .logo-img-div {
        height: 118px;
        width: 100%;
        position: relative;
        left: 0;
        background: #ffffff;
        border-radius: 0px 8px 8px 0px;
        marign: auto;
  
        .logo-img {
          height: 100px;
          width: 220px;
        }
      }
    }

    .form-input {
      width: 100%;
      margin: auto;
    }
  }

  /* For Mobiles */
  @media screen and (min-width: 540px) and (max-width: 1024px) {
    
  }
`;

const Header = styled.p`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;

  /* For Mobiles */
  @media screen and (min-width: 540px) and (max-width: 1024px) {
    padding: 0 1rem;
  }
`;

const Info = styled.p`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  text-align: start;

  /* For Tablets */
  @media screen and (max-width: 540px){
  }
`;

const Button = styled.button`
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  background: transparent;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 11px;
  height: 40px;
  width: 100px;
`;

const Input = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid #bfccd6;
  box-sizing: border-box;
  border-radius: 9px;
  height: 34px;
  font-size: 16px;
  padding-left: 15px;
  padding-right: 15px;
`;

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
    background: #809fb8;
  }
`;

export default CustomerService;
