import { useState } from "react";
import styled from "styled-components";

import { Logo } from "../components/Logo/Logo";
import { Card } from "../components/UI/Card";
import { Input } from "../components/UI/Input";

import { persianblue } from "../utils/color";

import bg from "../assets/bg.jpg";
import logo from "../assets/logo_awsc.jpg";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const link = (text) => <Link>{text}</Link>;

  return (
    <Container>
      <Card>
        <div className="inner">
          <Form>
            <Logo />
            <div className="field">
              {/* <div className="input"> */}
              <Input
                elementType="input"
                elementConfig={{ type: "text" }}
                changed={(e) => setUsername(e.target.value)}
                label="Username"
                required
                width="100%"
              />
              <Input
                elementType="input"
                elementConfig={{ type: "password" }}
                changed={(e) => setPassword(e.target.value)}
                label="Password"
                required
                width="100%"
              />
              {/* </div> */}
              <div className="submit">
                <Button type="submit" value="Sign in" />
                {link("problem to sign in ?")}
                {link("มีปัญหาในการเข้าใช้งานกรุณาคลิกที่นี้")}
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

export default Auth;

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
  height: 90%;
  overflow: scroll;

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

  .field > * {
    margin-bottom: 40px;
  }

  .submit {
    display: flex;
    flex-direction: column;
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
`;

const Link = styled.a`
  text-decoration-line: underline;
  margin-top: 14px;
`;
