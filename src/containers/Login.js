import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import bg from "../assets/bg.jpg";
import logo from "../assets/logo_awsc.jpg";
import Cookies from 'js-cookie'

import { Logo } from "../components/Logo/Logo";
import { Card } from "../components/UI/Card";
import { Input } from "../components/UI/Input";
import { persianblue } from "../utils/color";
import { httpFetch } from "../utils/fetch";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const usernameInputRef = useRef("4654499830700");
  const passwordInputRef = useRef("1234");

  const endpoint = "auth/signIn?type=customer";

  const handleSubmited = async (event) => {
    event.preventDefault();
    Cookies.remove('token')

    const username = usernameInputRef.current.value;

    const [res, status] = await httpFetch(
      "POST",
      { nationalId: username },
      endpoint
    );

    if (status === 200) {
      const payload = {
        username,
        customerId: res.data.customerId,
        role: "client",
      }
      dispatch({
        type: "SET",
        payload
      });
      console.log(payload)
      Cookies.set('token', JSON.stringify({
        user: payload
      }));
      navigate(`/buy`);
    } else {
      setShowError(true);
      setErrorMsg(res.message);
    }
  };

  const link = (text) => <Link>{text}</Link>;

  return (
    <Container>
      <Card>
        <div className="inner">
          <Form>
            <Logo />
            <div className="field">
              <div className="input">
                <Input
                  elementType="input"
                  elementConfig={{ type: "text" }}
                  label="National-ID"
                  required
                  width="100%"
                  ref={usernameInputRef}
                />
                {/* <Input
                  elementType="input"
                  elementConfig={{ type: "password" }}
                  label="Password"
                  required
                  width="100%"
                  ref={passwordInputRef}
                /> */}
                <ErrorText show={showError}>{errorMsg}</ErrorText>
              </div>

              <div className="submit">
                <Button
                  type="submit"
                  value="Sign in"
                  onClick={handleSubmited}
                />
                {link("problem to sign in ?")}
                {link("มีปัญหาในการเข้าใช้งานกรุณาคลิกที่นี่")}
              </div>
            </div>

            <div>
              <img src={logo} />
            </div>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 600px;
  min-height: 740px;
  background-image: url(${bg});
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 510px;
    height: 740px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 271px;
  height: 80%;
  // overflow: scroll;
  .field {
    width: 100%;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    margin-bottom: 20px;
  }
  .input {
    width: 100%;
  }
  .input > :not(:last-child) {
    margin-top: 35px;
  }
  .submit {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    margin-bottom: 20px;
  }
`;

const Button = styled.input`
  width: 100%;
  height: 54px;
  background-color: ${persianblue};
  color: #fff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 26px;
  font-weight: 700;
  border-radius: 10px;
  text-transform: capitalize;
  cursor: pointer;
`;

const Link = styled.a`
  text-decoration-line: underline;
  margin-top: 10px;
`;

const ErrorText = styled.p`
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
  color: #b20600;
  font-size: 13px;
  position: absolute;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;
