import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Parser from "html-react-parser";

import styled from "styled-components";
import bg from "../assets/bg.jpg";
import logo from "../assets/logo_awsc.jpg";
import Cookies from "js-cookie";

import { Logo } from "../components/Logo/Logo";
import { Card } from "../components/UI/Card";
import { LineCard } from "../components/UI/Card";
import { Input } from "../components/UI/Input";
import { persianblue } from "../utils/color";
import { httpFetch } from "../utils/fetch";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const usernameInputRef = useRef("3100503053540");
  const [_customerId, _setCustomerId] = useState("");
  const [_username, _setUsername] = useState("");
  const [isButtonChecked, setIsButtonChecked] = useState(false);
  const [isCheckedFirst, setIsCheckedFirst] = useState(false);
  const [isCheckedSecond, setIsCheckedSecond] = useState(false);
  const [isCheckedThrid, setIsCheckedThrid] = useState(false);

  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isNotRobot, setIsNotRobot] = useState(false);

  localStorage.clear();
  Cookies.remove("token");

  const endpoint = "auth/signIn?type=customer";

  const onRecaptchaSuccess = async () => {
    setIsNotRobot(true);
  };

  const consentSubmited = async (customerId) => {
    const endpoint = "consentHistory";

    const [res, status] = await httpFetch("POST", { customerId }, endpoint);
    console.log(res.data);

    if (status === 200) {
      await createAuth({
        username: _username,
        customerId,
        role: "client",
      });
      navigate(`/profile`);
    } else {
      setShowError(true);
      setErrorMsg(res.message);
    }
  };

  const handlerOnCancel = () => {
    Cookies.remove("token");
    setIsConfirmModal(false);
  };

  const createAuth = async (payload) => {
    dispatch({
      type: "SET",
      payload,
    });

    Cookies.set(
      "token",
      JSON.stringify({
        user: payload,
      })
    );
  };

  const handleSubmited = async (event) => {
    event.preventDefault();
    Cookies.remove("token");

    const endpoint = "auth/signIn?type=customer";
    const username = usernameInputRef.current.value;

    const [res, status] = await httpFetch(
      "POST",
      { nationalId: username },
      endpoint
    );

    if (status === 200) {
      const { customerId, isAccept } = res.data;

      if (!isAccept) {
        await createAuth({
          username,
          customerId,
          role: "client",
        });
        navigate("/profile");
      } else {
        _setCustomerId(customerId);
        _setUsername(username);
        setIsConfirmModal(true);
      }
    } else {
      setShowError(true);
      setErrorMsg(res.message);
    }
  };

  useEffect(() => {
    if (isCheckedFirst && isCheckedSecond && isCheckedThrid) {
      setIsButtonChecked(true);
    } else {
      setIsButtonChecked(false);
    }
  }, [isCheckedFirst, isCheckedSecond, isCheckedThrid]);

  const link = (text, url) => <Link href={url}>{text}</Link>;

  return (
    <>
      {(() => {
        if (isConfirmModal) {
          return (
            <>
              <Container size={"full"}>
                <Card>
                  <div className="inner">
                    <Form size={"full"}>
                      <div>
                        <img src={logo} />
                      </div>
                      <div
                        className="title"
                        style={{ margin: "0 2rem", textAlign: "center" }}
                      >
                        <p>การยินยอมเปิดเผยข้อมูล และข้อตกลงการให้บริการ</p>
                      </div>
                      <div className="card-term-condition">
                        <LineCard
                          style={{ width: "100%", paddingBottom: "1rem" }}
                        >
                          <div className="div-term-condition">
                            <pre className="pre-term-condition">
                              <input
                                type="checkbox"
                                defaultChecked={isCheckedFirst}
                                onChange={() =>
                                  setIsCheckedFirst(!isCheckedFirst)
                                }
                              />
                              {Parser(
                                ` ข้าพเจ้าตกลงยินยอมให้ บริษัทหลักทรัพย์ เอเชียเวลท์ จำกัด เก็บรวบรวม ใช้ เปิดเผย ซึ่งข้อมูลส่วนบุคคลของข้าพเจ้า เพื่อประโยชน์ในการทำธุรกรรมของข้าพเจ้ากับบริษัท โดยบริษัทจะใช้ข้อมูลส่วนบุคคลของท่านให้สอดคล้องกับวัตถุประสงค์ตามหลักเกณฑ์และนโยบายที่บริษัทกำหนด รวมถึงกฏหมายที่เกี่ยวข้องบัญญัติให้สามารถกระทำได้  โดยท่านสามารถศึกษานโยบายความเป็นส่วนตัวของบริษัท <a href="http://www.asiawealth.co.th/uploads/files/pdpa01.pdf">คลิกที่นี่</a>`
                              )}
                            </pre>
                          </div>
                        </LineCard>
                      </div>
                      <div
                        className="card-term-condition"
                        style={{ marginTop: "1rem" }}
                      >
                        <LineCard style={{ width: "100%", border: "none" }}>
                          <div className="div-term-condition">
                            <pre className="pre-term-condition">
                              <input
                                type="checkbox"
                                defaultChecked={isCheckedSecond}
                                onChange={() =>
                                  setIsCheckedSecond(!isCheckedSecond)
                                }
                              />
                              {Parser(
                                ` ข้าพเจ้ายืนยันที่จะจองซื้อหลักทรัพย์ และยอมรับความเสี่ยงที่อาจเกิดขึ้นจากการลงทุนในหลักทรัพย์โดยข้าพเจ้าขอรับรองว่าได้ศึกษาข้อมูลเกี่ยวกับลักษณะ ความเสี่ยง ผลตอบแทนของการลงทุน และข้อมูลอื่น ๆ ในหนังสือชี้ชวนข้อมูลสรุป (Executive Summary) หรือสรุปข้อมูลสำคัญของตราสาร (Fact Sheet) <a href="https://market.sec.or.th/public/ipos/IPOSEQ01.aspx?TransID=294797">คลิกที่นี่</a>`
                              )}
                            </pre>
                          </div>
                        </LineCard>
                      </div>
                      <div
                        className="card-term-condition"
                        style={{ marginTop: "1rem" }}
                      >
                        <LineCard style={{ width: "100%", border: "none" }}>
                          <div className="div-term-condition">
                            <pre className="pre-term-condition">
                              <input
                                type="checkbox"
                                defaultChecked={isCheckedThrid}
                                onChange={() =>
                                  setIsCheckedThrid(!isCheckedThrid)
                                }
                              />
                              {Parser(` ข้าพเจ้าขอรับรอง และตกลงว่าจะรับหุ้นสามัญเพิ่มทุนจำนวนดังกล่าว หรือในจำนวนที่บริษัทฯ จัดสรรให้ และจะไม่ยกเลิกการจองซื้อหุ้นสามัญเพิ่มทุนนี้ รวมทั้งยินยอมรับคืนเงินในกรณีที่บริษัทฯ ปฏิเสธการจองซื้อ หรือหากข้าพเจ้าส่งรายละเอียดไม่ครบถ้วนถูกต้อง และ/หรือ ส่งหลักฐานการชำระเงินไม่ทันภายในระยะเวลาการจองซื้อ<br/>
ข้าพเจ้ายินยอมผูกพันตนเองตามเงื่อนไขข้อกำหนดและข้อความใด ๆ ในหนังสือแจ้งการจัดสรรหุ้นสามัญเพิ่มทุน รวมทั้งในหนังสือบริคณฑ์สนธิ และข้อบังคับของบริษัทที่มีอยู่แล้วขณะนี้ และ/หรือ ซึ่งจะแก้ไขเพิ่มเติมต่อไปในภายหน้าด้วย ข้าพเจ้าขอรับรองว่าข้าพเจ้าในฐานะผู้ถือหุ้นเดิมและได้รับการจัดสรรหุ้นสามัญออกใหม่เป็นผู้รับผลประโยชน์ที่แท้จริง`)}
                            </pre>
                          </div>
                        </LineCard>
                      </div>
                      <div>
                        <LineCard style={{ width: "100%", border: "none" }}>
                          <div
                            className="div-term-condition"
                            style={{ display: "flex" }}
                          >
                            <pre
                              className="pre-term-condition"
                              style={{
                                color: "#1D3AB1",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: "400",
                                marginRight: "1rem",
                                marginLeft: "2rem",
                              }}
                            >
                              **
                            </pre>
                            <pre
                              className="pre-term-condition"
                              style={{
                                color: "#1D3AB1",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: "400",
                                whiteSpace: "initial",
                              }}
                            >
                              {Parser(
                                `รายการจองซื้อหุ้นของท่านจะสำเร็จเมื่อบริษัทตรวจสอบผลการชำระเงินค่าจองซื้อหุ้นเข้าบัญชีบริษัทเรียบร้อยแล้ว`
                              )}
                            </pre>
                            <pre
                              className="pre-term-condition"
                              style={{
                                color: "#1D3AB1",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: "400",
                                marginRight: "2rem",
                                marginLeft: "1rem",
                              }}
                            >
                              **
                            </pre>
                          </div>
                        </LineCard>
                      </div>
                      <div className="btn-div">
                        <Button
                          type="button"
                          value="ยินยอม"
                          onClick={() => consentSubmited(_customerId)}
                          disabled={!isButtonChecked}
                          style={{
                            width: "292px",
                            fontSize: "20px",
                            marginBottom: "1rem",
                          }}
                        />
                        <Button
                          type="button"
                          value="ไม่ยินยอม"
                          onClick={handlerOnCancel}
                          style={{
                            width: "292px",
                            fontSize: "20px",
                            background: "#809FB8",
                            marginBottom: "1rem",
                          }}
                        />
                      </div>
                    </Form>
                  </div>
                </Card>
              </Container>
            </>
          );
        } else {
          return (
            <>
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
                            label="บัตรประจำตัวประชาชน / National-ID"
                            required
                            width="100%"
                            ref={usernameInputRef}
                          />
                          <ErrorText show={showError}>{errorMsg}</ErrorText>
                        </div>

                        <div className="submit">
                          <div style={{ marginBottom: "1rem" }}>
                            <ReCAPTCHA
                              sitekey="6LfEFkYgAAAAADvrIu_5yAhLw6P6opapY7_1950K"
                              onChange={onRecaptchaSuccess}
                            />
                          </div>
                          <Button
                            type="submit"
                            value="Sign in"
                            onClick={handleSubmited}
                            disabled={!isNotRobot}
                          />
                          {link("Problem to sign in ?", "/customer/service")}
                          {link(
                            "มีปัญหาในการเข้าใช้งานกรุณาคลิกที่นี่",
                            "/customer/service"
                          )}
                        </div>
                      </div>

                      <div>
                        <img src={logo} />
                      </div>
                    </Form>
                  </div>
                </Card>
              </Container>
            </>
          );
        }
      })()}
    </>
  );
};

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  // min-width: 600px;
  // min-height: 740px;
  background-image: url(${bg});
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    width: 80vw;
    max-width: ${(props) => (props.size === "full" ? "914px" : "510px")};
    max-height: 740px;

    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #1d3ab1;
      margin-bottom: 0.5rem;
    }
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    .inner {
      margin: 2rem;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: ${(props) => (props.size === "full" ? "100%" : "271px")};
  height: ${(props) => (props.size === "full" ? "90%" : "80%")};
  // overflow: ${(props) => (props.size === "full" ? "scroll" : "visible")};
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
    margin-top: 60px;
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

  :disabled {
    background: #809fb8;
  }
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
