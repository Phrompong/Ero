import styled from "styled-components";

import { persianblue } from "../../utils/color";

import { FlexContainer } from "../UI/FlexContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const formatNumber = (number) => {
<<<<<<< HEAD
  //return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
=======
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
>>>>>>> feature/responsive
};

export const ModalDetail = ({
  fullname,
  shareId,
  phoneNo,
  dropdownSelect,
  tradingAccountNo,
  rightStockName,
  stockVolume,
  offerPrice,
  rightStockVolume,
  rightSpecialName,
  excessVolume,
  currentPrice,
  hanlderOnBack,
  handlerOnAccept,
  depositBank,
  bank,
  checkbox,
  lastVerifyChecked,
  setLastVerifyChecked,
  isCheckRight,
  optional1,
  optional2,
  optional3,
  optional4,
  previewImage,
  isBuy,
}) => {
  return (
    <>
      <FlexContainer>
        <div
          className="msg-header"
          style={{
            marginLeft: "20px",
            fontSize: "24px",
            color: persianblue,
          }}
        >
          <b>รายละเอียดข้อมูลคำจองซื้อการจองสิทธิ</b>
        </div>
      </FlexContainer>
      <FlexContainer>
        <div
          className="content-detail"
          style={{ width: "100%", fontSize: "20px" }}
        >
          <div
            className="content-header"
            style={{
              paddingLeft: "2rem",
              backgroundColor: "#F1F7FB",
              color: persianblue,
            }}
          >
            <b>ข้อมูลทั่วไปของสมาชิก</b>
          </div>
          <div className="content-member">
            <div className="content-detail-member">
              <div className="content-detail-text">
                <p>ชื่อ-นามสกุล :</p>
                <p className="detail-text-label">{fullname}</p>
              </div>
              <div className="content-detail-text right">
                <p>เลขทะเบียนผู้ถือหุ้น :</p>
                <p className="detail-text-label">{shareId}</p>
              </div>
            </div>
            <div
              className="content-detail-member"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="content-detail-text">
                <p>เบอร์โทรศัพท์ :</p>
                <p className="detail-text-label">{phoneNo || "-"}</p>
              </div>
            </div>
          </div>
          <div
            className="content-header"
            style={{
              paddingLeft: "2rem",
              backgroundColor: "#F1F7FB",
              color: persianblue,
            }}
          >
            <b>รายละเอียดการจัดสรรหุ้น</b>
          </div>
          <div className="content-member">
            <div className="content-detail-member">
              <div className="content-detail-text">
                <p>ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก :</p>
                <p className="detail-text-label">
                  {dropdownSelect
                    ? `${dropdownSelect.code} ${dropdownSelect.name}`
                    : "-"}
                  {/* {dropdownSelect.code} {dropdownSelect.name} */}
                </p>
              </div>
            </div>
            <div className="content-detail-member">
              <div className="content-detail-text">
                <p>เลขที่บัญชีซื้อขาย :</p>
                <p className="detail-text-label">{tradingAccountNo || "-"}</p>
              </div>
            </div>
          </div>
          <div
            className="content-header"
            style={{
              paddingLeft: "2rem",
              backgroundColor: "#F1F7FB",
              color: persianblue,
            }}
          >
            <b>รายละเอียดการจองซื้อ</b>
          </div>
          <div className="content-member">
            <div className="content-detail-member" style={{ display: "block" }}>
              <div className="content-detail-share">
                <div className="text-title">
                  <p>หุ้นเดิม</p>
                  <p className="text-black">{rightStockName || "-"}</p>
                </div>
                <div className="text-amount right">
                  <p>จำนวน</p>
                  <b className="text-black">
                    {formatNumber(stockVolume) || "-"}
                  </b>
                  <p>หุ้น</p>
                </div>
              </div>
              <div className="content-detail-share">
                <div className="text-title">
                  <p>ราคาเสนอขายหุ้นละ</p>
                  <p className="text-black">
                    {formatNumber(offerPrice) || "-"} บาท
                  </p>
                </div>
                <div className="text-amount"></div>
              </div>
              <div className="content-detail-share">
                <div className="text-title">
                  <p>สิทธิในการจองซื้อหุ้นเพิ่มทุน</p>
                  <p className="text-black">{rightStockName || "-"}</p>
                </div>
                <div className="text-amount right">
                  <p>จำนวน</p>
                  <b className="text-black">
                    {formatNumber(rightStockVolume) || "-"}
                  </b>
                  <p>หุ้น</p>
                </div>
              </div>
              <div className="content-detail-share">
                <div className="text-title">
                  <p>สิทธิเพิ่มเติม</p>
                  <p className="text-black">{rightSpecialName || "-"}</p>
                </div>
                <div className="text-amount right">
                  <p>จำนวน</p>
                  <p style={{ color: "#C4C4C4" }}>รอการจัดสรร</p>
                  <p>หน่วย</p>
                </div>
              </div>
              <div className="content-detail-share">
                <div className="text-title">
                  <p>หุ้นจองซื้อเกินสิทธิ</p>
                  <p className="text-black">{rightStockName || "-"}</p>
                </div>
                <div className="text-amount right">
                  <p>จำนวน</p>
                  <b className="text-black">
                    {formatNumber(excessVolume) || "-"}{" "}
                  </b>
                  <p>หุ้น</p>
                </div>
              </div>
              <div
                className="content-detail-share"
                style={{ marginTop: "10px" }}
              >
                <div className="text-title-end">
                  <p>รวมเป็นเงินทั้งสิ้น</p>
                  <b className="text-black" style={{ fontSize: "28px" }}>
                    {formatNumber(currentPrice) || "-"} บาท
                  </b>
                </div>
              </div>
            </div>
          </div>
          {previewImage && (
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}
            >
              <img
                src={previewImage}
                style={{ width: "100%", height: "600px", maxWidth: "600px" }}
              />
            </div>
          )}
          {isCheckRight && (
            <>
              <div
                className="content-header"
                style={{
                  paddingLeft: "2rem",
                  backgroundColor: "#F1F7FB",
                  color: persianblue,
                }}
              >
                <b>รายละเอียดการจัดสรรหุ้นเพิ่มทุนที่ได้รับ</b>
              </div>
              <div className="content-member">
                <div className="content-detail-member">
                  <div className="content-detail-text share">
                    <p>จองตามสิทธิ</p>
                    <p>จำนวน</p>
                    <b style={{ color: "#000000" }}>
                      {formatNumber(optional1) || "-"}
                    </b>
                    <p>หุ้น</p>
                  </div>
                </div>
                <div className="content-detail-member">
                  <div className="content-detail-text share">
                    <p>จองเกินสิทธิ</p>
                    <p>จำนวน</p>
                    <b style={{ color: "#000000" }}>
                      {formatNumber(optional2) || "-"}
                    </b>
                    <p>หุ้น</p>
                  </div>
                </div>
                <div className="content-detail-member">
                  <div className="content-detail-text share">
                    <p>รวมจำนวนหุ้นที่ได้รับทั้งสิ้น</p>
                    <p>จำนวน</p>
                    <b style={{ color: "#000000" }}>
                      {formatNumber(optional3) || "-"}
                    </b>
                    <p>หุ้น</p>
                  </div>
                </div>
                <div className="content-detail-member">
                  <div className="content-detail-text share">
                    <p>รวมจำนวนใบสำคัญแสดงสิทธิที่ได้รับทั้งสิ้น</p>
                    <p>จำนวน</p>
                    <b style={{ color: "#000000" }}>
                      {formatNumber(optional4) || "-"}
                    </b>
                    <p>หุ้น</p>
                  </div>
                </div>
              </div>
            </>
          )}
          {depositBank && (
            <>
              <div
                className="content-header"
                style={{
                  paddingLeft: "2rem",
                  marginTop: "1rem",
                  backgroundColor: "#F1F7FB",
                  color: persianblue,
                }}
              >
                <b>
                  กรณีหุ้นที่ไม่ได้รับการจัดสรรขอให้โอนเงินคืนเข้าผ่านบัญชีธนาคาร
                </b>
              </div>
              <div className="content-member">
                <div className="content-detail-member">
                  <div className="content-detail-text">
                    <p className="bank-title" style={{ margin: "auto" }}>
                      ฝากเข้าผ่านธนาคาร :
                    </p>
                    <div className="bank-logo-img">
                      <img
                        src={depositBank.logo}
                        height={"33px"}
                        width={"32px"}
                        style={{
                          margin: "auto",
                          marginRight: "1rem",
                          marginLeft: "1rem",
                        }}
                      />
                      <p className="text-black" style={{ margin: "auto" }}>
                        {depositBank.nameTH}
                      </p>
                    </div>
                  </div>
                  <div
                    className="content-detail-text right"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    <p>เลขที่บัญชี :</p>
                    <p
                      className="detail-text-label"
                      style={{ marginTop: "auto", marginBottom: "auto" }}
                    >
                      {bank}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </FlexContainer>
      <div className="line-space" style={{ padding: "0 20px" }}>
        <hr style={{ border: "0.75px solid #D9E1E7" }} />
      </div>
      {isBuy && (
        <>
          <div
            className="message-info"
            style={{
              paddingLeft: "10px",
              width: "100%",
              whiteSpace: "initial",
              color: "#1234B0",
            }}
          >
            <p>
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ margin: "0 10px", color: "#FB0303" }}
              />
              โปรดตรวจสอบข้อมูลของท่านให้เรียบร้อย หากท่านกดปุ่ม <b>ถัดไป</b>{" "}
              จะไม่สามารถกลับมาแก้ไขข้อมูลได้อีก
            </p>
          </div>
        </>
      )}
      {checkbox && (
        <>
          <div className="content-member">
            <div className="content-detail-member">
              <FlexContainer>
                <div style={{ width: "100%", fontSize: "20px" }}>
                  <div className="content-detail-condition">
                    <p className="text-title">ข้อตกลง :</p>
                    <p
                      className="text-black"
                      style={{
                        fontSize: "20px",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <input
                        type={"checkbox"}
                        value={lastVerifyChecked}
                        onChange={() =>
                          setLastVerifyChecked(!lastVerifyChecked)
                        }
                        style={{
                          transform: "scale(1.5)",
                          marginLeft: "1rem",
                          marginRight: "1rem",
                          textAlign: "center",
                        }}
                      />{" "}
                      ข้าพเจ้าขอรับรองว่า
                      ข้าพเจ้าในฐานะผู้ถือหุ้นได้รับการจัดสรรหุ้นสามัญออกใหม่
                      เป็นผู้รับประโยชน์ที่แท้จริง
                      <br />
                      **รายการจะสมบูรณ์
                      เมื่อท่านยืนยันรายการและบริษัทตรวจสอบผลการชำระเงินครบถ้วนสมบูรณ์
                    </p>
                  </div>
                </div>
              </FlexContainer>
            </div>
          </div>
        </>
      )}
      <div
        className="btn-accept-buy"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {(() => {
          if (checkbox) {
            return (
              <>
                <Button
                  type="submit"
                  value={"ย้อนกลับ"}
                  onClick={() => hanlderOnBack()}
                  style={{
                    height: "40px",
                    margin: "0 10px 10px 10px",
                    backgroundColor: "#809FB8",
                  }}
                />
                <Button
                  type="submit"
                  value={"ถัดไป"}
                  onClick={() => handlerOnAccept()}
                  disabled={!lastVerifyChecked}
                  style={{
                    height: "40px",
                    margin: "0 10px 10px 10px",
                  }}
                />
              </>
            );
          } else if (isBuy) {
            return (
              <>
                <Button
                  type="submit"
                  value={"ย้อนกลับ"}
                  onClick={() => hanlderOnBack()}
                  style={{
                    height: "40px",
                    margin: "0 10px 10px 10px",
                    backgroundColor: "#809FB8",
                  }}
                />
                <Button
                  type="submit"
                  value={"ถัดไป"}
                  onClick={() => handlerOnAccept()}
                  style={{
                    height: "40px",
                    margin: "0 10px 10px 10px",
                  }}
                />
              </>
            );
          } else {
            return (
              <Button
                type="submit"
                value={"ปิดหน้าต่าง"}
                onClick={() => handlerOnAccept()}
                style={{
                  height: "40px",
                  margin: "0 10px 10px 10px",
                }}
              />
            );
          }
        })()}
      </div>
    </>
  );
};

const Button = styled.input`
  width: 100%;
  height: 54px;
  background-color: ${persianblue};
  color: #ffffff;
  border: none;
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
