import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";

import change from "../assets/icon_change.png";

import { Card } from "../components/UI/Card";
import { FlexContainer } from "../components/UI/FlexContainer";
import {
  DropdownSelect,
  DropdownSelectMasterBank,
  DropdownArrow,
} from "../components/UI/Dropdown";
import { LineCard, LineCardBank } from "../components/UI/Card";
import { FieldInput } from "../components/UI/Search";
import { ModalAlert } from "../components/ModalAlert/ModalAlert";
import { showAlert } from "../utils/showAlert";
import { Modal } from "../components/UI/Modal";
import { ModalDetail } from "../components/Modal/ModalDetail";

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
import { format } from "date-fns";

const Buy = () => {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showStepOneVerify, setShowStepOneVerify] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(true);
  const [status, setStatus] = useState();

  const [currentStockVolume, setCurrentStockVolume] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdownArrow, setIsOpenDropdownArrow] = useState(false);
  const [validateAccept, setValidateAccept] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [registrationNo, setRegistrationNo] = useState(false);

  const [isDisableToPage2, setIsDisableToPage2] = useState(true);

  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentTime, setPaymentTime] = useState(null);

  /// input file upload
  const [bookbankFile, setBookbankFile] = useState(null);
  const hiddenFileInput = React.useRef(null);

  const [previewImage, setPreviewImage] = useState(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleOnFileSelect = (e) => {
    const allowTypeFile = ["image/jpeg", "image/png"];
    const [file] = e.target.files;
    const maxAllowedSize = 5 * 1024 * 1024;
    const { name: fileName, size, type } = file;

    if (!allowTypeFile.includes(type)) {
      setStatus(999);
      setAlertMessage("ประเภทไฟล์ไม่ถูกต้อง");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);

      return;
    }

    if (size > maxAllowedSize) {
      setStatus(999);
      setAlertMessage("ขนาดไฟล์รูปภาพใหญ่เกินไป");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    } else {
      const fileUploaded = e.target.files[0];
      setBookbankFile(fileUploaded);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewImage(reader.result);
      });
      reader.readAsDataURL(fileUploaded);
    }
    // const fileUploaded = event.target.files[0];
    // setBookbankFile(fileUploaded);
    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   setPreviewImage(reader.result);
    // });
    // reader.readAsDataURL(fileUploaded);
  };

  // modal registration
  const [nationalId, setNationalId] = useState(null);
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [isRegistrationChecked, setIsRegistrationChecked] = useState(true);
  const [isDisableRegistration, setIsDisableRegistration] = useState(true);

  // step 1
  const [shareName, setShareName] = useState("-");
  const [shareDescription, setShareDescription] = useState("-");
  const [shareDescriptionShort, setShareDescriptionShort] = useState("-");
  const [shareDescriptionMore, setShareDescriptionMore] = useState("-");
  const [fullname, setFullname] = useState(null);
  const [shareId, setShareId] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [shareOption, setShareOption] = useState([]);
  const [shareBankRefundOption, setShareBankRefundOption] = useState([]);
  const [dropdownSelect, setDropdownSelect] = useState(null);
  const [dropdownBankRefundSelect, setDropdownBankRefundSelect] =
    useState(null);
  const [isReadMore, setIsReadMore] = useState(false);
  const [tradingAccountNo, setTradingAccountNo] = useState(null);

  const [isOpenDropdownArrowStep1, setIsOpenDropdownArrowStep1] =
    useState(false);

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
  const [isAcceptVerify, setIsAcceptVerify] = useState(false);
  const [isConfirmBooking, setIsConfirmBooking] = useState(false);

  const [bankDisableButton, setBankDisableButton] = useState(true);

  // step 3
  const [radioCheckedPayment, setRadioCheckPayment] = useState(false);
  const [lastVerifyChecked, setLastVerifyChecked] = useState(false);

  // addres modal
  const [addressModal, setAddressModal] = useState(false);
  const [addressName, setAddressName] = useState(null);
  const [addressHouseNo, setAddressHouseNo] = useState(null);
  const [addressDistrict, setAddressDistrict] = useState(null);
  const [addressProvince, setAddressProvince] = useState(null);
  const [addressZipcode, setAddressZipcode] = useState(null);
  const [addressTel, setAddressTel] = useState(null);

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [orderId, setOrderId] = useState(null);

  const [masterBankRefund, setMasterBankRefund] = useState([]);
  const [masterBankPayment, setMasterBankPayment] = useState([]);
  const [bank, setBank] = useState(null);
  const [depositBank, setDepositBank] = useState(null);

  const [profile, setProfile] = useState(null);
  const [isConfirmOrder, setIsConfirmOrder] = useState(true);
  const [isSummitOrder, setIsSummitOrder] = useState(true);

  const fetchStep1 = async () => {
    await getCustomerProfile();
    await getBrokers();
    await fetchDataProfile();

    if (JSON.parse(localStorage.getItem("step_1")) && page === 1) {
      console.log("------ Loading local storage step 1 ------");
      setShareId(JSON.parse(localStorage.getItem("step_1")).shareId);
      setPhoneNo(JSON.parse(localStorage.getItem("step_1")).phoneNo);
      setDropdownSelect(
        JSON.parse(localStorage.getItem("step_1")).dropdownSelect
      );
      setTradingAccountNo(
        JSON.parse(localStorage.getItem("step_1")).tradingAccountNo
      );
    }
  };

  const fetchStep2 = async () => {
    await getCustomerStock();
    await getMasterBank();
    await fetchDataProfile();

    if (JSON.parse(localStorage.getItem("step_2")) && page === 2) {
      console.log("------ Loading local storage step 2 ------");
      setCurrentStockVolume(
        JSON.parse(localStorage.getItem("step_2")).currentStockVolume
      );
      setDepositBank(JSON.parse(localStorage.getItem("step_2")).depositBank);
      setBank(JSON.parse(localStorage.getItem("step_2")).bank);
    }
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

      const registrations = res.data.map((data) => {
        const { orders } = data;

        if (!orders) {
          return { registraionNo: data.registrationNo };
        } else {
          return { registraionNo: "" };
        }
      });

      registrations.unshift({ registraionNo: "" });
      setAllRegistrations(registrations);
      setShareId(
        registrations.length > 0 ? registrations[0].registraionNo : null
      );
      setNationalId(payload.customerId.refNo);
      setFullname(`${payload.customerId.name} ${payload.customerId.lastname}`);
      // setShareId(payload.registrationNo);
      setPhoneNo(
        localStorage.getItem("step_1")
          ? JSON.parse(localStorage.getItem("step_1")).phoneNo
          : payload.customerId.telephone
      );
      setRegistrationNo(payload.registrationNo);
      setFullnameModal(
        `${payload.customerId.name} ${payload.customerId.lastname}`
      );
      setShareIdModal(res.data.length === 1 ? payload.registrationNo : null);
      setPhoneNoModal(payload.customerId.telephone);
      setShareName(payload.company);
      const desc = `บมจ. เน็คซ์ แคปปิตอล (“บริษัท” หรือ “NCAP”) เปิดเผยว่า ที่ประชุมสามัญผู้ถือหุ้น ประจำปี 2565 ของบริษัท เน็คซ์ แคปปิตอล จำกัด (มหาชน) เมื่อวันที่ 21 เมษายน 2565 ได้มีมติอนุมัติการจัดสรรหุ้นสามัญเพิ่มทุนใหม่จำนวน450,000,000 หุ้น มูลค่าที่ตราไว้หุ้นละ 0.50 บาท เพื่อเสนอขายให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้น โดยไม่จัดสรรให้ผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศพร้อมใบสำคัญแสดงสิทธิ ในอัตราส่วน 2 หุ้นสามัญเดิมต่อ 1 หุ้นสามัญเพิ่มทุนใหม่ (ในกรณีมีเศษของหุ้นที่เกิดจากการคำนวณ ให้ปัดเศษของหุ้นนั้นทิ้ง) ในราคาเสนอขายหุ้นละ 4.50 บาท ที่มีรายชื่อปรากฏอยู่ในวันกำหนดรายชื่อผู้ถือหุ้น (Record Date) ในวันที่ 29 เมษายน 2565 และจัดสรรใบสำคัญแสดงสิทธิที่จะซื้อหุ้นสามัญ (NCAP-W1) (“ใบสำคัญแสดงสิทธิ”) จำนวน 225,000,000 หน่วย ให้แก่ผู้ถือหุ้นเดิมของบริษัทที่ได้จองซื้อหุ้นสามัญเพิ่มทุนของบริษัท (Right Offering) ในอัตราส่วน 2 หุ้นสามัญเพิ่มทุน ต่อ 1 หน่วยใบสำคัญแสดงสิทธิ (ในกรณีที่มีเศษหุ้นจากการคำนวณให้ปัดทิ้ง) ที่ราคาเสนอขายใบสำคัญแสดงสิทธิ หน่วยละ 0 บาท
    `;
      const descFull =
        "บมจ. เน็คซ์ แคปปิตอล (“บริษัท” หรือ “NCAP”) เปิดเผยว่า ที่ประชุมสามัญผู้ถือหุ้น ประจำปี 2565 ของบริษัท เน็คซ์ แคปปิตอล จำกัด (มหาชน) เมื่อวันที่ 21 เมษายน 2565 ได้มีมติอนุมัติการจัดสรรหุ้นสามัญเพิ่มทุนใหม่จำนวน450,000,000 หุ้น มูลค่าที่ตราไว้หุ้นละ 0.50 บาท เพื่อเสนอขายให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้น โดยไม่จัดสรรให้ผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศพร้อมใบสำคัญแสดงสิทธิ ในอัตราส่วน 2 หุ้นสามัญเดิมต่อ 1 หุ้นสามัญเพิ่มทุนใหม่ (ในกรณีมีเศษของหุ้นที่เกิดจากการคำนวณ ให้ปัดเศษของหุ้นนั้นทิ้ง) ในราคาเสนอขายหุ้นละ 4.50 บาท ที่มีรายชื่อปรากฏอยู่ในวันกำหนดรายชื่อผู้ถือหุ้น (Record Date) ในวันที่ 29 เมษายน 2565 และจัดสรรใบสำคัญแสดงสิทธิที่จะซื้อหุ้นสามัญ (NCAP-W1) (“ใบสำคัญแสดงสิทธิ”) จำนวน 225,000,000 หน่วย ให้แก่ผู้ถือหุ้นเดิมของบริษัทที่ได้จองซื้อหุ้นสามัญเพิ่มทุนของบริษัท (Right Offering) ในอัตราส่วน 2 หุ้นสามัญเพิ่มทุน ต่อ 1 หน่วยใบสำคัญแสดงสิทธิ (ในกรณีที่มีเศษหุ้นจากการคำนวณให้ปัดทิ้ง) ที่ราคาเสนอขายใบสำคัญแสดงสิทธิ หน่วยละ 0 บาท ในการจัดสรรหุ้นสามัญเพิ่มทุนให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นที่ผู้ถือหุ้นแต่ละรายถือ อยู่ในครั้งนี้ โดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศ ในกรณีที่มีหุ้นสามัญเพิ่มทุนเหลือจากการจัดสรรให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นที่ผู้ถือหุ้นแต่ละรายถืออยู่ในรอบแรกแล้ว โดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศ บริษัทจะจัดสรรหุ้นสามัญเพิ่มทุนที่เหลือดังกล่าวให้กับผู้ถือหุ้นเดิมที่ประสงค์จะจองซื้อเกินกว่าสิทธิตาม สัดส่วนการถือหุ้นเดิมโดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศในราคาเดียวกันกับหุ้นที่ได้รับการจัดสรรตามสิทธิดังนี้ในกรณีที่มีหุ้นเหลือจากการจัดสรรให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นโดยไม่ จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศที่แต่ละรายถืออยู่ในรอบ แรกเป็นจำนวนมากกว่าหรือเท่ากับหุ้นที่ผู้ถือหุ้นเดิมจองซื้อเกินกว่าสิทธิ บริษัทจะจัดสรรหุ้นที่เหลือดังกล่าวให้แก่ผู้ที่จองซื้อเกินกว่าสิทธิและชำระค่าจองซื้อหุ้นดังกล่าวทั้งหมดทุกรายตามจำนวนที่แสดงความจำนงจองซื้อเกินกว่าสิทธิในกรณีที่มีหุ้นเหลือจากการจัดสรรให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นโดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศที่แต่ละรายถืออยู่ในรอบแรกเป็นจำนวนน้อยกว่าหุ้นที่ผู้ถือหุ้นเดิมจองซื้อเกินกว่าสิทธิ บริษัทจะจัดสรรหุ้นที่เหลือดังกล่าวให้แก่ผู้ที่จองซื้อเกินกว่าสิทธิตามขั้นตอนดังต่อไปนี้(ก) จัดสรรตามสัดส่วนการถือหุ้นเดิมของผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายโดยไม่จัดสรร ให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศ โดยนำสัดส่วนการถือหุ้นเดิมของผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายคูณด้วยจำนวนหุ้นที่เหลือจะได้เป็นจำนวนหุ้นที่ผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายมีสิทธิที่จะได้รับจัดสรร ในกรณีที่มีเศษของหุ้นให้ ปัดเศษของหุ้นนั้นทิ้ง ทั้งนี้ จำนวนหุ้นที่จะได้รับการจัดสรรจะไม่เกินจำ นวนหุ้นที่ผู้ถือหุ้น แต่ละรายจองซื้อและชำระค่าจองซื้อแล้ว (ข) ในกรณีที่ยังมีหุ้นคงเหลือหลังจากการจัดสรรตามข้อ (ก) ให้ทำการจัดสรรให้แก่ผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายซึ่งยังได้รับการจัดสรรไม่ครบตามจำนวนหุ้นที่จองซื้อนั้น โดยนำสัดส่วนการถือหุ้นเดิมของผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายนั้นคูณด้วยจำนวนหุ้นที่เหลือ จะได้เป็นจำนวนหุ้นที่ผู้ที่จองซื้อเกินกว่าสิทธิแต่ละรายมีสิทธิที่จะได้รับจัดสรร ในกรณีที่มี เศษของหุ้นให้ปัดเศษของหุ้นนั้นทิ้ง โดยจำนวนหุ้นที่จะได้รับการจัดสรรจะไม่เกินจำนวนหุ้นที่ผู้ถือหุ้นแต่ละรายจองซื้อและชำระค่าจองซื้อแล้ว ทั้งนี้ ให้ดำเนินการจัดสรรหุ้นให้แก่ผู้ที่จองซื้อเกินกว่าสิทธิตามวิธีการในข้อ (2) นี้จนกระทั่งไม่มีหุ้นเหลือจากการจัดสรร หรือไม่สามารถจัดสรรได้อีกเนื่องจากเป็นเศษของหุ้นการจัดสรรหุ้นที่จองซื้อเกินกว่าสิทธิจะต้องไม่ทำให้ผู้ถื้อหุ้นที่จองซื้อหุ้นสามัญเพิ่มทุนเกินกว่าสิทธิรายใดมีหน้าที่ต้องทำคำเสนอซื้อหลักทรัพย์ (Tender Offer) ตามที่กำหนดในประกาศคณะกรรมการกำกับตลาดทุนที่ ทจ.12/2554 เรื่อง หลักเกณฑ์ เงื่อนไข และวิธีการในการเข้าถือหลักทรัพย์เพื่อครอบงำกิจการ ลงวันที่ 13 พฤษภาคม 2554 (รวมทั้งที่ได้มีการแก้ไขเพิ่มเติม)ในการจัดสรรหุ้นสามัญเพิ่มทุนให้กับผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นโดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศตามรายละเอียดข้างต้นไม่ว่ากรณีใด จะต้องไม่มีลักษณะที่เป็นการฝ่าฝืนข้อจำกัดการถือหุ้นของบุคคลผู้ไม่มีสัญชาติไทย ตามที่ระบุไว้ในข้อบังคับของบริษัท และคณะกรรมการบริษัทมีสิทธิใช้ดุลยพินิจพิจารณาไม่เสนอขายหุ้นสามัญเพิ่มทุนให้แก่ผู้ถือหุ้นเดิมของบริษัทตามสัดส่วนการถือหุ้นโดยไม่จัดสรรให้กับผู้ถือหุ้นที่จะทำให้บริษัทมีหน้าที่ตามกฎหมายต่างประเทศ หากการเสนอขายดังกล่าวทำให้หรืออาจเป็นผลให้บริษัทมีภาระหรือหน้าที่ต้องปฏิบัติหรือดำเนินการใดๆ ตามกฎหมายต่างประเทศ ซึ่งได้แก่ ประเทศสหรัฐอเมริกา จจองซื้อหุ้นสามัญเพิ่มทุนเกินกว่าสิทธิได้";
      setShareDescription(payload.detailShort || desc);
      setShareDescriptionShort(payload.detailShort || desc);
      setShareDescriptionMore(payload.detailFull || descFull);
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
      `customerStocks?customerId=${user.customerId}&registrationNo=${shareIdModal}`
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

      const bankRefund = payload.filter((o) => o.type === "refund");

      setMasterBankPayment(payload.filter((o) => o.type === "payment"));
      setMasterBankRefund(bankRefund);
      setShareBankRefundOption(bankRefund);
    }
  };

  const handlerOnSubmited = async () => {
    setValidateAccept(true);
  };

  const handlerOnAcceptVerify = () => {
    setAddressModal(false);

    setIsAcceptVerify(true);

    if (currentStockVolume > 0) {
      setIsConfirmOrder(false);
    }
  };

  const handleSelectedFile = (e) => {
    const allowTypeFile = ["image/jpeg", "image/png"];
    const [file] = e.target.files;
    const maxAllowedSize = 5 * 1024 * 1024;
    const { name: fileName, size, type } = file;

    if (!allowTypeFile.includes(type)) {
      setStatus(999);
      setAlertMessage("ประเภทไฟล์ไม่ถูกต้อง");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);

      return;
    }

    if (size > maxAllowedSize) {
      setStatus(999);
      setAlertMessage("ขนาดไฟล์รูปภาพใหญ่เกินไป");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    } else {
      setFilename(fileName);
      setFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setStatus(999);
      setAlertMessage("ไม่พบไฟล์ภาพ");
      showAlert(setShow, 2000);
    } else if (!paymentDate && !paymentTime) {
      setStatus(999);
      setAlertMessage("กรุณาระบุ วันที่โอน และเวลาที่โอน");
      showAlert(setShow, 2000);
    } else {
      setPage(3);
      setValidateAccept(true);
    }
  };

  useEffect(() => {
    if (shareId && isRegistrationChecked) {
      setIsDisableRegistration(false);
    }
  }, [shareId, isRegistrationChecked]);

  useEffect(() => {
    if (dropdownSelect && tradingAccountNo) {
      setIsDisableToPage2(false);
    }
  }, [dropdownSelect, tradingAccountNo]);

  const hanlderOnBack = () => {
    if (page === 2) {
      setValidateAccept(false);
      setPage(2);
    } else if (page === 3) {
      setValidateAccept(false);
      setPage(2);
    }
  };

  const handlerOnClickPage = (page) => {
    if (page === 2) {
      localStorage.setItem(
        "step_1",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("step_1")),
          shareId,
          phoneNo,
          dropdownSelect,
          tradingAccountNo,
        })
      );
    }
    if (page === 3) {
      localStorage.setItem(
        "step_1",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("step_2")),
          currentStockVolume,
          depositBank,
          bank,
        })
      );
    }
    if (!dropdownSelect) {
      setShow(true);
      setStatus(999);
      setAlertMessage(
        "กรุณาเลือกข้อมูล ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก"
      );
      setTimeout(() => {
        setShow(false);
      }, 5000);
    } else if (!tradingAccountNo) {
      setShow(true);
      setStatus(999);
      setAlertMessage("กรุณากรอกข้อมูล เลขที่บัญชีซื้อขาย");
      setTimeout(() => {
        setShow(false);
      }, 5000);
    } else if (!isAcceptVerify && page === 3) {
      setShow(true);
      setStatus(999);
      setAlertMessage("กรุณาตรวจสอบข้อมูลในขั้นตอนที่ 2");
      setTimeout(() => {
        setShow(false);
      }, 5000);
    } else if (!phoneNo) {
      setShow(true);
      setStatus(999);
      setAlertMessage("กรุณากรอกเบอร์โทรศัพท์");
      setTimeout(() => {
        setShow(false);
      }, 5000);
    } else {
      if (page === 3 && !isConfirmBooking) {
        setShow(true);
        setStatus(999);
        setAlertMessage("กรุณายืนยันการจอง");
        setTimeout(() => {
          setShow(false);
        }, 5000);
      } else {
        setPage(page);
      }
    }
  };

  async function fetchDataProfile() {
    let endpoint = `masterCustomers/${user.customerId}`;

    const [res, status] = await httpGetRequest(endpoint);

    setProfile(res["data"]);
  }

  const handlerOnAccept = async () => {
    localStorage.setItem(
      "step_2",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("step_2")),
        currentStockVolume,
        depositBank,
        bank,
      })
    );
    setValidateAccept(false);
    setPage(3);
  };

  const handlerOnEdit = () => {
    setShowModal(true);
    setPhoneNoModal(phoneNo);
  };

  const handlerOnCloseModal = () => {
    setShowModal(false);
    setPhoneNoModal(phoneNo);
  };

  const handlerOnAcceptModal = (page) => {
    if (page === 1) {
      setShowModal(false);
      setShowAlertModal(true);

      setFullname(fullnameModal);
      setShareId(shareIdModal);
      setPhoneNo(phoneNoModal);

      // localStorage.setItem("step_1", JSON.stringify({
      //   ...JSON.parse(localStorage.getItem("step_1")),
      //   phoneNo: phoneNoModal
      // }))
    } else if (page === 2) {
      setShowAlertModal(false);
    }
  };

  const handlerOnSubmitedOrder = async () => {
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
        address: `${profile.address} ${profile.zipcode}`,
        registrationNo: shareId,
        bankRefund: depositBank._id,
        bankRefundNo: bank,
        paymentDate: new Date(`${paymentDate} ${paymentTime}`),
      },
      "orders"
    );

    if (status === 200) {
      setIsConfirmBooking(true);
      setOrderId(res.data._id);
      setStatus(200);
      setAlertMessage("ยืนยันคำจองซื้อสำเร็จ");
      showAlert(setShow, 2000);
      localStorage.clear();

      const formDataBookbank = new FormData();
      formDataBookbank.append("File", bookbankFile);
      const endpointBookbank = `uploads/bookbank?orderId=${res.data._id}`;
      const [resBookbank, statusBookbank] = await httpPostRequestUploadFile(
        formDataBookbank,
        endpointBookbank
      );
      if (statusBookbank === 200) {
        const formData = new FormData();
        formData.append("File", file);
        const endpoint = `uploads/image?orderId=${res.data._id}`;

        const [_res, _status] = await httpPostRequestUploadFile(
          formData,
          endpoint
        );
        let msg = _res.message;
        setStatus(_status);
        if (_status === 200) {
          msg = "Upload Completed";
          console.log(msg);
          setAlertMessage(msg);
          showAlert(setShow, 2000);
          setFile();
          setTimeout(() => {
            navigate(`/profile`);
          }, 2000);
        }
      }
    }
  };

  const handlerOnReadMore = () => {
    console.log(isReadMore);
    if (!isReadMore) {
      setShareDescription(shareDescriptionMore);
      setIsReadMore(true);
    } else {
      setShareDescription(shareDescriptionShort);
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
    if (depositBank && depositBank.nameTH === "อื่นๆ") {
      setBank("");
      setFilename(null);
      setFile(null);
      setBankDisableButton(false);
      setPreviewImage(null);
    } else if (depositBank && bank && bookbankFile) {
      setBankDisableButton(false);
    }
  }, [depositBank, bank, bookbankFile]);

  useEffect(() => {
    setBookbankFile(null);
  }, [depositBank]);

  useEffect(() => {
    if (Number(currentStockVolume) > 0 && isAcceptVerify) {
      setIsConfirmOrder(false);
    } else {
      setIsConfirmOrder(true);
    }
  }, [currentStockVolume]);

  useEffect(() => {
    setCurrentPrice(Number(currentStockVolume) * Number(offerPrice));

    setExcessVolume(
      Number(currentStockVolume) > Number(rightStockVolume)
        ? Number(currentStockVolume) - Number(rightStockVolume)
        : 0
    );

    if (
      Number(currentStockVolume) <= Number(rightStockVolume) &&
      Number(currentStockVolume) !== 0
    ) {
      setIsConfirmOrder(false);
    } else {
      setIsConfirmOrder(true);
    }
  }, [currentStockVolume]);

  const formatNumber = (number) => {
    return Number(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card>
      <Modal
        show={showRegistrationModal}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Card>
          <ContainerCard>
            <Header
              style={{
                margin: "20px",
                color: "#1D3AB1",
                fontWeight: "bold",
                display: "flex",
              }}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{
                  margin: "10px 10px 0px 10px",
                  color: "#FB0303",
                  fontSize: "30px",
                }}
              />
              <h3 style={{ marginTop: "auto" }}>
                โปรดตรวจสอบข้อมูลของท่านก่อนการลงทะเบียนจองสิทธิ
              </h3>
            </Header>
            <LineCard style={{ padding: "10px 20px", overflow: "visible" }}>
              <div className="modal-flex">
                <p className="modal-flex-label">หมายเลขบัตรประชาชน</p>
                <p className="modal-flex-label-info">{nationalId}</p>
              </div>
              <div className="modal-flex">
                <p className="modal-flex-label">เบอร์โทรศัพท์</p>
                <p className="modal-flex-label-info">{phoneNo || "-"}</p>
              </div>
              <div className="modal-flex">
                <p className="modal-flex-label">ชื่อ - นามสกุล</p>
                <p className="modal-flex-label-info">{fullname}</p>
              </div>
              <div className="modal-flex">
                <p className="modal-flex-label">ที่อยู่</p>
                <p className="modal-flex-label-info">
                  {profile ? `${profile.address} ${profile.zipcode}` : "-"}
                </p>
              </div>
              <div className="modal-block">
                <p className="modal-block-label">หมายเลขทะเบียนผู้ถือหุ้น</p>
                <div className="modal-block-label">
                  <DropdownArrow
                    options={allRegistrations}
                    isOpen={isOpenDropdownArrow}
                    onClick={() => setIsOpenDropdownArrow(!isOpenDropdownArrow)}
                    onBlur={() => setIsOpenDropdownArrow(false)}
                    setSelected={(e) => {
                      setShareId(e.registraionNo);
                      setShareIdModal(e.registraionNo);
                    }}
                    selected={{
                      registraionNo:
                        allRegistrations.length > 0 && !shareId
                          ? allRegistrations[0].registraionNo
                          : shareId,
                    }}
                    display={"registraionNo"}
                  />
                </div>
              </div>
            </LineCard>
            <SubTitleDescription>
              <input
                type={"checkbox"}
                value={isRegistrationChecked}
                style={{ transform: "scale(1.5)", marginRight: "1rem" }}
                onChange={() =>
                  setIsRegistrationChecked(!isRegistrationChecked)
                }
              />
              <label>
                ข้าพเจ้าขอรับรองว่า
                ข้าพเจ้าได้ทำการตรวจสอบข้อมูลข้างต้นนี้เป็นที่เรียบร้อยแล้ว
              </label>
            </SubTitleDescription>
            <Header style={{ textAlign: "center" }}>
              {
                <Button
                  type="button"
                  value={"ยืนยันว่าตรวจสอบแล้ว"}
                  onClick={() => setShowRegistrationModal(false)}
                  disabled={shareId && !isRegistrationChecked ? false : true}
                  style={{
                    fontSize: "16px",
                    margin: "auto",
                  }}
                />
              }
            </Header>
          </ContainerCard>
        </Card>
      </Modal>
      <Modal show={showAlertModal} style={{ width: "100%" }}>
        <Card>
          <ContainerCard>
            <Header style={{ textAlign: "center" }}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  fontSize: "55px",
                  color: "#1D3AB1",
                  border: "8px solid #1D3AB1",
                  padding: "10px",
                  width: "60px",
                  borderRadius: "100%",
                  margin: "auto",
                }}
              />
            </Header>
            <Header style={{ textAlign: "center" }}>
              <h3
                style={{
                  fontSize: "20px",
                  color: "#1D3AB1",
                  fontWeight: "bold",
                  margin: "auto",
                }}
              >
                เปลี่ยนแปลงข้อมูลเรียบร้อยแล้ว
              </h3>
            </Header>
            <Header style={{ textAlign: "center" }}>
              <h3
                style={{
                  fontSize: "17px",
                  color: "#000000",
                  fontWeight: "normal",
                  margin: "auto",
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
                  margin: "auto",
                }}
              />
            </Header>
          </ContainerCard>
        </Card>
      </Modal>
      <Modal show={showModal} style={{ width: "100%" }}>
        <Card style={{ width: "100%", maxWidth: "700px" }}>
          <ContainerCard>
            <Header style={{ margin: "20px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  color: "#1D3AB1",
                  fontWeight: "bold",
                }}
              >
                ข้อมูลการจองสิทธิ
              </h3>
            </Header>
            <LineCard style={{ padding: "20px", fontSize: "17px" }}>
              <div className="modal-flex">
                <p className="modal-flex-label">ชื่อ - นามสกุล*</p>
                <p className="modal-flex-label-info">{fullnameModal}</p>
              </div>
              <div className="modal-flex">
                <p className="modal-flex-label">เลขทะเบียนผู้ถือหุ้น*</p>
                <p className="modal-flex-label-info">{shareIdModal}</p>
              </div>
              <div className="modal-block">
                <p className="modal-block-label">เบอร์โทรศัพท์*</p>
                <div className="modal-block-label">
                  <FieldInput
                    value={phoneNoModal}
                    onChange={(e) =>
                      setPhoneNoModal(e.target.value.replace(/[^0-9.]/, ""))
                    }
                    maxLength={10}
                    placeholder={"กรุณากรอกเบอร์โทรศัพท์"}
                  />
                </div>
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
                  fontSize: "17px",
                  height: "35px",
                  margin: "0 10px 0 0",
                  backgroundColor: "#809FB8",
                }}
              />
              <Button
                type="submit"
                value={"ยืนยันการเปลี่ยนแปลงข้อมูล"}
                onClick={() => handlerOnAcceptModal(1)}
                style={{
                  fontSize: "17px",
                  height: "35px",
                  margin: "0 0 0 10px",
                }}
              />
            </div>
          </ContainerCard>
        </Card>
      </Modal>
      <Modal show={showStepOneVerify} style={{ width: "100%" }}>
        <Card style={{ width: "100%", maxWidth: "700px" }}>
          <ContainerCard>
            <Header style={{ margin: "20px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  color: "#1D3AB1",
                  fontWeight: "bold",
                }}
              >
                ตรวจสอบข้อมูลการจองสิทธิ
              </h3>
            </Header>
            <LineCard style={{ padding: "20px", fontSize: "17px" }}>
              <div className="modal-flex">
                <p className="modal-flex-label">ชื่อ - นามสกุล</p>
                <p className="modal-flex-label-info">{fullname}</p>
              </div>
              <div className="modal-flex">
                <p className="modal-flex-label">เลขทะเบียนผู้ถือหุ้น</p>
                <p className="modal-flex-label-info">{shareId}</p>
              </div>
              <div className="modal-flex">
                <p className="modal-flex-label">เบอร์โทรศัพท์</p>
                <p className="modal-flex-label-info">{phoneNo}</p>
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
                value={"ย้อนกลับ"}
                onClick={() => setShowStepOneVerify(!showStepOneVerify)}
                style={{
                  fontSize: "17px",
                  height: "35px",
                  margin: "0 10px 0 0",
                  backgroundColor: "#809FB8",
                }}
              />
              <Button
                type="submit"
                value={"ถัดไป"}
                onClick={() => {
                  setShowStepOneVerify(false);
                  handlerOnClickPage(2);
                }}
                style={{
                  fontSize: "17px",
                  height: "35px",
                  margin: "0 0 0 10px",
                }}
              />
            </div>
          </ContainerCard>
        </Card>
      </Modal>
      <Modal show={addressModal}>
        <div className="bank-validate">
          <Card>
            <ContainerCard>
              <Header
                bank={true}
                style={{
                  margin: "20px",
                  color: "#1D3AB1",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{
                    margin: "10px 10px 0px 10px",
                    color: "#FB0303",
                    fontSize: "30px",
                  }}
                />
                <h3 style={{ color: "#FB0303" }}>
                  กรณีที่ท่านแจ้งบัญชีธนาคารนอกเหนือจาก 9 ธนาคาร
                  <br />
                  ทางบริษัทขอคืนเงินให้ท่านเป็นเช็ค
                </h3>
              </Header>
              <LineCard style={{ padding: "1rem 2rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {masterBankRefund.length > 0 &&
                    masterBankRefund.map((bank, index) => {
                      return (
                        <>
                          <LineCardBank>
                            <img
                              src={bank.logo}
                              width={25}
                              height={25}
                              style={{
                                marginLeft: "1rem",
                                marginRight: "1rem",
                              }}
                            />
                            <p>{bank.nameTH}</p>
                          </LineCardBank>
                        </>
                      );
                    })}
                </div>
              </LineCard>
              <LineCard style={{ marginBottom: "1rem" }}>
                <Header
                  style={{
                    color: "#1D3AB1",
                    fontWeight: "bold",
                    marginLeft: "2rem",
                  }}
                >
                  <h3>รายละเอียดที่อยู่ของท่าน</h3>
                </Header>
                <div
                  className="profile-detail"
                  style={{ padding: "1rem 2rem" }}
                >
                  <InputDiv>
                    <div className="inputField">
                      <p className="label-input bank-detail-title">
                        ชื่อ-นามสกุล :
                      </p>
                      <p className="label-input bank-detail">
                        {profile ? `${profile.name} ${profile.lastname}` : "-"}
                      </p>
                    </div>
                  </InputDiv>
                  <InputDiv>
                    <div className="inputField">
                      <p className="label-input bank-detail-title">ที่อยู่ :</p>
                      <p className="label-input bank-detail">
                        {profile ? profile.address + " " + profile.zipcode : ""}
                      </p>
                    </div>
                  </InputDiv>
                  <InputDiv>
                    <div className="inputField">
                      <p className="label-input bank-detail-title">
                        เบอร์โทรศัพท์ :
                      </p>
                      <p className="label-input bank-detail">{phoneNo}</p>
                    </div>
                  </InputDiv>
                </div>
              </LineCard>
              <div
                style={{ margin: "auto", marginTop: "1rem", maxWidth: "400px" }}
              >
                <Button
                  type="submit"
                  value={"ฉันรับทราบแล้ว"}
                  onClick={handlerOnAcceptVerify}
                />
              </div>
            </ContainerCard>
          </Card>
        </div>
      </Modal>
      <Modal show={false} style={{ padding: "50px" }}>
        <Card style={{ height: "auto", width: "60%" }}>
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
          (() => {
            if (page === 2) {
              return (
                <ModalDetail
                  fullname={fullname}
                  shareId={shareId}
                  phoneNo={phoneNo}
                  dropdownSelect={dropdownSelect}
                  tradingAccountNo={tradingAccountNo}
                  rightStockName={rightStockName}
                  stockVolume={stockVolume}
                  offerPrice={offerPrice}
                  rightStockVolume={rightStockVolume}
                  rightSpecialName={rightSpecialName}
                  excessVolume={excessVolume}
                  currentPrice={currentPrice}
                  hanlderOnBack={hanlderOnBack}
                  handlerOnAccept={handlerOnAccept}
                  previewImage={previewImage}
                  paidRightVolume={Number(currentStockVolume)}
                  isBuy={true}
                />
              );
            } else if (page === 3) {
              return (
                <ModalDetail
                  fullname={fullname}
                  shareId={shareId}
                  phoneNo={phoneNo}
                  dropdownSelect={dropdownSelect}
                  tradingAccountNo={tradingAccountNo}
                  rightStockName={rightStockName}
                  stockVolume={stockVolume}
                  offerPrice={offerPrice}
                  rightStockVolume={rightStockVolume}
                  rightSpecialName={rightSpecialName}
                  excessVolume={excessVolume}
                  currentPrice={currentPrice}
                  depositBank={depositBank}
                  bank={bank}
                  hanlderOnBack={() => setValidateAccept(false)}
                  handlerOnAccept={handlerOnSubmitedOrder}
                  lastVerifyChecked={lastVerifyChecked}
                  setLastVerifyChecked={() =>
                    setLastVerifyChecked(!lastVerifyChecked)
                  }
                  paidRightVolume={Number(currentStockVolume)}
                  checkbox={true}
                />
              );
            }
          })()
        ) : (
          <>
            <FlexContainer>
              <StepDiv className="step-div" page={page}>
                <div className="step one">
                  <Step
                    isActive={page === 1}
                    onClick={() => handlerOnClickPage(1)}
                  >
                    <b>1</b>
                    <Line className="hr two" />
                  </Step>
                  <StepDetail isActive={page === 1}>
                    ขั้นตอนที่ 1 - ลงทะเบียนจองสิทธิ
                  </StepDetail>
                </div>
                <div className="step two">
                  <Step
                    isActive={page === 2}
                    onClick={() => handlerOnClickPage(2)}
                  >
                    <b>2</b>
                    <Line className="hr three" />
                  </Step>
                  <StepDetail isActive={page === 2}>
                    ขั้นตอนที่ 2 - จัดการจองซื้อ
                  </StepDetail>
                </div>
                <div className="step three">
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
                          <h3 style={{ fontWeight: "bold" }}>
                            ข้อมูลการเสนอขายหุ้นเพิ่มทุน
                          </h3>
                          <h3
                            className="share-name"
                            style={{ color: "#1D3AB1", fontWeight: "bold" }}
                          >
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
                            <p
                              style={{
                                textIndent: "2rem",
                                textAlign: "justify",
                                paddingTop: "1rem",
                                paddingRight: "1rem",
                              }}
                            >
                              {shareDescription}
                            </p>
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
                            กรอกข้อมูลจองสิทธิ
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
                          <InputDiv className="input-detail">
                            <div className="inputField">
                              <p
                                className="label-input share-detail"
                                style={{ fontWeight: "bold" }}
                              >
                                ชื่อ-นามสกุล
                              </p>
                              <p className="label-input share-detail">
                                {fullname}
                              </p>
                            </div>
                          </InputDiv>
                          <InputDiv className="input-detail">
                            <div className="inputField">
                              <p
                                className="label-input share-detail"
                                style={{ fontWeight: "bold" }}
                              >
                                เบอร์โทรศัพท์ที่สามารถติดต่อได้
                              </p>
                              <p className="label-input share-detail">
                                {phoneNo || "-"}
                              </p>
                            </div>
                          </InputDiv>
                        </ContentSpace>
                        <ContentSpace>
                          <InputDiv className="input-detail">
                            <div className="inputField">
                              <p
                                className="label-input share-detail"
                                style={{ fontWeight: "bold" }}
                              >
                                เลขทะเบียนผู้ถือหุ้น
                              </p>
                              <p className="label-input share-detail">
                                {shareId || "-"}
                              </p>
                            </div>
                          </InputDiv>
                        </ContentSpace>
                        <Header>
                          <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
                            รายละเอียดการจัดสรรหุ้น
                          </h3>
                        </Header>
                        <Content>
                          <InputDiv>
                            <Dot />
                            <p style={{ fontWeight: "bold" }}>
                              ฝากหุ้นที่ได้รับการจัดสรรไว้ที่หมายเลขสมาชิก
                            </p>
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
                              selected={
                                JSON.parse(localStorage.getItem("step_1"))
                                  ? JSON.parse(localStorage.getItem("step_1"))
                                      .dropdownSelect
                                  : dropdownSelect
                              }
                            />
                          </InputDiv>
                          <InputDiv style={{ marginLeft: "50px" }}>
                            <p style={{ fontWeight: "bold" }}>
                              เลขที่บัญชีซื้อขาย
                            </p>
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
                      <div
                        style={{
                          margin: "auto",
                          marginTop: "1rem",
                          maxWidth: "400px",
                        }}
                      >
                        <Button
                          type="submit"
                          value="ถัดไป"
                          disabled={isDisableToPage2}
                          onClick={() => {
                            if (!phoneNo) {
                              setShow(true);
                              setStatus(999);
                              setAlertMessage("กรุณากรอกเบอร์โทรศัพท์");
                              setTimeout(() => {
                                setShow(false);
                              }, 5000);
                            } else {
                              setShowStepOneVerify(true);
                            }
                          }}
                        />
                      </div>
                    </>
                  );
                }

                if (page === 2) {
                  return (
                    <>
                      <div className="card-div">
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
                              จำนวนหุ้นเดิม
                            </h3>
                          </Header>
                          <ShareDetail>
                            <p>{rightStockName}</p>
                            <b>
                              {stockVolume ? formatNumber(stockVolume) : "-"}
                            </b>
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
                            <p style={{ fontSize: "18.72px" }}>
                              {offerPrice ? formatNumber(offerPrice) : "0"}
                            </p>
                            <p style={{ fontSize: "18.72px" }}>บาท</p>
                          </ShareDetail>
                        </StyledLineCard>
                      </div>
                      <div className="card-div">
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
                              สิทธิในการซื้อหุ้นเพิ่มทุน
                            </h3>
                          </Header>
                          <ShareDetail>
                            <p>{rightStockName}</p>
                            <b>
                              {rightStockVolume
                                ? formatNumber(rightStockVolume)
                                : "-"}
                            </b>
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
                              {rightStockVolume && offerPrice
                                ? formatNumber(
                                    Number(rightStockVolume) *
                                      Number(offerPrice)
                                  )
                                : "-"}
                            </b>
                            <p>บาท</p>
                          </ShareDetail>
                          <ShareDetail style={{ fontSize: "14px" }}>
                            <p style={{ width: "100%" }}>
                              (การคำนวนจากราคาเสนอขาย{" "}
                              {offerPrice ? formatNumber(offerPrice) : "-"} บาท
                              ต่อ หุ้น)
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
                            <p style={{ color: "#C4C4C4" }}>รอการจัดสรร</p>
                            {/* <b>{rightSpecialVolume}</b> */}
                            <p>หน่วย</p>
                          </ShareDetail>
                        </StyledLineCard>
                      </div>
                      <div className="card-div">
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
                              จำนวนที่ต้องการจองซื้อ
                            </h3>
                          </Header>
                          <ShareDetail style={{ marginBottom: "-10px" }}>
                            <p>{rightStockName}</p>
                            <Input
                              type={"text"}
                              value={formatNumber(currentStockVolume)}
                              onChange={(e) => {
                                setCurrentStockVolume(
                                  e.target.value
                                    .replace(/\,/g, "")
                                    .replace(/[^0-9.]/, "")
                                );

                                if (
                                  e.target.value.replace(/[^0-9.]/, "") > 0 &&
                                  isAcceptVerify === true
                                ) {
                                  setIsConfirmOrder(false);
                                }
                              }}
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
                              value={formatNumber(Number(currentPrice))}
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
                            <p style={{ color: "#C4C4C4" }}>รอการจัดสรร</p>
                            <p>หน่วย</p>
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
                              width: "100%",
                            }}
                          >
                            <Header>
                              <h3
                                style={{ color: "#1D3AB1", fontWeight: "bold" }}
                              >
                                จำนวนหุ้นที่ซื้อเกินสิทธิ
                              </h3>
                            </Header>
                            <ShareDetail>
                              <p>{rightStockName}</p>
                              <b>
                                {excessVolume
                                  ? formatNumber(excessVolume)
                                  : "-"}
                              </b>
                              <p>หุ้น</p>
                            </ShareDetail>
                          </StyledLineCard>
                          <StyledLineCard
                            style={{
                              marginBottom: "20px",
                              border: "1px solid #1D3AB1",
                              boxSizing: "border-box",
                              borderRadius: "10px",
                              width: "100%",
                            }}
                          >
                            <Header>
                              <h3
                                style={{ color: "#1D3AB1", fontWeight: "bold" }}
                              >
                                กรณีไม่ได้จัดสรรหุ้นส่วนที่เกินสิทธิ
                                ขอให้โอนเงินเข้าบัญชี
                              </h3>
                            </Header>
                            <ShareDetail style={{ display: "block" }}>
                              <div className="input-div">
                                <InputDiv
                                  style={{ width: "100%", margin: "auto" }}
                                >
                                  <p style={{ fontWeight: "bold" }}>
                                    ฝากเงินเข้าบัญชีธนาคาร
                                  </p>
                                </InputDiv>
                                <InputDiv
                                  style={{
                                    width: "100%",
                                    marginTop: "20px",
                                    border: "2px solid #d9e1e7;",
                                  }}
                                >
                                  <DropdownArrow
                                    options={masterBankRefund}
                                    isOpen={isOpenDropdownArrow}
                                    onClick={() =>
                                      setIsOpenDropdownArrow(
                                        !isOpenDropdownArrow
                                      )
                                    }
                                    onBlur={() => setIsOpenDropdownArrow(false)}
                                    setSelected={setDepositBank}
                                    selected={depositBank}
                                    display={"nameTH"}
                                    otherOption={true}
                                  />
                                </InputDiv>
                              </div>
                              {depositBank && depositBank.nameTH === "อื่นๆ" && (
                                <div className="input-div">
                                  <InputDiv
                                    style={{ width: "100%", margin: "auto" }}
                                  >
                                    <p
                                      style={{
                                        width: "200px",
                                        textAlign: "start",
                                        fontWeight: "bold",
                                      }}
                                    ></p>
                                  </InputDiv>
                                  <InputDiv
                                    style={{
                                      width: "100%",
                                      textAlign: "start",
                                      margin: "0",
                                    }}
                                  >
                                    <p
                                      style={{
                                        width: "100%",
                                        color: "#FB0303",
                                        margin: "0",
                                      }}
                                    >
                                      กรณีที่ท่านแจ้งบัญชีธนาคารนอกเหนือจาก 9
                                      ธนาคาร ทางบริษัทขอคืนเงินให้ท่านเป็นเช็ค
                                    </p>
                                  </InputDiv>
                                </div>
                              )}
                              <div className="input-div">
                                <InputDiv
                                  style={{ width: "100%", margin: "auto" }}
                                >
                                  <p
                                    style={{
                                      width: "200px",
                                      textAlign: "start",
                                      fontWeight: "bold",
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
                                    disabled={
                                      depositBank &&
                                      depositBank.nameTH === "อื่นๆ"
                                    }
                                    onChange={(e) =>
                                      setBank(
                                        e.target.value.replace(/[^0-9.]/, "")
                                      )
                                    }
                                  />
                                </InputDiv>
                              </div>
                              {bookbankFile && (
                                <div
                                  style={{
                                    width: "100%",
                                    textAlign: "start",
                                    marginLeft: "2rem",
                                  }}
                                >
                                  {bookbankFile.name}
                                </div>
                              )}
                              <div className="input-div">
                                <InputDiv
                                  style={{
                                    marginTop: "10px",
                                    width: "100%",
                                    textAlign: "start",
                                    padding: "0 1rem",
                                  }}
                                >
                                  <Button
                                    type="button"
                                    value="แนบหน้าบัญชีธนาคาร"
                                    onClick={handleClick}
                                    accept="image/jpeg, image/png"
                                    disabled={
                                      depositBank &&
                                      depositBank.nameTH === "อื่นๆ"
                                    }
                                    style={{ width: "100%" }}
                                  />
                                  <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    onChange={handleOnFileSelect}
                                    style={{ display: "none" }}
                                  />
                                </InputDiv>
                                <InputDiv
                                  style={{
                                    marginTop: "10px",
                                    width: "100%",
                                    textAlign: "start",
                                    padding: "0 1rem",
                                  }}
                                >
                                  <Button
                                    type="submit"
                                    value="ตรวจสอบข้อมูล"
                                    onClick={() => setAddressModal(true)}
                                    disabled={bankDisableButton}
                                    style={{ width: "100%" }}
                                  />
                                </InputDiv>
                              </div>
                            </ShareDetail>
                          </StyledLineCard>
                        </div>
                      </div>
                      <div
                        style={{
                          margin: "auto",
                          marginTop: "1rem",
                          maxWidth: "400px",
                        }}
                      >
                        <Button
                          type="submit"
                          value="ยืนยันคำจองซื้อ"
                          disabled={isConfirmOrder}
                          onClick={() => handlerOnSubmited()}
                        />
                      </div>
                    </>
                  );
                }

                if (page === 3) {
                  return (
                    <>
                      <LineCard
                        style={{ borderColor: persianblue, margin: "auto" }}
                      >
                        <ShareDetail
                          className="result"
                          style={{ fontSize: "20px", padding: "20px" }}
                        >
                          <b
                            className="result-label"
                            style={{ whiteSpace: "pre" }}
                          >
                            ยอดที่ท่านต้องการทำรายการ
                          </b>
                          <b className="result-label">
                            {formatNumber(currentPrice)}
                          </b>
                          <b className="result-label">บาท</b>
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
                          </ShareDetail>
                        </Header>
                        <div
                          className="line-space"
                          style={{ padding: "0 20px" }}
                        >
                          <hr style={{ border: "0.75px solid #D9E1E7" }} />
                        </div>
                        <div className="payment-method">
                          <b style={{ width: "20%", margin: "10px" }}>
                            เลือกวิธีการชำระเงิน
                          </b>
                          <div
                            className="bank-name"
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
                                  defaultChecked={radioCheckedPayment}
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
                                          <div className="bank-div">
                                            <div className="bank-img">
                                              <img
                                                src={bank.logo}
                                                height={"33px"}
                                                width={"32px"}
                                              />
                                            </div>
                                            <div className="bank-detail">
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
                                              </p>
                                              <p>
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
                        <div className="payment-method">
                          <div className="btn-label">
                            <b>หลักฐานการชำระเงิน</b>
                          </div>
                          <UploadButton className="btn-upload">
                            แนบหลักฐานการชำระเงิน
                            <input
                              type="file"
                              style={{ display: "none" }}
                              accept="image/jpeg, image/png"
                              onChange={handleSelectedFile}
                            />
                          </UploadButton>
                          <div className="warning-text">
                            <p>
                              <FontAwesomeIcon
                                icon={faCircleInfo}
                                style={{ margin: "0 10px" }}
                              />
                              กรุณาอัพโหลดไฟล์ .PNG .JPG และ JPEG ขนาดไม่เกิน 5
                              MB
                            </p>
                          </div>
                        </div>
                        {filename && (
                          <div
                            className="payment-method"
                            style={{
                              display: "flex",
                            }}
                          >
                            <b
                              style={{
                                width: "20%",
                                margin: "20px 10px 10px 10px",
                              }}
                            ></b>
                            <div>
                              <p
                                style={{
                                  width: "100%",
                                  fontSize: "17px",
                                  margin: "auto",
                                  marginBottom: "20px",
                                  marginTop: "20px",
                                }}
                              ></p>
                              {filename}
                            </div>
                          </div>
                        )}
                        <div className="payment-method">
                          <div className="btn-label">
                            <b>วันที่โอน</b>
                          </div>
                          <div className="btn-label">
                            <InputSeacrh
                              type="date"
                              value={paymentDate}
                              onChange={(e) => {
                                setPaymentDate(e.target.value);
                              }}
                            />
                          </div>
                          <div className="btn-label">
                            <b>เวลาโอนเงิน</b>
                          </div>
                          <div className="btn-label">
                            <InputSeacrh
                              type="time"
                              value={paymentTime}
                              onChange={(e) => {
                                setPaymentTime(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </LineCard>
                      <div
                        className="message-info"
                        style={{
                          margin: "10px 10px 10px 10px",
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
                          โปรดตรวจสอบข้อมูลของท่านให้เรียบร้อย หากท่านกดปุ่ม{" "}
                          <b>ถัดไป</b> จะไม่สามารถกลับมาแก้ไขข้อมูลได้อีก
                        </p>
                      </div>
                      <div
                        className="btn-accept-buy"
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          marginTop: "20px",
                          margin: "auto",
                        }}
                      >
                        <Button
                          type="button"
                          value={"ย้อนกลับ"}
                          style={{
                            marginTop: "1rem",
                            margin: "0 2rem",
                            backgroundColor: "#809FB8",
                          }}
                          onClick={() => {
                            setValidateAccept(false);
                            setPage(2);
                            setFile(null);
                          }}
                        />

                        <Button
                          type="button"
                          value={"ถัดไป"}
                          disabled={!file}
                          style={{ marginTop: "1rem", margin: "0 2rem" }}
                          onClick={handleSubmit}
                        />
                      </div>
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
  margin: auto 0;
  width: 50%;
  height: 50px;
  text-align: center;
  background: #edb52d;
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-size: 17px;

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 100%;
  }

  /* For Tablet */
  @media screen and (min-width: 541px) and (min-width: 880px) {
  }
`;

const Container = styled.div`
  padding: 20px 20px;
  height: 90vh;
  width: 80vw;
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

  .text-title-end {
    width: 40%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .content-member {
    color: #809fb8;

    .content-detail-text {
      margin: 10px 0;
      display: flex;
      align-items: baseline;
    }

    .content-detail-condition {
      display: flex;
      text-align: center;

      .text-title {
        width: 100px;
      }
    }

    .content-detail-share {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      .text-title {
        width: 40%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      }
    }

    .text-black {
      color: #000000;
      @media screen and (max-width: 540px) {
        text-align: end;
      }
    }

    .text-amount {
      display: flex;
      justify-content: space-between;
      width: 40%;
      align-items: baseline;
    }
  }

  .buy-flex {
    width: 48%;
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

    .content-member {
      .content-detail-condition {
        display: block;
        text-align: center;

        .text-title {
          // width: 100%;
        }
      }

      // .content-detail-share {
      //   width: 100%;
      //   display: block;
      //   align-items: baseline;

      //   .text-title {
      //     width: 40%;
      //     display: flex;
      //     align-items: baseline;
      //     justify-content: space-between;
      //   }
      // }
    }

    .text-title-end {
      width: 100%;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    width: 90vw;

    .card-tag {
      display: inline;
    }

    .buy-flex {
      width: 100%;
    }
    .buy-flex {
      width: 100%;
    }

    .content-member {
      .content-detail-condition {
        display: block;
        text-align: center;

        .text-title {
          width: 100%;
        }
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
    }

    .text-title-end {
      width: 50%;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
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

  .step {
    display: block;
    margin: 0 20px;
  }
  /* For Mobile */
  @media screen and (max-width: 540px) {
    .step {
      margin: 0px;
    }

    .one {
      display: ${(props) => (props.page === 1 ? "block" : "none")};
    }
    .two {
      display: ${(props) => (props.page === 2 ? "block" : "none")};
    }
    .three {
      display: ${(props) => (props.page === 3 ? "block" : "none")};
    }
  }

  /* For Mobile */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    .step {
      margin: 0px;
    }

    .one {
      display: ${(props) => (props.page === 1 ? "block" : "none")};
    }
    .two {
      display: ${(props) => (props.page === 2 ? "block" : "none")};
    }
    .three {
      display: ${(props) => (props.page === 3 ? "block" : "none")};
    }
  }
`;

const InputDiv = styled.div`
  margin: 10px 0;

  .input-file-upload {
    width: 200px;
  }

  .inputField {
    display: flex;
    text-align: start;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;

    p {
      position: relative;
      margin: 0 10px;
      width: 50%;
    }

    .label-input-flex {
      width: 20%;
      margin-top: auto;
      margin-bottom: auto;
    }

    .div-dropdown {
      width: 100%;
      display: flex;

      .label-dropdown {
        width: 30%;
        max-width: 1000px;
      }
    }

    .label-input {
      justify-content: start;
      width: 50%;
    }

    .share-detail {
      white-space: nowrap;
      width: 100%;
    }

    .bank-detail-title {
      width: 20%;
    }
    .bank-detail {
      width: 80%;
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
        width: 100%;

        span {
          width: 200px;
        }
      }

      .label-input {
        justify-content: start;
        width: 100%;
      }

      .bank-detail-title {
        width: 100%;
      }
      .bank-detail {
        width: 100%;
      }
    }

    .inputField > .div-dropdown {
      width: 100%;
      display: block;

      .label-input-flex {
        width: 100%;
        margin: 0 0 0.5rem 0;
      }

      .label-dropdown {
        width: 100%;
      }
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    .inputField > .div-dropdown {
      .label-input-flex {
        width: 100%;
      }

      .label-dropdown {
        width: 100%;
      }
    }
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
  height: 40px;
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

const Dot = styled.div`
  width: 30px;
  height: 30px;
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
  display: flex;
  .share-name {
    margin-left: 1rem;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    display: block;
    .share-name {
      margin-left: 0rem;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    display: flex;
    justify-content: ${(props) => (props.bank ? "start" : "space-between")};
    .share-name {
      margin-left: 0rem;
    }
  }
`;

const Content = styled.div`
  margin: 0 10px;
  position: relative;
  .desc {
    font-size: 17px;
    overflow-y: auto;
    scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
    max-height: 300px;
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
  @media screen and (min-width: 541px) and (max-width: 880px) {
    .btn-read-more {
      width: 120px;
    }
  }
`;

const ContentSpace = styled.div`
  margin: 0 10px;
  display: flex;
  justify-content: start;
  .desc {
    font-size: 17px;
    overflow-y: scroll;
    scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
  }
  p {
    font-size: 17px;
  }

  .input-detail {
    width: 30%;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    display: block;

    .input-detail {
      width: 100%;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    display: block;

    .input-detail {
      width: 100%;
    }

    .flex {
      display: flex;
    }
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
    @media screen and (min-width: 541px) and (max-width: 880px) {
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
    @media screen and (min-width: 541px) and (max-width: 880px) {
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
    @media screen and (min-width: 541px) and (max-width: 880px) {
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
  @media screen and (min-width: 541px) and (max-width: 880px) {
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
  @media screen and (min-width: 541px) and (max-width: 880px) {
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

  .bank-div {
    display: flex;

    .bank-img {
      margin-left: 40px;
      margin-top: auto;
      margin-bottom: auto;
    }

    .bank-detail {
      margin: 10px 0px 10px 20px;
    }
  }

  @media screen and (max-width: 540px) {
    .bank-div {
      display: block;

      .bank-img {
        text-align: center;
        margin: 0;
      }

      .bank-detail {
        margin: 0;

        * {
          width: 100%;
        }
      }
    }
  }
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
  width: 49%;

  @media screen and (max-width: 540px) {
    margin: 0;
    width: 100%;
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    margin: 0;
    width: 100%;
  }
`;

const SubTitleDescription = styled.div`
  margin: auto;
  display: flex;
  margin-top: 1rem;
`;

const Spacer = styled.div`
  margin: 0 3rem;

  @media screen and (max-width: 540px) {
    margin: 0;
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    margin: 0;
  }
`;

const InputSeacrh = styled.input`
  border: 2px solid #d9e1e7;
  border-radius: 10px;
  background: #fff;
  position: relative;
  font-size: 16px;
  padding: 10px;

  .date-input {
    width: 200px;
    height: 42px;
  }

  :focus {
    outline: none;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 100%;

    .date-input {
      width: 100%;
      height: 42px;
    }
  }
`;

export default Buy;
