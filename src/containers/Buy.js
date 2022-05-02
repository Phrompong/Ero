import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";

import change from "../assets/icon_change.png";

import { Card } from "../components/UI/Card";
import { FlexContainer } from "../components/UI/FlexContainer";
import { DropdownSelect, DropdownArrow } from "../components/UI/Dropdown";
import { LineCard } from "../components/UI/Card";
import { FieldInput } from "../components/UI/Search";
import { ModalAlert } from "../components/ModalAlert/ModalAlert";
import { showAlert } from "../utils/showAlert";
import { Modal } from "../components/UI/Modal";

import { balihai, ivory, persianblue, shamrock, white } from "../utils/color";
import {
  httpFetch,
  httpPostRequest,
  httpGetRequest,
  httpPostRequestUploadFile,
} from "../utils/fetch";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ViewProfile from "../components/ViewProfile/ViewProfile";

const Buy = () => {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState();

  const [currentStockVolume, setCurrentStockVolume] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdownArrow, setIsOpenDropdownArrow] = useState(false);
  const [validateAccept, setValidateAccept] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [registrationNo, setRegistrationNo] = useState(false);

  // step 1
  const [shareName, setShareName] = useState("-");
  const [shareDescription, setShareDescription] = useState("-");
  const [fullname, setFullname] = useState(null);
  const [shareId, setShareId] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [shareOption, setShareOption] = useState([]);
  const [dropdownSelect, setDropdownSelect] = useState(null);
  const [isReadMore, setIsReadMore] = useState(false);
  const [tradingAccountNo, setTradingAccountNo] = useState(null);

  // modal
  const [fullnameModal, setFullnameModal] = useState(null);
  const [shareIdModal, setShareIdModal] = useState(null);
  const [phoneNoModal, setPhoneNoModal] = useState(null);

  // step 2
  const [customerStockId, setCustomerStockId] = useState(null);
  const [rightStockName, setRightStockName] = useState("-");
  const [stockVolume, setStockVolume] = useState(null);
  const [offerPrice, setOfferPrice] = useState(null);
  const [rightStockVolume, setRightStockVolume] = useState(null);
  const [rightSpecialName, setRightSpecialName] = useState("-");
  const [rightSpecialVolume, setRightSpecialVolume] = useState(null);
  const [excessVolume, setExcessVolume] = useState(null);
  const [isAcceptVerify, setIsAcceptVerify] = useState(false)

  // step 3
  const [logo, setLogo] = useState(null);
  const [nameTH, setNameTH] = useState(null);
  const [ref1, setRef1] = useState(null);
  const [ref2, setRef2] = useState(null);
  const [qrCode, setQRCode] = useState(null);
  const [radioCheckedPayment, setRadioCheckPayment] = useState(false);

  // addres modal
  const [addressModal, setAddressModal] = useState(false);
  const [addressName, setAddressName] = useState(null);
  const [addressHouseNo, setAddressHouseNo] = useState(null);
  const [addressDistrict, setAddressDistrict] = useState(null);
  const [addressProvince, setAddressProvince] = useState(null);
  const [addressZipcode, setAddressZipcode] = useState(null);
  const [addressTel, setAddressTel] = useState(null);

  const [file, setFile] = useState();
  const [orderId, setOrderId] = useState(null);

  const [masterBankRefund, setMasterBankRefund] = useState([]);
  const [masterBankPayment, setMasterBankPayment] = useState([]);
  const [bank, setBank] = useState(null);
  const [depositBank, setDepositBank] = useState(null);

  const [profile, setProfile] = useState(null);

  const fetchStep1 = () => {
    getCustomerProfile();
    getBrokers();
  };

  const fetchStep2 = () => {
    getCustomerStock();
    getMasterBank();
    fetchDataProfile();
  };

  const fetchStep3 = () => {
    getMasterBank();
  };

  const getCustomerProfile = async () => {
    const [res, status] = await httpGetRequest(
      `customerStocks?customerId=${user.customerId}`
    );

    if (status === 200) {
      const payload = res.data[0];
      setFullname(`${payload.customerId.name} ${payload.customerId.lastname}`);
      setShareId(payload.registrationNo);
      setPhoneNo(payload.customerId.telephone);
      setRegistrationNo(payload.registrationNo);
      setFullnameModal(
        `${payload.customerId.name} ${payload.customerId.lastname}`
      );
      setShareIdModal(payload.registrationNo);
      setPhoneNoModal(payload.customerId.telephone);
    }
  };

  const getBrokers = async () => {
    const [res, status] = await httpGetRequest("masterBrokers");

    if (status === 200) {
      const payload = res.data;
      const _options = payload.map((data) => {
        return {
          ...data,
          fullname: `${data.code} ${data.name}`,
        };
      });
      setShareOption(_options);
    }
  };

  const getCustomerStock = async () => {
    const [res, status] = await httpGetRequest(
      `customerStocks?customerId=${user.customerId}&registrationNo=${registrationNo}`
    );

    if (status === 200) {
      const payload = res.data;
      setCustomerStockId(payload._id);
      setRightStockName(payload.rightStockName);
      setStockVolume(payload.stockVolume);
      setOfferPrice(payload.offerPrice);
      setRightStockName(payload.rightStockName);
      setRightStockVolume(payload.rightStockVolume || "-");
      setRightSpecialName(payload.rightSpecialName);
      setRightSpecialVolume(payload.rightSpecialVolume);
    }
  };

  const getMasterBank = async () => {
    const [res, status] = await httpGetRequest("masterBanks");

    if (status === 200) {
      const payload = res.data;
      setMasterBankPayment(payload.filter((o) => o.type === "payment"));
      setMasterBankRefund(payload.filter((o) => o.type === "refund"));
    }
  };

  const handlerOnSubmited = async () => {
    setValidateAccept(true);
  };

  const handlerOnAcceptVerify = () => {
    setAddressModal(false)
    setIsAcceptVerify(true)
  }

  const handleSelectedFile = (e) => {
    const [file] = e.target.files;
    const maxAllowedSize = 5 * 1024 * 1024;
    const { name: fileName, size } = file;
    if (size > maxAllowedSize) {
      setStatus(999)
      setAlertMessage("ขนาดไฟล์รูปภาพใหญ่เกินไป");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    } else {
      setFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setStatus(999)
      setAlertMessage("ไม่พบไฟล์ภาพ");
      setShowAlertModal(true);
    }
    const formData = new FormData();
    formData.append("File", file);
    const endpoint = `uploads/image?orderId=${orderId}`;

    const [res, status] = await httpPostRequestUploadFile(formData, endpoint);
    let msg = res.message;
    setStatus(status);
    if (status === 200) {
      msg = "Upload Completed";
      console.log(msg);
      setAlertMessage(msg);
      showAlert(setShow, 2000);
      setFile();
      // navigate(`/somewhere`)
    }
  };

  const hanlderOnBack = () => {
    setValidateAccept(false);
    setPage(2);
  };

  const handlerOnClickPage = (page) => {
    if (!dropdownSelect) {
      setShow(true);
      setStatus(999)
      setAlertMessage(
        "กรุณาเลือกข้อมูล ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก"
      );
      setTimeout(() => {
        setShow(false);
      }, 5000);
    } else if (!tradingAccountNo) {
      setShow(true);
      setStatus(999)
      setAlertMessage("กรุณากรอกข้อมูล เลขที่บัญชีซื้อขาย");
      setTimeout(() => {
        setShow(false);
      }, 5000);
    } else {
      setPage(page);
    }
  };

  async function fetchDataProfile() {
    let endpoint = `masterCustomers/${user.customerId}`;

    const [res, status] = await httpGetRequest(endpoint);
    console.log(res["data"]);
    setProfile(res["data"]);
  }

  const handlerOnAccept = async () => {
    setValidateAccept(false);

    const [res, status] = await httpFetch(
      "POST",
      {
        customerId: user.customerId,
        rightStockName,
        stockVolume,
        rightSpecialName,
        rightSpecialVolume,
        paidRightVolume: Number(currentStockVolume),
        paidSpecialVolume: 0,
        paymentAmount: Number(currentPrice),
        returnAmount: 0,
        customerName: fullname,
        customerTel: phoneNo,
        brokerId: dropdownSelect._id,
        accountNo: tradingAccountNo,
        customerStockId: customerStockId,
        excessVolume,
        address: {
          name: addressName,
          houseNo: addressHouseNo,
          district: addressDistrict,
          province: addressProvince,
          zipcode: addressZipcode,
          tel: addressTel,
        },
        registrationNo: shareId,
      },
      "orders"
    );

    if (status === 200) {
      setOrderId(res.data._id);
      const msg = "ยืนยันคำสั่งซื้อสำเร็จ";
      setStatus(200)
      setAlertMessage(msg);
      showAlert(setShow, 2000);
      setPage(3);
    }
  };

  const handlerOnEdit = () => {
    setShowModal(true);

    setFullnameModal(fullname);
    setShareIdModal(shareId);
    setPhoneNoModal(phoneNo);
  };

  const handlerOnCloseModal = () => {
    setShowModal(false);

    setFullnameModal(fullname);
    setShareIdModal(shareId);
    setPhoneNoModal(phoneNo);
  };

  const handlerOnAcceptModal = (page) => {
    if (page === 1) {
      setShowModal(false);
      setShowAlertModal(true);

      setFullname(fullnameModal);
      setShareId(shareIdModal);
      setPhoneNo(phoneNoModal);
    } else if (page === 2) {
      setShowAlertModal(false);
    }
  };

  const handlerOnReadMore = () => {
    if (!isReadMore) {
      setShareDescription(`
          บมจ. เน็คซ์ แคปปิตอล (“บริษัท” หรืด “NCAP”) เปิดเผยว่า ที่ประชุมสามัญผู้ถือหุ้น ประจำปี 2565 ของบริษัท เน็คซ์ แคปปิตอล จำกัด (มหาชน) เมื่อวันที่ 21 เมษายน 2565 ได้มีมติอนุมัติการจัดสรรหุ้นสามัญเพิ่มทุนใหม่จำนวน450,000,000 หุ้น มูลค่าที่ตราไว้หุ้นละ 0.50 บาท เพื่อเสนอขายให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้น โดยไม่จัดสรรให้ผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศพร้อมใบสำคัญแสดงสิทธิ ในอัตราส่วน 2 หุ้นสามัญเดิมต่อ 1 หุ้นสามัญเพิ่มทุนใหม่ (ในกรณีมีเศษของหุ้นที่เกิดจากการคำนวณ ให้ปัดเศษของหุ้นนั้นทิ้ง) ในราคาเสนอขายหุ้นละ 4.50 บาท ที่มีรายชื่อปรากฏอยู่ในวันกำหนดรายชื่อผู้ถือหุ้น (Record Date) ในวันที่ 29 เมษายน 2565 และจัดสรรใบสำคัญแสดงสิทธิที่จะซื้อหุ้นสามัญ (NCAP-W1) (“ใบสำคัญแสดงสิทธิ”) จำนวน 225,000,000 หน่วย ให้แก่ผู้ถือหุ้นเดิมของบริษัทที่ได้จองซื้อหุ้นสามัญเพิ่มทุนของบริษัท (Right Offering) ในอัตราส่วน 2 หุ้นสามัญเพิ่มทุน ต่อ 1 หน่วยใบสำคัญแสดงสิทธิ (ในกรณีที่มีเศษหุ้นจากการคำนวณให้ปัดทิ้ง) ที่ราคาเสนอขายใบสำคัญแสดงสิทธิ หน่วยละ 0 บาท 
        ในการจัดสรรหุ้นสามัญเพิ่มทุนให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นที่ผู้ถือหุ้นแต่ละรายถือ อยู่ในครั้งนี้ โดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศ ในกรณีที่มีหุ้นสามัญเพิ่มทุนเหลือจากการจัดสรรให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นที่ผู้ถือหุ้นแต่ละรายถืออยู่ในรอบแรกแล้ว โดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศ บริษัทจะจัดสรรหุ้นสามัญเพิ่มทุนที่เหลือดังกล่าวให้กับผู้ถือหุ้นเดิมที่ประสงค์จะจองซื้อเกินกว่าสิทธิตาม สัดส่วนการถือหุ้นเดิมโดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศในราคาเดียวกันกับหุ้นที่ได้รับการจัดสรรตามสิทธิดังนี้
        ในกรณีที่มีหุ้นเหลือจากการจัดสรรให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นโดยไม่ จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศที่แต่ละรายถืออยู่ในรอบ แรกเป็นจำนวนมากกว่าหรือเท่ากับหุ้นที่ผู้ถือหุ้นเดิมจองซื้อเกินกว่าสิทธิ บริษัทจะจัดสรรหุ้นที่เหลือดังกล่าวให้แก่ผู้ที่จองซื้อเกินกว่าสิทธิและชำระค่าจองซื้อหุ้นดังกล่าวทั้งหมดทุกรายตามจำนวนที่แสดงความจำนงจองซื้อเกินกว่าสิทธิ
        ในกรณีที่มีหุ้นเหลือจากการจัดสรรให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นโดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศที่แต่ละรายถืออยู่ในรอบแรกเป็นจำนวนน้อยกว่าหุ้นที่ผู้ถือหุ้นเดิมจองซื้อเกินกว่าสิทธิ บริษัทจะจัดสรรหุ้นที่เหลือดังกล่าวให้แก่ผู้ที่จองซื้อเกินกว่าสิทธิตามขั้นตอนดังต่อไปนี้
        (ก) จัดสรรตามสัดส่วนการถือหุ้นเดิมของผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายโดยไม่จัดสรร ให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศ โดยนำสัดส่วนการถือหุ้นเดิมของผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายคูณด้วยจำนวนหุ้นที่เหลือจะได้เป็นจำนวนหุ้นที่ผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายมีสิทธิที่จะได้รับจัดสรร ในกรณีที่มีเศษของหุ้นให้ ปัดเศษของหุ้นนั้นทิ้ง ทั้งนี้ จำนวนหุ้นที่จะได้รับการจัดสรรจะไม่เกินจำ นวนหุ้นที่ผู้ถือหุ้น แต่ละรายจองซื้อและชำระค่าจองซื้อแล้ว 
        (ข) ในกรณีที่ยังมีหุ้นคงเหลือหลังจากการจัดสรรตามข้อ (ก) ให้ทำการจัดสรรให้แก่ผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายซึ่งยังได้รับการจัดสรรไม่ครบตามจำนวนหุ้นที่จองซื้อนั้น โดยนำสัดส่วนการถือหุ้นเดิมของผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายนั้นคูณด้วยจำนวนหุ้นที่เหลือ จะได้เป็นจำนวนหุ้นที่ผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายมีสิทธิที่จะได้รับจัดสรร ในกรณีที่มี เศษของหุ้นให้ปัดเศษของหุ้นนั้นทิ้ง โดยจำนวนหุ้นที่จะได้รับการจัดสรรจะไม่เกินจำนวนหุ้นที่ผู้ถือหุ้นแต่ละรายจองซื้อและชำระค่าจองซื้อแล้ว ทั้งนี้ ให้ดำเนินการจัดสรรหุ้นให้แก่ผู้ที่จองซื้อเกินกว่าสิทธิตามวิธีการในข้อ (2) นี้จนกระทั่งไม่มีหุ้นเหลือจากการจัดสรร หรือไม่สามารถจัดสรรได้อีกเนื่องจากเป็นเศษของหุ้น
        การจัดสรรหุ้นที่จองซื้อเกินกว่าสิทธิจะต้องไม่ทำให้ผู้ถื้อหุ้นที่จองซื้อหุ้นสามัญเพิ่มทุนเกินกว่าสิทธิรายใดมีหน้าที่ต้องทำคำเสนอซื้อหลักทรัพย์ (Tender Offer) ตามที่กำหนดในประกาศคณะกรรมการกำกับตลาดทุนที่ ทจ.12/2554 เรื่อง หลักเกณฑ์ เงื่อนไข และวิธีการในการเข้าถือหลักทรัพย์เพื่อครอบงำกิจการ ลงวันที่ 13 พฤษภาคม 2554 (รวมทั้งที่ได้มีการแก้ไขเพิ่มเติม)
        ในการจัดสรรหุ้นสามัญเพิ่มทุนให้กับผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นโดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศตามรายละเอียดข้างต้นไม่ว่ากรณีใด จะต้องไม่มีลักษณะที่เป็นการฝ่าฝืนข้อจำกัดการถือหุ้นของบุคคลผู้ไม่มีสัญชาติไทย ตามที่ระบุไว้ในข้อบังคับของบริษัท และคณะกรรมการบริษัทมีสิทธิใช้ดุลยพินิจพิจารณาไม่เสนอขายหุ้นสามัญเพิ่มทุนให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นโดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศ หากการเสนอขายดังกล่าวทำให้หรืออาจเป็นผลให้บริษัทมีภาระหรือหน้าที่ต้องปฏิบัติหรือดำเนินการใดๆ ตามกฎหมายต่างประเทศ ซึ่งได้แก่ ประเทศสหรัฐอเมริกา 
      `);
      setIsReadMore(true);
    } else {
      const desc = `บมจ.สกาย ทาวเวอร์ (STOWER) เปิดเผยว่า ที่ประชุมคณะกรรมการบริษัท ครั้งที่ 3/2565 เมื่อวันที่ 18 มี.ค.65 มีมติให้นำเสนอต่อที่ประชุมสามัญผู้ถือหุ้น ประจำปี 2565 เพื่อพิจารณาอนุมัติการออกและเสนอขายหุ้นสามัญเพิ่มทุนของบริษัทจำนวนไม่เกิน 17,979,717,949 หุ้นให้แก่ผู้ถือหุ้นเดิมตามสัดส่วนจำนวนหุ้น
        ที่ผู้ถือหุ้นแต่ละรายถือยู่ (Right Offering) ในอัตราส่วนการจัดสรร 1.5 หุ้นสามัญเดิมต่อ 1 หุ้นสามัญเพิ่มทุน โดยมีราคาเสนอขาย หุ้นละ 0.05 บาท พร้อมใบสำคัญแสดงสิทธิ STOWER -W4 ในอัตราส่วน 2.7 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
        และหุ้นสามัญเพิ่มทุนส่วนที่เหลือจาก Right Offering จะจัดสรรให้กับบุคคลในวงจำกัด พร้อมใบสำคัญแสดงสิทธิ STOWER-W4 ในอัตราส่วน 3 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
      `;
      setShareDescription(desc);
      setIsReadMore(false);
    }
  };

  useEffect(() => {
    if (page === 1) {
      fetchStep1();
    } else if (page === 2) {
      fetchStep2();
    } else if (page === 3) {
      fetchStep3();
    }
  }, [page]);

  useEffect(() => {
    setCurrentPrice(Number(currentStockVolume) * Number(offerPrice));
    setExcessVolume(
      Number(currentStockVolume) > Number(rightStockVolume)
        ? Number(currentStockVolume) - Number(rightStockVolume)
        : 0
    );
  }, [currentStockVolume]);

  useEffect(() => {
    setShareName("บมจ.สกาย ทาวเวอร์ (STOWER)");
    const desc = `บมจ.สกาย ทาวเวอร์ (STOWER) เปิดเผยว่า ที่ประชุมคณะกรรมการบริษัท ครั้งที่ 3/2565 เมื่อวันที่ 18 มี.ค.65 มีมติให้นำเสนอต่อที่ประชุมสามัญผู้ถือหุ้น ประจำปี 2565 เพื่อพิจารณาอนุมัติการออกและเสนอขายหุ้นสามัญเพิ่มทุนของบริษัทจำนวนไม่เกิน 17,979,717,949 หุ้นให้แก่ผู้ถือหุ้นเดิมตามสัดส่วนจำนวนหุ้น
    ที่ผู้ถือหุ้นแต่ละรายถือยู่ (Right Offering) ในอัตราส่วนการจัดสรร 1.5 หุ้นสามัญเดิมต่อ 1 หุ้นสามัญเพิ่มทุน โดยมีราคาเสนอขาย หุ้นละ 0.05 บาท พร้อมใบสำคัญแสดงสิทธิ STOWER -W4 ในอัตราส่วน 2.7 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
               และหุ้นสามัญเพิ่มทุนส่วนที่เหลือจาก Right Offering จะจัดสรรให้กับบุคคลในวงจำกัด พร้อมใบสำคัญแสดงสิทธิ STOWER-W4 ในอัตราส่วน 3 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
    `;
    setShareDescription(desc);
  }, []);

  return (
    <Card>
      <Modal show={showAlertModal} style={{ marginLeft: "10%", width: "100%" }}>
        <Card style={{ width: "1200px" }}>
          <ContainerCard>
            <Header style={{ textAlign: "center" }}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  fontSize: "60px",
                  color: "#1D3AB1",
                  border: "8px solid #1D3AB1",
                  padding: "10px",
                  width: "60px",
                  borderRadius: "100%",
                }}
              />
            </Header>
            <Header style={{ textAlign: "center" }}>
              <h3
                style={{
                  fontSize: "24px",
                  color: "#1D3AB1",
                  fontWeight: "bold",
                }}
              >
                เปลี่ยนแปลงข้อมูลเรียบร้อยแล้ว
              </h3>
            </Header>
            <Header style={{ textAlign: "center" }}>
              <h3
                style={{
                  fontSize: "20px",
                  color: "#000000",
                  fontWeight: "normal",
                }}
              >
                ระบบได้ทำการเปลี่ยนแปลงข้อมูลที่ท่านแก้ไขแล้ว
              </h3>
            </Header>
            <Header style={{ textAlign: "center" }}>
              <Button
                type="submit"
                value={"ตกลง"}
                onClick={() => handlerOnAcceptModal(2)}
                style={{
                  fontSize: "16px",
                  height: "35px",
                  width: "50%",
                  marginTop: "20px",
                }}
              />
            </Header>
          </ContainerCard>
        </Card>
      </Modal>
      <Modal show={showModal} style={{ marginLeft: "10%", width: "100%" }}>
        <Card style={{ width: "60%" }}>
          <ContainerCard>
            {/* <div className="text-info">
              <p><FontAwesomeIcon icon={faCircleInfo} style={{ margin: '0 10px' }} />กรณีที่ท่านไม่มีบัญชีธนาคารดังรายการ ดังนี้</p>
            </div> */}
            <Header style={{ margin: "20px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  color: "#1D3AB1",
                  fontWeight: "bold",
                }}
              >
                ข้อมูลการจองสิทธิ์
              </h3>
            </Header>
            <LineCard style={{ padding: "40px" }}>
              <div style={{ display: "flex", width: "100%", margin: "10px 0", alignItems: 'baseline' }}>
                <p
                  style={{
                    width: "30%",
                    paddingTop: "8px",
                    fontSize: "14px",
                    marginRight: "2rem"
                  }}
                >
                  ชื่อ - นามสกุล*
                </p>
                <p>
                  {fullnameModal}
                </p>
              </div>
              <div style={{ display: "flex", width: "100%", margin: "10px 0", alignItems: 'baseline' }}>
                <p
                  style={{
                    width: "30%",
                    paddingTop: "8px",
                    fontSize: "14px",
                    marginRight: "2rem"
                  }}
                >
                  เลขทะเบียนผู้ถือหุ้น*
                </p>
                <p>{shareIdModal}</p>
              </div>
              <div style={{ display: "flex", width: "100%", margin: "10px 0" }}>
                <p
                  style={{
                    width: "30%",
                    paddingTop: "8px",
                    fontSize: "14px",
                    marginRight: "3rem",
                  }}
                >
                  เบอร์โทรศัพท์*
                </p>
                <FieldInput
                  value={phoneNoModal}
                  onChange={(e) => setPhoneNoModal(e.target.value)}
                  placeholder={"กรุณากรอกเลขที่บัญชีซื้อขาย"}
                />
              </div>
            </LineCard>
            <div
              className="btn-accept-buy"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                type="submit"
                value={"ปิดหน้าต่าง"}
                onClick={() => handlerOnCloseModal()}
                style={{
                  fontSize: "16px",
                  height: "35px",
                  margin: "0 20px 20px 20px",
                  backgroundColor: "#809FB8",
                }}
              />
              <Button
                type="submit"
                value={"ยืนยันการเปลี่ยนแปลงข้อมูล"}
                onClick={() => handlerOnAcceptModal(1)}
                style={{
                  fontSize: "16px",
                  height: "35px",
                  margin: "0 20px 20px 20px",
                }}
              />
            </div>
          </ContainerCard>
        </Card>
      </Modal>
      <Modal show={addressModal}>
        <Card style={{ height: 'auto', width: '70%' }}>
          <ContainerCard>
            <Header
              style={{ margin: "20px", color: "#1D3AB1", fontWeight: "bold", display: 'flex' }}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ margin: "10px 10px 0px 10px", color: "#FB0303", fontSize: "20px" }}
              />
              <h3>
                กรณีที่ท่านแจ้งบัญชีธนาคารนอกเหนือจาก 9
                ธนาคารทางบริษัทขอคืนเงินให้ท่านเป็นเช็ค
                โดยส่งไปตามที่อยู่ด้านล่าง
              </h3>
            </Header>
            <LineCard style={{ padding: "1rem 2rem", marginBottom: "1rem" }}>

              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                  masterBankRefund.length > 0 && masterBankRefund.map((bank, index) => {
                    return <>
                      <LineCard style={{ width: '100%', flexBasis: '46%', margin: "10px", display: "flex", padding: "5px" }}>
                        <img
                          src={bank.logo}
                          width={25}
                          height={25}
                          style={{ margin: 'auto', marginLeft: '1rem' }}
                        />
                        <p
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginLeft: "2rem",
                          }}
                        >
                          {bank.nameTH}
                        </p>
                      </LineCard>
                    </>
                  })
                }
              </div>
            </LineCard>
            <LineCard style={{ marginBottom: '1rem' }}>
              <Header style={{ color: "#1D3AB1", fontWeight: "bold", marginLeft: '2rem' }}>
                <h3>
                  รายละเอียดที่อยู่ของท่าน
                </h3>
              </Header>
              <div class="profile-detail" style={{ padding: '1rem 2rem' }}>
                <div style={{ display: 'flex' }}>
                  <p style={{ width: '30%' }}>ชื่อ-นามสกุล :</p>
                  <p style={{ width: '70%' }}>{profile ? profile.name : '-'} {profile ? profile.lastname : '-'}</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <p style={{ width: '30%' }}>ที่อยู่ :</p>
                  <p style={{ width: '70%' }}>address</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <p style={{ width: '30%' }}>เบอร์โทรศัพท์ :</p>
                  <p style={{ width: '70%' }}>{phoneNo}</p>
                </div>
              </div>
            </LineCard>
            <div style={{ margin: "auto", width: "400px" }}>
              <Button
                type="submit"
                value={"ฉันรับทราบแล้ว"}
                onClick={handlerOnAcceptVerify}
              />
            </div>
          </ContainerCard>
        </Card>
      </Modal>
      <Modal show={false} style={{ padding: '50px' }}>
        <Card style={{ height: 'auto', width: '60%' }}>
          <ContainerCard>
            <Header
              style={{ margin: "20px", color: "#1D3AB1", fontWeight: "bold" }}
            >
              <h3>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ margin: "0 10px", color: "#FB0303" }}
                />
                กรณีที่ท่านแจ้งบัญชีธนาคารนอกเหนือจาก 9
                ธนาคารทางบริษัทขอคืนเงินให้ท่านเป็นเช็ค
                โดยส่งไปตามที่อยู่ด้านล่าง
              </h3>
            </Header>
            <LineCard style={{ padding: "1rem 2rem", marginBottom: "1rem" }}>
              {masterBankRefund.length > 0 &&
                masterBankRefund.map((bank, index) => (
                  <LineCard
                    style={{ margin: "10px", display: "flex", padding: "5px" }}
                  >
                    <img
                      src={bank.logo}
                      width={25}
                      height={25}
                      style={{ marginLeft: "3rem" }}
                    />
                    <p
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginLeft: "2rem",
                      }}
                    >
                      {bank.nameTH}
                    </p>
                  </LineCard>
                ))}
            </LineCard>
            <LineCard
              style={{
                padding: "1rem 2rem",
                marginBottom: "1rem",
              }}
            >
              <Header
                style={{
                  margin: "0 0 20px 0",
                  fontWeight: "bold",
                  color: "#1D3AB1",
                }}
              >
                <h3>กรุณากรอกรายละเอียดที่อยู่ของท่าน</h3>
              </Header>
              <ViewProfile header="" profile={profile} />
            </LineCard>
            <div style={{ margin: "auto", width: "400px" }}>
              <Button
                type="submit"
                value={"ฉันรับทราบแล้ว"}
                onClick={() => setAddressModal(false)}
              />
            </div>
          </ContainerCard>
        </Card>
      </Modal>
      <Container>
        <ModalAlert show={show} msg={alertMessage} status={status} />
        {validateAccept ? (
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
                <b>รายละเอียดข้อมูลคำสั่งซื้อการจองสิทธิ</b>
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
                    paddingLeft: "50px",
                    backgroundColor: "#F1F7FB",
                    color: persianblue,
                    margin: "10px 0",
                  }}
                >
                  <b>ข้อมูลทั่วไปของสมาชิก</b>
                </div>
                <div
                  className="content-member"
                  style={{ marginLeft: "20px", marginTop: "10px" }}
                >
                  <div
                    className="content-detail-member"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="content-detail-text">
                      <p>ชื่อ-นามสกุล :</p>
                      <p className="text-black">{fullname}</p>
                    </div>
                    <div className="content-detail-text">
                      <p>เลขทะเบียนผู้ถือหุ้น :</p>
                      <p className="text-black">{shareId}</p>
                    </div>
                  </div>
                  <div
                    className="content-detail-member"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="content-detail-text">
                      <p>เบอร์โทรศัพท์ :</p>
                      <p className="text-black">{phoneNo}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="content-header"
                  style={{
                    paddingLeft: "50px",
                    backgroundColor: "#F1F7FB",
                    color: persianblue,
                  }}
                >
                  <b>รายละเอียดการจัดสรรหุ้น</b>
                </div>
                <div
                  className="content-member"
                  style={{ marginLeft: "20px", marginTop: "10px" }}
                >
                  <div
                    className="content-detail-member"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="content-detail-text">
                      <p>ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก :</p>
                      <p className="text-black">
                        {dropdownSelect.code} {dropdownSelect.name}
                      </p>
                    </div>
                  </div>
                  <div
                    className="content-detail-member"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="content-detail-text">
                      <p>เลขที่บัญชีซื้อขาย :</p>
                      <p className="text-black">{tradingAccountNo}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="content-header"
                  style={{
                    paddingLeft: "50px",
                    backgroundColor: "#F1F7FB",
                    color: persianblue,
                  }}
                >
                  <b>รายละเอียดการสั่งซื้อ</b>
                </div>
                <div
                  className="content-member"
                  style={{ marginLeft: "20px", marginTop: "10px" }}
                >
                  <div className="content-detail-member">
                    <div className="content-detail-share">
                      <div className="text-title">
                        <p>หุ้นเดิม</p>
                        <p className="text-black">{rightStockName}</p>
                      </div>
                      <div className="text-amount">
                        <p>จำนวน</p>
                        <b
                          className="text-black"
                          style={{ marginLeft: "-20px" }}
                        >
                          {rightStockVolume}
                        </b>
                        <p>หุ้น</p>
                      </div>
                    </div>
                    <div className="content-detail-share">
                      <div className="text-title">
                        <p>ราคาเสนอขายหุ้นละ</p>
                        <p className="text-black">{offerPrice} บาท</p>
                      </div>
                      <div className="text-amount"></div>
                    </div>
                    <div className="content-detail-share">
                      <div className="text-title">
                        <p>สิทธิ์ในการจองซื้อหุ้นเพิ่มทุน</p>
                        <p className="text-black">{rightStockName}</p>
                      </div>
                      <div className="text-amount">
                        <p>จำนวน</p>
                        <b
                          className="text-black"
                          style={{ marginLeft: "-20px" }}
                        >
                          {rightStockVolume}
                        </b>
                        <p>หุ้น</p>
                      </div>
                    </div>
                    <div className="content-detail-share">
                      <div className="text-title">
                        <p>สิทธิเพิ่มเติม</p>
                        <p className="text-black">{rightSpecialName}</p>
                      </div>
                      <div className="text-amount">
                        <p>จำนวน</p>
                        <b
                          className="text-black"
                          style={{ marginLeft: "-20px" }}
                        >
                          {rightSpecialVolume}
                        </b>
                        <p>หุ้น</p>
                      </div>
                    </div>
                    <div className="content-detail-share">
                      <div className="text-title">
                        <p>หุ้นจองซื้อเกินสิทธิ์</p>
                        <p className="text-black">{rightStockName}</p>
                      </div>
                      <div className="text-amount">
                        <p>จำนวน</p>
                        <b
                          className="text-black"
                          style={{ marginLeft: "-20px" }}
                        >
                          {excessVolume}
                        </b>
                        <p>หุ้น</p>
                      </div>
                    </div>
                    <div
                      className="content-detail-share"
                      style={{ marginTop: "10px" }}
                    >
                      <div className="text-title">
                        <p>รวมเป็นเงินทั้งสิ้น</p>
                        <b className="text-black" style={{ fontSize: "28px" }}>
                          {currentPrice} บาท
                        </b>
                      </div>
                      <div className="text-amount"></div>
                    </div>
                  </div>
                </div>
              </div>
            </FlexContainer>
            <div className="line-space" style={{ padding: "0 20px" }}>
              <hr style={{ border: "0.75px solid #D9E1E7" }} />
            </div>
            <div
              className="message-info"
              style={{ margin: "10px 10px 10px 10px", color: "#1234B0" }}
            >
              <p>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ margin: "0 10px", color: "#FB0303" }}
                />
                โปรดตรวจสอบข้อมูลของท่านให้เรียบร้อย หากท่านกดปุ่ม <b>ถัดไป</b> จะไม่สามารถกลับมาแก้ไขข้อมูลได้อีก
              </p>
            </div>
            <div
              className="btn-accept-buy"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                type="submit"
                value={"ย้อนกลับ"}
                onClick={() => hanlderOnBack()}
                style={{
                  fontSize: "16px",
                  height: "35px",
                  margin: "0 20px 20px 20px",
                  backgroundColor: "#809FB8",
                }}
              />
              <Button
                type="submit"
                value={"ยืนยันการจอง"}
                onClick={() => handlerOnAccept()}
                style={{
                  fontSize: "16px",
                  height: "35px",
                  margin: "0 20px 20px 20px",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <FlexContainer>
              <StepDiv>
                <div style={{ display: "block", margin: "0 20px" }}>
                  <Step
                    isActive={page === 1}
                    onClick={() => handlerOnClickPage(1)}
                  >
                    <b>1</b>
                    <Line />
                  </Step>
                  <StepDetail isActive={page === 1}>
                    ขั้นตอนที่ 1 - ลงทะเบียนจองสิทธิ์
                  </StepDetail>
                </div>
                <div style={{ display: "block", margin: "0 20px" }}>
                  <Step
                    isActive={page === 2}
                    onClick={() => handlerOnClickPage(2)}
                  >
                    <b>2</b>
                    <Line />
                  </Step>
                  <StepDetail isActive={page === 2}>
                    ขั้นตอนที่ 2 - จัดการจองซื้อ
                  </StepDetail>
                </div>
                <div style={{ display: "block", margin: "0 20px" }}>
                  <Step
                    isActive={page === 3}
                    onClick={() => handlerOnClickPage(3)}
                  >
                    <b>3</b>
                  </Step>
                  <StepDetail isActive={page === 3}>
                    ขั้นตอนที่ 3 - ชำระเงิน
                  </StepDetail>
                </div>
              </StepDiv>
            </FlexContainer>
            <FlexContainer
              style={{ display: "block", justifyContent: "flex-start" }}
            >
              {(() => {
                if (page === 1) {
                  return (
                    <>
                      <LineCard
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                          paddingBottom: "60px",
                        }}
                      >
                        <Header>
                          <h3>ข้อมูลการเสนอขายหุ้นเพิ่มทุน</h3>
                          <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
                            {shareName}
                          </h3>
                        </Header>
                        <Content>
                          <p
                            style={{
                              color: "#1D3AB1",
                              fontWeight: "bold",
                            }}
                          >
                            ข้อมูลโดยสรุป
                          </p>
                          <div className="desc">
                            {/* <p style={{ height: "157.4px" }}>{shareDescription}</p> */}
                            <p>{shareDescription}</p>
                          </div>
                          <div className="btn-read-more">
                            <Button
                              type="submit"
                              value={!isReadMore ? "อ่านต่อ" : "ย่อ"}
                              onClick={() => handlerOnReadMore()}
                              style={{ height: "35px" }}
                            />
                          </div>
                        </Content>
                      </LineCard>
                      <LineCard
                        style={{ width: "100%", paddingBottom: "20px" }}
                      >
                        <Header
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h3
                            style={{
                              color: "#1D3AB1",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            กรอกข้อมูลจองสิทธิ์
                          </h3>
                          <div>
                            <Button
                              type="submit"
                              value="แก้ไข"
                              onClick={() => handlerOnEdit()}
                              style={{
                                fontSize: "16px",
                                backgroundColor: "#EDB52D",
                                fontWeight: "normal",
                                height: "40px",
                                color: "#000000",
                                padding: "0 20px",
                              }}
                            />
                          </div>
                        </Header>
                        <ContentSpace>
                          <InputDiv>
                            <div className="inputField">
                              <p>ชื่อ-นามสกุล</p>
                              <p>{fullname}</p>
                            </div>
                          </InputDiv>
                          <InputDiv>
                            <div className="inputField">
                              <p>เลขทะเบียนผู้ถือหุ้น</p>
                              <p>{shareId}</p>
                            </div>
                          </InputDiv>
                        </ContentSpace>
                        <Content>
                          <InputDiv>
                            <div className="inputField">
                              <p>
                                เบอร์โทรศัพท์ที่สามารถติดต่อได้{" "}
                                <span>{phoneNo}</span>
                              </p>
                            </div>
                          </InputDiv>
                        </Content>
                        <Header>
                          <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
                            รายละเอียดการจัดสรรหุ้น
                          </h3>
                        </Header>
                        <Content>
                          <InputDiv>
                            <Dot />
                            <p>ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก</p>
                          </InputDiv>
                          <InputDiv
                            style={{ marginTop: "20px", marginLeft: "50px" }}
                          >
                            <DropdownSelect
                              options={shareOption}
                              searchFrom={"fullname"}
                              isOpen={isOpenDropdown}
                              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                              onBlur={() => setIsOpenDropdown(false)}
                              setSelected={setDropdownSelect}
                              selected={dropdownSelect}
                            />
                          </InputDiv>
                          <InputDiv style={{ marginLeft: "50px" }}>
                            <p>เลขที่บัญชีซื้อขาย</p>
                          </InputDiv>
                          <InputDiv style={{ marginLeft: "50px" }}>
                            <FieldInput
                              value={tradingAccountNo}
                              onChange={(e) =>
                                setTradingAccountNo(e.target.value)
                              }
                              placeholder={"กรุณากรอกเลขที่บัญชีซื้อขาย"}
                            />
                          </InputDiv>
                        </Content>
                      </LineCard>
                    </>
                  );
                }

                if (page === 2) {
                  return (
                    <>
                      <div className="card-tag">
                        <StyledLineCard
                          style={{
                            marginBottom: "20px",
                            paddingBottom: "30px",
                          }}
                        >
                          <Header>
                            <h3
                              style={{ color: "#1D3AB1", fontWeight: "bold" }}
                            >
                              จำนวนหุ้นเดิมของท่าน
                            </h3>
                          </Header>
                          <ShareDetail>
                            <p>{rightStockName}</p>
                            <b>{stockVolume}</b>
                            <p>หุ้น</p>
                          </ShareDetail>
                        </StyledLineCard>
                        <StyledLineCard
                          style={{
                            marginBottom: "20px",
                            paddingBottom: "30px",
                          }}
                        >
                          <ShareDetail
                            style={{
                              display: "flex",
                              top: "15px",
                              position: "relative",
                            }}
                          >
                            <p
                              style={{
                                color: "#1D3AB1",
                                fontWeight: "bold",
                                fontSize: "18.72px",
                              }}
                            >
                              ราคาเสนอขายหุ้นละ
                            </p>
                            <p style={{ fontSize: "18.72px" }}>{offerPrice}</p>
                            <p style={{ fontSize: "18.72px" }}>บาท</p>
                          </ShareDetail>
                        </StyledLineCard>
                      </div>
                      <div className="card-tag">
                        <StyledLineCard
                          style={{
                            marginBottom: "20px",
                            paddingBottom: "30px",
                          }}
                        >
                          <Header>
                            <h3
                              style={{ color: "#1D3AB1", fontWeight: "bold" }}
                            >
                              สิทธิในการซื้อหุ้นเพิ่มทุนของท่าน
                            </h3>
                          </Header>
                          <ShareDetail>
                            <p>{rightStockName}</p>
                            <b>{rightStockVolume}</b>
                            <p>หุ้น</p>
                          </ShareDetail>
                          <ShareDetail
                            style={{
                              fontSize: "14px",
                              color: "#1D3AB1",
                              fontWeight: "bold",
                            }}
                          >
                            <p>เป็นจำนวนเงิน</p>
                            <b>
                              {Number(rightStockVolume) * Number(offerPrice)}
                            </b>
                            <p>บาท</p>
                          </ShareDetail>
                          <ShareDetail style={{ fontSize: "14px" }}>
                            <p style={{ width: "100%" }}>
                              (การคำนวนจากราคาเสนอขาย {offerPrice} บาท ต่อ หุ้น)
                            </p>
                          </ShareDetail>
                        </StyledLineCard>
                        <StyledLineCard
                          style={{
                            marginBottom: "20px",
                            paddingBottom: "30px",
                          }}
                        >
                          <Header>
                            <h3
                              style={{ color: "#1D3AB1", fontWeight: "bold" }}
                            >
                              สิทธิเพิ่มเติม
                            </h3>
                          </Header>
                          <ShareDetail>
                            <p>{rightSpecialName}</p>
                            <b>{rightSpecialVolume}</b>
                            <p>หุ้น</p>
                          </ShareDetail>
                        </StyledLineCard>
                      </div>
                      <div className="card-tag">
                        <StyledLineCard
                          style={{
                            marginBottom: "20px",
                            paddingBottom: "30px",
                            border: "5px solid #1D3AB1",
                            boxSizing: "border-box",
                            borderRadius: "10px",
                          }}
                        >
                          <Header>
                            <h3
                              style={{ color: "#1D3AB1", fontWeight: "bold" }}
                            >
                              การสั่งซื้อหุ้นเพิ่มทุนของท่าน
                            </h3>
                          </Header>
                          <ShareDetail style={{ marginBottom: "-10px" }}>
                            <p>{rightStockName}</p>
                            <Input
                              type={"text"}
                              value={currentStockVolume}
                              onChange={(e) =>
                                setCurrentStockVolume(
                                  e.target.value.replace(/[^0-9.]/, "")
                                )
                              }
                            />
                            <p>หุ้น</p>
                          </ShareDetail>
                          <ShareDetail>
                            <p></p>
                            <div className="num-box-hidden">
                              <Icon />
                            </div>
                            <p>
                              <img
                                src={change}
                                className="icon-change"
                                onClick={() => setCurrentStockVolume(0)}
                              />
                            </p>
                          </ShareDetail>
                          <ShareDetail>
                            <p>จำนวนเงิน</p>
                            <Input
                              type={"text"}
                              value={currentPrice}
                              disabled
                            />
                            <p>บาท</p>
                          </ShareDetail>
                          <Header>
                            <h3
                              style={{ color: "#1D3AB1", fontWeight: "bold" }}
                            >
                              สิทธิเพิ่มเติมที่ท่านได้รับ
                            </h3>
                          </Header>
                          <ShareDetail>
                            <p>{rightSpecialName}</p>
                            <b>{rightSpecialVolume}</b>
                            <p>หุ้น</p>
                          </ShareDetail>
                        </StyledLineCard>
                        <div className="buy-flex">
                          <StyledLineCard
                            style={{
                              marginBottom: "20px",
                              paddingBottom: "30px",
                              border: "1px solid #1D3AB1",
                              boxSizing: "border-box",
                              borderRadius: "10px",
                              width: '100%'
                            }}
                          >
                            <Header>
                              <h3
                                style={{ color: "#1D3AB1", fontWeight: "bold" }}
                              >
                                จำนวนหุ้นที่ท่านซื้อเกินสิทธิ์
                              </h3>
                            </Header>
                            <ShareDetail>
                              <p>{rightStockName}</p>
                              <b>{excessVolume}</b>
                              <p>หุ้น</p>
                            </ShareDetail>
                          </StyledLineCard>
                          <StyledLineCard
                            style={{
                              marginBottom: "20px",
                              border: "1px solid #1D3AB1",
                              boxSizing: "border-box",
                              borderRadius: "10px",
                              width: '100%'
                            }}
                          >
                            <Header>
                              <h3
                                style={{ color: "#1D3AB1", fontWeight: "bold" }}
                              >
                                กรณีไม่ได้จัดสรรหุ้นส่วนที่เกินสิทธิ์
                                ขอให้โอนเงินเข้าบัญชี
                              </h3>
                            </Header>
                            <ShareDetail style={{ display: "block" }}>
                              <div className="input-div">
                                <InputDiv style={{ width: "100%" }}>
                                  <p>ฝากเงินเข้าบัญชีธนาคาร</p>
                                </InputDiv>
                                <InputDiv
                                  style={{ width: "100%", marginTop: "20px", border: '2px solid #d9e1e7;' }}
                                >
                                  <DropdownArrow
                                    options={masterBankRefund}
                                    isOpen={isOpenDropdownArrow}
                                    onClick={() => setIsOpenDropdownArrow(!isOpenDropdownArrow)}
                                    onBlur={() => setIsOpenDropdownArrow(false)}
                                    setSelected={setDepositBank}
                                    selected={depositBank}
                                  />
                                </InputDiv>
                              </div>
                              <div className="input-div">
                                <InputDiv style={{ width: "100%" }}>
                                  <p
                                    style={{
                                      width: "200px",
                                      textAlign: "start",
                                    }}
                                  >
                                    หมายเลขบัญชีธนาคาร
                                  </p>
                                </InputDiv>
                                <InputDiv
                                  style={{ marginTop: "20px", width: "100%" }}
                                >
                                  <FieldInput
                                    placeholder={"หมายเลขบัญชีธนาคาร"}
                                    value={bank}
                                    onChange={(e) =>
                                      setBank(
                                        e.target.value.replace(/[^0-9.]/, "")
                                      )
                                    }
                                  />
                                </InputDiv>
                              </div>
                              <div className="input-div">
                                <InputDiv style={{ width: "100%" }}>
                                  <p></p>
                                </InputDiv>
                                <InputDiv
                                  style={{
                                    marginTop: "10px",
                                    width: "100%",
                                    textAlign: "start",
                                  }}
                                >
                                  <Button
                                    type="submit"
                                    value="ตรวจสอบข้อมูล"
                                    onClick={() => setAddressModal(true)}
                                  />
                                </InputDiv>
                              </div>
                            </ShareDetail>
                          </StyledLineCard>
                        </div>
                      </div>
                      <div style={{ margin: "auto", width: "400px" }}>
                        <Button
                          type="submit"
                          value="ยืนยันคำสั่งซื้อ"
                          disabled={!isAcceptVerify}
                          onClick={() => handlerOnSubmited()}
                        />
                      </div>
                    </>
                  );
                }

                if (page === 3) {
                  return (
                    <>
                      <LineCard style={{ borderColor: persianblue }}>
                        <ShareDetail
                          style={{ fontSize: "20px", padding: "20px" }}
                        >
                          <b style={{ whiteSpace: "pre" }}>
                            ยอดที่ท่านต้องการทำรายการ
                          </b>
                          <b>{currentPrice}</b>
                          <b>บาท</b>
                        </ShareDetail>
                      </LineCard>
                      <div
                        className="text-message"
                        style={{ margin: "10px 30px" }}
                      >
                        <p>
                          ท่านสามารถดำเนินการชำระเงินในการซื้อหุ้นเพิ่มทุนของท่านได้ที่
                        </p>
                      </div>
                      <LineCard>
                        <Header>
                          <ShareDetail>
                            <h3
                              style={{
                                color: "#1D3AB1",
                                fontSize: "24px",
                                whiteSpace: "pre",
                              }}
                            >
                              ส่งหลักฐานการชำระเงิน
                            </h3>
                            <div className="btn-payment-tool">
                              <Button
                                type="submit"
                                value="ดูวิธีการชำระเงิน"
                                style={{
                                  width: "100%",
                                  fontSize: "17px",
                                  color: "#000000",
                                  backgroundColor: "#EDB52D",
                                  height: "42px",
                                }}
                              />
                            </div>
                          </ShareDetail>
                        </Header>
                        <div
                          className="line-space"
                          style={{ padding: "0 20px" }}
                        >
                          <hr style={{ border: "0.75px solid #D9E1E7" }} />
                        </div>
                        <div
                          className="payment-method"
                          style={{ padding: "10px 20px", display: "flex" }}
                        >
                          <b style={{ width: "20%", margin: "10px" }}>
                            เลือกวิธีการชำระเงิน
                          </b>
                          <div
                            className="bank-name"
                            style={{ width: "80%" }}
                            onClick={() =>
                              setRadioCheckPayment(!radioCheckedPayment)
                            }
                          >
                            <LineCard style={{ padding: "10px" }}>
                              <div
                                style={{
                                  display: "inline-flex",
                                  position: "relative",
                                  width: "100%",
                                }}
                              >
                                <input
                                  type="radio"
                                  style={{ margin: "5px 20px 5px 30px" }}
                                  checked={radioCheckedPayment}
                                />
                                <b>ชำระเงินผ่านเลขบัญชีธนาคาร</b>
                                <div
                                  className="btn-arrow"
                                  style={{
                                    position: "absolute",
                                    right: "0",
                                    margin: "5px 20px 0 0",
                                  }}
                                >
                                  {radioCheckedPayment ? (
                                    <OpenArrow />
                                  ) : (
                                    <CloseArrow />
                                  )}
                                </div>
                              </div>
                              {radioCheckedPayment && (
                                <>
                                  <div
                                    className="bank-name-card"
                                    style={{ margin: "20px" }}
                                  >
                                    <BankCard>
                                      {masterBankPayment.length > 0 &&
                                        masterBankPayment.map((bank, index) => (
                                          <div style={{ display: "flex" }}>
                                            <div
                                              className="bank-img"
                                              style={{
                                                marginLeft: "40px",
                                                marginTop: "auto",
                                                marginBottom: "auto",
                                              }}
                                            >
                                              <img
                                                src={bank.logo}
                                                height={"33px"}
                                                width={"32px"}
                                              />
                                            </div>
                                            <div
                                              className="bank-detail"
                                              style={{
                                                margin: "10px 0px 10px 20px",
                                              }}
                                            >
                                              <b>{bank.nameTH}</b>
                                              <p>
                                                เลขบัญชี
                                                <b
                                                  style={{ marginLeft: "20px" }}
                                                >
                                                  {bank.accountNumber}
                                                </b>
                                              </p>
                                              <p>
                                                ชื่อบัญชี
                                                <b style={{ margin: "0 20px" }}>
                                                  {bank.accountName}
                                                </b>
                                                สาขา
                                                <b style={{ margin: "0 20px" }}>
                                                  {bank.branch}
                                                </b>
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                    </BankCard>
                                  </div>
                                </>
                              )}
                            </LineCard>
                          </div>
                        </div>
                        <div
                          className="payment-method"
                          style={{
                            padding: "10px 20px 30px 20px",
                            display: "flex",
                          }}
                        >
                          <b
                            style={{
                              width: "20%",
                              margin: "20px 10px 10px 10px",
                            }}
                          >
                            หลักฐานการชำระเงิน
                          </b>
                          <UploadButton style={{ width: "30%", margin: "0" }}>
                            <p
                              style={{
                                width: "100%",
                                fontSize: "17px",
                                margin: "auto",
                                marginBottom: "20px",
                                marginTop: "20px",
                              }}
                            >
                              แนบหลักฐานการชำระเงิน
                            </p>
                            <input
                              type="file"
                              style={{ display: "none" }}
                              accept="image/png, image/jpeg"
                              onChange={handleSelectedFile}
                            />
                          </UploadButton>
                          <div
                            className="warning-text"
                            style={{
                              width: "50%",
                              margin: "20px 10px 10px 10px",
                              color: "#575656",
                            }}
                          >
                            <p>
                              <FontAwesomeIcon
                                icon={faCircleInfo}
                                style={{ margin: "0 10px" }}
                              />
                              กรุณาอัพโหลดไฟล์ .PNG และ JPEG ขนาดไม่เกิน 5 MB
                            </p>
                          </div>
                        </div>
                      </LineCard>
                      <Button
                        type="submit"
                        value={"ยืนยันการส่ง"}
                        style={{ marginTop: "1rem" }}
                        onClick={handleSubmit}
                      />
                    </>
                  );
                }
              })()}
            </FlexContainer>
          </>
        )}
      </Container>
    </Card>
  );
};

const UploadButton = styled.label`
  margin: auto;
  width: 100%;
  text-align: center;
  color: ${ivory};
  background: ${persianblue};
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-size: 17px;
`;

const Container = styled.div`
  padding: 20px 20px;
  height: 90vh;
  width: 70vw;
  display: flex;
  flex-direction: column;
  // overflow: auto;
  overflow-y: auto;

  > * {
    margin: 10px 0;
  }

  .card-tag {
    display: flex;
    justify-content: space-between;
  }

  .content-member {
    color: #809fb8;

    .content-detail-text {
      margin: 10px 0;
      display: flex;
      align-items: baseline;
    }

    .content-detail-share {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      .text-title {
        width: 50%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      }
    }

    .text-black {
      margin-left: 20px;
      color: #000000;
    }

    .text-amount {
      display: flex;
      justify-content: space-between;
      width: 40%;
      align-items: baseline;
    }
  }

  .buy-flex {
    width: 50%;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;

    .card-tag {
      display: inline;
    }
    .buy-flex {
      width: 100%;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    width: 80vw;

    .card-tag {
      display: inline;
    }
    .buy-flex {
      width: 100%;
    }
  }
`;

const Step = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  text-align: center;
  display: flex;
  width: 60px;
  height: 60px;
  color: #fff;
  font-weight: 400;
  margin: auto;
  background: ${({ isActive }) => (isActive ? "#1D3AB1" : "#C4C4C4")};
  position: relative;
  font-size: 20px;
`;

const StepDiv = styled.div`
  text-align: center;
  display: flex;
  background-color: transparent;
  border: 1px solid transparent;
  float: left;
  margin: auto;
`;

const InputDiv = styled.div`
  margin: 10px 0;

  .inputField {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;

    p {
      position: relative;
      margin: 0 10px;
    }
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    .inputField {
      display: block;
      width: 100%;
      align-items: baseline;

      p {
        position: static;

        span {
          width: 200px;
        }
      }
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const Line = styled.hr`
  width: 10em;
  position: absolute;
  top: 20px;
  left: 90px;
  background: #c4c4c4;
`;

const StepDetail = styled.p`
  font-style: bold;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  width: 300px;

  text-align: center;
  color: ${({ isActive }) => (isActive ? "#1D3AB1" : "#000000")};
`;

const Button = styled.input`
  width: 100%;
  height: 54px;
  background-color: ${persianblue};
  color: #fff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.25em;
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

const Dot = styled.div`
  width: 34px;
  height: 34px;
  background: #1d3ab1;
  border: 5px solid #b8b8b8;
  box-sizing: border-box;
  border-radius: 100%;

  margin: 0px 20px 5px 0px;
  float: left;
  clear: both;
`;

const Header = styled.div`
  margin: 10px;
  h3 {
    font-weight: 400;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Content = styled.div`
  margin: 0 10px;
  position: relative;
  .desc {
    font-size: 17px;
    overflow-y: scroll;
    scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
  }

  .btn-read-more {
    position: absolute;
    width: 140px;
    margin-top: 10px;
    right: 0;
    font-size: 14px;
  }

  p {
    font-size: 17px;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    .btn-read-more {
      width: 120px;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    display: flex;
    justify-content: space-between;

    .btn-read-more {
      width: 120px;
    }
  }
`;

const ContentSpace = styled.div`
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
  .desc {
    font-size: 17px;
    overflow-y: scroll;
    scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
  }
  p {
    font-size: 17px;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    display: block;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    display: block;
  }
`;

const ShareDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px;

  > :nth-child(2) {
    text-align: center;
  }
  > :nth-child(3) {
    text-align: end;
  }

  * {
    width: 200px;
  }

  .input-select {
    i {
      width: 10px;
    }
  }

  .payment-detail {
    margin: auto;
    display: block;
  }

  .payment-image {
    display: flex;
    margin: auto;
  }

  .input-div {
    display: flex;
    justify-content: space-between;
    width: 100%;

    p {
      margin-top: 10px;
    }

    @media screen and (max-width: 540px) {
      display: block;

      p {
        margin-top: 0;
      }
    }

    /* For Tablets */
    @media screen and (min-width: 540px) and (max-width: 880px) {
      display: block;

      p {
        margin-top: 0;
      }
    }
  }

  .num-box {
    width: 200px;
    text-align: center;
    padding: 7px 0;
    background: ${ivory};
    border: 1px solid ${balihai};
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: bold;

    @media screen and (max-width: 540px) {
      width: 150px;
    }

    /* For Tablets */
    @media screen and (min-width: 540px) and (max-width: 880px) {
      width: 180px;
    }
  }

  .num-box-hidden {
    width: 200px;
    text-align: center;
    padding: 7px 0;
    font-size: 1.1rem;
    font-weight: bold;

    @media screen and (max-width: 540px) {
      width: 150px;
    }

    /* For Tablets */
    @media screen and (min-width: 540px) and (max-width: 880px) {
      width: 180px;
    }
  }

  .unit {
    margin-right: 10px;
    width: 25px;
  }

  .icon-change {
    width: 20px;
    margin-top: 10px;
    // margin-right: 10px;
    // position: absolute;
    // top: 5px;
    // right: -12px;
  }
`;

const Icon = styled(DownArrow)`
  color: ${persianblue};
  margin-top: 10px;
  // position: relative;
  // left: 30px;

  width: 20px;
  text-align: center;

  @media screen and (max-width: 540px) {
    left: 27.5px;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    // width: 180px;
  }
`;

const Input = styled.input`
  width: 200px;
  text-align: start;
  padding: 7px 0;
  background: ${ivory};
  border: 1px solid ${balihai};
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;

  @media screen and (max-width: 540px) {
    width: 150px;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    width: 180px;
  }
`;

const OpenArrow = styled.i`
  position: absolute;

  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid ${persianblue};
`;

const CloseArrow = styled.i`
  position: absolute;

  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid ${persianblue};
`;

const BankCard = styled.div`
  display: block;
  margin: auto;
`;

const ContainerCard = styled.div`
  padding: 20px;
  position: relative;
  width: 100%;
  p {
    font-size: 1rem;
  }
`;

const StyledLineCard = styled.div`
  border-radius: 10px;
  border: 1px solid #d9e1e7;
  margin: 0 10px;
  width: 50%;

  @media screen and (max-width: 540px) {
    width: 100%;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    width: 100%;
  }
`;

export default Buy;
