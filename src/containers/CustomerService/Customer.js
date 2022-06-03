import { useState, useEffect } from "react";
import styled from "styled-components";

import logo from "../../assets/logo_awsc2.jpeg";
import bgCustomerService from "../../assets/bgCustomerService.png";
import customerServiceLeft from "../../assets/customerServiceLeft.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { persianblue } from "../../utils/color";
import { httpGetRequest } from "../../utils/fetch";
import { httpFetch } from "../../utils/fetch";
import { ModalAlert } from "../../components/ModalAlert/ModalAlert";
import { showAlert } from "../../utils/showAlert";
import { useNavigate } from "react-router-dom";
import Iframe from "react-iframe";

const CustomerService = () => {
  const navigate = useNavigate();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [masterIssue, setMasterIssue] = useState([]);
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [specifyIssue, setSpecifyIssue] = useState(null);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [status, setStatus] = useState();
  const [map, setMap] = useState(null);

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

      setTimeout(() => {
        redirectPage();
      }, 2000);
      //navigate("/login/admin");
    }
  };

  const redirectPage = () => {
    console.log("redirect");
    navigate("/");
  };

  return (
    <Container>
      <ModalAlert show={show} msg={alertMessage} status={status} />
      <div className="bg-img">
        <div className="bg-text">
          <p className="title-text">Customer Service</p>
          <Button onClick={redirectPage} className="btn">
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
          <Header style={{ fontSize: "24px" }}>
            Asia Wealth Securities Co.,Ltd. (AWS)
          </Header>
          <Info>
            <FontAwesomeIcon
              icon={faPhone}
              style={{ margin: "0", marginRight: "0.5rem" }}
            />
            02-680-5033-5
          </Info>
          <Info>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ margin: "0", marginRight: "0.5rem" }}
            />
            cs@asiawealth.co.th
          </Info>
          <Header style={{ marginBottom: "0" }}>
            (วันทำการ จันทร์-ศุกร์ เวลา 08.30 -17.00 น.)
          </Header>
        </div>
        <div className="form-input">
          <Iframe
            url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.590078805388!2d100.54203281500452!3d13.743250090352943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f29a76569cd%3A0x44d9202229edba57!2sAsia%20Wealth%20Security!5e0!3m2!1sth!2sth!4v1653241766237!5m2!1sth!2sth"
            width="100%"
            height="100%"
            display="initial"
            position="relative"
          />
        </div>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;

  .bg-img {
    position: absolute;
    top: 0;
    background-image: url(${bgCustomerService});
    background-position: center center;
    background-size: cover;
    height: 40%;
    width: 100%;

    .bg-text {
      color: #ffffff;
      font-weight: 600;
      font-size: 48px;
      // margin-left: 10%;
      // margin-right: 10%;
      margin-top: 5rem;
      display: flex;
      justify-content: space-between;

      .title-text {
        margin: 0 10%;
      }

      .btn {
        margin: 0 10%;
      }
    }

    /* For Mobile */
    @media screen and (max-width: 540px) {
      height: 100%;

      .bg-text {
        margin-top: 2rem;

        .title-text {
          margin: auto 0 auto 10%;
        }
        .btn {
          margin: auto 10% auto 0;
        }
      }
    }
  }
`;

const Card = styled.div`
  position: absolute;
  width: 80%;
  height: 60%;
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
      margin: 1rem 2rem;
    }

    .logo-img-div {
      max-height: 118px;
      max-width: 312px;
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
    }
  }

  .form-input {
    width: 60%;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    display: inline-block;
    width: 100%;
    // height: 100%;
    // margin-top: 100%;

    .info-detail {
      width: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding-bottom: 1rem;

      .logo-img-div {
        text-align: center;
        margin: 0;
        left: 0;
        max-height: 100%;
        max-width: 100%;
        border-radius: 0px;
      }
    }

    .form-input {
      height: 300px;
      width: 100vw;
    }
  }

  /* For Tablet */
  @media screen and (min-width: 541px) and (min-width: 880px) {
  }
`;

const Header = styled.p`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

const Info = styled.p`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
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
