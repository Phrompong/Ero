import styled from "styled-components";
import { useState, useEffect } from "react";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";

import change from "../assets/icon_change.png";

import { Card } from "../components/UI/Card";
import { FlexContainer } from "../components/UI/FlexContainer";
import { DropdownSelect } from "../components/UI/Dropdown";
import { LineCard } from "../components/UI/Card";
import { FieldInput } from "../components/UI/Search";
import { ModalAlert } from "../components/ModalAlert/ModalAlert";
import { showAlert } from "../utils/showAlert";

import { balihai, ivory, persianblue, shamrock, white } from "../utils/color";
import {
  httpFetch,
  httpPostRequest,
  httpGetRequest,
  httpPostRequestUploadFile,
} from "../utils/fetch";
import { useSelector } from "react-redux";

const Buy = () => {
  const { user } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState();

  const [currentStockVolume, setCurrentStockVolume] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  // step 1
  const [shareName, setShareName] = useState(null);
  const [shareDescription, setShareDescription] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [shareId, setShareId] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [shareOption, setShareOption] = useState([]);
  const [dropdownSelect, setDropdownSelect] = useState(null)
  const [isReadMore, setIsReadMore] = useState(false)

  // step 2
  const [rightStockName, setRightStockName] = useState(null);
  const [stockVolume, setStockVolume] = useState(null);
  const [offerPrice, setOfferPrice] = useState(null);
  const [rightStockVolume, setRightStockVolume] = useState(null);
  const [rightSpecialName, setRightSpecialName] = useState(null);
  const [rightSpecialVolume, setRightSpecialVolume] = useState(null);
  const [excessVolume, setExcessVolume] = useState(null);

  // step 3
  const [logo, setLogo] = useState(null);
  const [nameTH, setNameTH] = useState(null);
  const [ref1, setRef1] = useState(null);
  const [ref2, setRef2] = useState(null);
  const [qrCode, setQRCode] = useState(null);

  const [file, setFile] = useState();
  const [orderId, setOrderId] = useState(null);

  const [bank, setBank] = useState(null)
  const [depositBank, setDepositBank] = useState(null)

  const fetchStep1 = () => {
    getCustomerProfile()
    getBrokers()
  };

  const fetchStep2 = () => {
    getCustomerStock()
  };

  const fetchStep3 = () => {
    getMasterBank()
  };

  const getCustomerProfile = async () => {
    const [res, status] = await httpGetRequest(
      `masterCustomers/${user.customerId}`
    );

    if (status === 200) {
      const payload = res.data;
      setFullname(`${payload.name} ${payload.lastname}`);
      setShareId(payload.id);
      setPhoneNo(payload.telephone);
    }
  }

  const getBrokers = async () => {
    const [res, status] = await httpGetRequest(
      "masterBrokers"
    );

    if (status === 200) {
      const payload = res.data;
      const fakeData = [
        {
          _id: "62601de7c1fa7362f2bc8cd4",
          code: "001",
          name: "บริษัทหลักทรัพย์ แลนด์ แอนด์ เฮ้าส์ จํากัด (มหาชน)",
          status: true
        },
        {
          _id: "62601de7c1fa7362f2bc8cd4",
          code: "002",
          name: "บริษัทหลักทรัพย์ แลนด์ แอนด์ เฮ้าส์ จํากัด (มหาชน)",
          status: true
        },
        {
          _id: "62601de7c1fa7362f2bc8cd4",
          code: "003",
          name: "บริษัทหลักทรัพย์ แลนด์ แอนด์ เฮ้าส์ จํากัด (มหาชน)",
          status: true
        },
        {
          _id: "62601de7c1fa7362f2bc8cd4",
          code: "004",
          name: "บริษัทหลักทรัพย์ แลนด์ แอนด์ เฮ้าส์ จํากัด (มหาชน)",
          status: true
        },
        {
          _id: "62601de7c1fa7362f2bc8cd4",
          code: "005",
          name: "บริษัทหลักทรัพย์ แลนด์ แอนด์ เฮ้าส์ จํากัด (มหาชน)",
          status: true
        }
      ]
      // setShareOption(payload);
      const _options = fakeData.map((data) => {
        return {
          ...data,
          fullname: `${data.code} ${data.name}`
        }
      })
      setShareOption(_options);
    }
  }

  const getCustomerStock = async () => {
    const [res, status] = await httpGetRequest(
      `customerStocks?customerId=${user.customerId}`
    );

    if (status === 200) {
      const payload = res.data;
      setRightStockName(payload.rightStockName);
      setStockVolume(payload.stockVolume);
      setOfferPrice(payload.offerPrice);
      setRightStockName(payload.rightStockName);
      setRightStockVolume(payload.rightStockVolume || '-');
      setRightSpecialName(payload.rightSpecialName);
      setRightSpecialVolume(payload.rightSpecialVolume);
    }
  }

  const getMasterBank = async () => {
    const [res, status] = await httpGetRequest(
      "masterBanks"
    );

    if (status === 200) {
      const payload = res.data[0];
      setLogo(payload.logo);
      setNameTH(payload.nameTH);
      setRef1(payload.ref1);
      setRef2(payload.ref2);
      setQRCode(payload.qrCode);
    }
  }

  const handlerOnSubmited = async () => {
    setPage(3);

    const [res, status] = await httpFetch(
      "POST",
      {
        customerId: user.customerId,
        rightStockName,
        stockVolume,
        rightSpecialName,
        paidRightVolume: Number(currentStockVolume),
        paidSpecialVolume: 0,
        paymentAmount: Number(currentPrice),
        returnAmount: 0,
        excessVolume,
      },
      "orders"
    );

    setOrderId(res.data._id);
  };

  const handleSelectedFile = (e) => {
    const [file] = e.target.files;
    const { name: fileName, size } = file;
    setFile(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("File", file);
    const endpoint = `uploads/image?orderId=${orderId}`;

    const [res, status] = await httpPostRequestUploadFile(formData, endpoint);
    let msg = res.message;
    setStatus(status);
    if (status === 200) {
      msg = "Upload Completed";
      console.log(msg);
    }
    setAlertMessage(msg);
    showAlert(setShow, 2000);
    setFile();
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
      `)
      setIsReadMore(true)
    } else {
      const desc = `บมจ.สกาย ทาวเวอร์ (STOWER) เปิดเผยว่า ที่ประชุมคณะกรรมการบริษัท ครั้งที่ 3/2565 เมื่อวันที่ 18 มี.ค.65 มีมติให้นำเสนอต่อที่ประชุมสามัญผู้ถือหุ้น ประจำปี 2565 เพื่อพิจารณาอนุมัติการออกและเสนอขายหุ้นสามัญเพิ่มทุนของบริษัทจำนวนไม่เกิน 17,979,717,949 หุ้นให้แก่ผู้ถือหุ้นเดิมตามสัดส่วนจำนวนหุ้น
        ที่ผู้ถือหุ้นแต่ละรายถือยู่ (Right Offering) ในอัตราส่วนการจัดสรร 1.5 หุ้นสามัญเดิมต่อ 1 หุ้นสามัญเพิ่มทุน โดยมีราคาเสนอขาย หุ้นละ 0.05 บาท พร้อมใบสำคัญแสดงสิทธิ STOWER -W4 ในอัตราส่วน 2.7 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
        และหุ้นสามัญเพิ่มทุนส่วนที่เหลือจาก Right Offering จะจัดสรรให้กับบุคคลในวงจำกัด พร้อมใบสำคัญแสดงสิทธิ STOWER-W4 ในอัตราส่วน 3 หุ้นสามัญเพิ่มทุนต่อ 1 หน่วยใบสำคัญแสดงสิทธิ STOWER-W4
      `;
      setShareDescription(desc);
      setIsReadMore(false)
    }
  }

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
      <Container>
        <ModalAlert show={show} msg={alertMessage} status={status} />
        <FlexContainer>
          <StepDiv>
            <div style={{ display: "block", margin: "0 20px" }}>
              <Step isActive={page === 1} onClick={() => setPage(1)}>
                <b>1</b>
                <Line />
              </Step>
              <StepDetail>ขั้นตอนที่ 1 - ลงทะเบียนจองสิทธิ์</StepDetail>
            </div>
            <div style={{ display: "block", margin: "0 20px" }}>
              <Step isActive={page === 2} onClick={() => setPage(2)}>
                <b>2</b>
                <Line />
              </Step>
              <StepDetail>ขั้นตอนที่ 2 - จัดการคำสั่งซื้อ</StepDetail>
            </div>
            <div style={{ display: "block", margin: "0 20px" }}>
              <Step isActive={page === 3} onClick={() => setPage(3)}>
                <b>3</b>
              </Step>
              <StepDetail>ขั้นตอนที่ 3 - ชำระเงิน</StepDetail>
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
                  <LineCard style={{ width: "100%", paddingBottom: "20px" }}>
                    <Header>
                      <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
                        กรอกข้อมูลจองสิทธิ์
                      </h3>
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
                          <p>เบอร์โทรศัพท์ที่สามารถติดต่อได้ <span>{phoneNo}</span></p>
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
                          setSelected={setDropdownSelect}
                        />
                      </InputDiv>
                      <InputDiv style={{ marginLeft: "50px" }}>
                        <p>เลขที่บัญชีซื้อขาย</p>
                      </InputDiv>
                      <InputDiv style={{ marginLeft: "50px" }}>
                        <FieldInput placeholder={"กรุณากรอกเลขที่บัญชีซื้อขาย"} />
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
                    <LineCard
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        paddingBottom: "30px",
                      }}
                    >
                      <Header>
                        <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
                          จำนวนหุ้นเดิมของท่าน
                        </h3>
                      </Header>
                      <ShareDetail>
                        <p>{rightStockName}</p>
                        <b>{stockVolume}</b>
                        <p>หุ้น</p>
                      </ShareDetail>
                    </LineCard>
                    <LineCard
                      style={{
                        width: "100%",
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
                        {/* <Header>
                            <h3 style={{ color: '#1D3AB1', fontWeight: 'bold' }}>ราคาเสนอขายหุ้นละ</h3>
                          </Header>
                          <Header>
                            <h3>{offerPrice}</h3>
                          </Header>
                          <Header>
                            <h3>บาท</h3>
                          </Header> */}
                      </ShareDetail>
                    </LineCard>
                  </div>
                  <div className="card-tag">
                    <LineCard
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        paddingBottom: "30px",
                      }}
                    >
                      <Header>
                        <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
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
                        <b>{Number(rightStockVolume) * Number(offerPrice)}</b>
                        <p>บาท</p>
                      </ShareDetail>
                      <ShareDetail style={{ fontSize: "14px" }}>
                        <p style={{ width: "100%" }}>
                          (การคำนวนจากราคาเสนอขาย {offerPrice} บาท ต่อ หุ้น)
                        </p>
                      </ShareDetail>
                    </LineCard>
                    <LineCard
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        paddingBottom: "30px",
                      }}
                    >
                      <Header>
                        <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
                          สิทธิเพิ่มเติม
                        </h3>
                      </Header>
                      <ShareDetail>
                        <p>{rightSpecialName}</p>
                        <b>{rightSpecialVolume}</b>
                        <p>หุ้น</p>
                      </ShareDetail>
                    </LineCard>
                  </div>
                  <div className="card-tag">
                    <LineCard
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        paddingBottom: "30px",
                        border: "5px solid #1D3AB1",
                        boxSizing: "border-box",
                        borderRadius: "10px",
                      }}
                    >
                      <Header>
                        <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
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
                        <Input type={"text"} value={currentPrice} disabled />
                        <p>บาท</p>
                      </ShareDetail>
                      <Header>
                        <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
                          สิทธิเพิ่มเติมที่ท่านได้รับ
                        </h3>
                      </Header>
                      <ShareDetail>
                        <p>{rightSpecialName}</p>
                        <b>{rightSpecialVolume}</b>
                        <p>หุ้น</p>
                      </ShareDetail>
                    </LineCard>
                    <div style={{ width: "100%" }}>
                      <LineCard
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                          paddingBottom: "30px",
                          border: "1px solid #1D3AB1",
                          boxSizing: "border-box",
                          borderRadius: "10px",
                        }}
                      >
                        <Header>
                          <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
                            จำนวนหุ้นที่ท่านซื้อเกินสิทธิ์
                          </h3>
                        </Header>
                        <ShareDetail>
                          <p>{rightStockName}</p>
                          <b>{excessVolume}</b>
                          <p>หุ้น</p>
                        </ShareDetail>
                      </LineCard>
                      <LineCard
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                          paddingBottom: "30px",
                          border: "1px solid #1D3AB1",
                          boxSizing: "border-box",
                          borderRadius: "10px",
                        }}
                      >
                        <Header>
                          <h3 style={{ color: "#1D3AB1", fontWeight: "bold" }}>
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
                              style={{ marginTop: "20px", width: "100%" }}
                            >
                              <FieldInput
                                placeholder={"ฝากเงินเข้าบัญชีธนาคาร"}
                                value={depositBank}
                                onChange={(e) => setDepositBank(e.target.value)}
                              />
                            </InputDiv>
                          </div>
                          <div className="input-div">
                            <InputDiv style={{ width: "100%" }}>
                              <p style={{ width: "200px", textAlign: "start" }}>
                                หมายเลขบัญชีธนาคาร
                              </p>
                            </InputDiv>
                            <InputDiv
                              style={{ marginTop: "20px", width: "100%" }}
                            >
                              <FieldInput
                                placeholder={"หมายเลขบัญชีธนาคาร"}
                                value={bank}
                                onChange={(e) => setBank(e.target.value.replace(/[^0-9.]/, ""))}
                              />
                            </InputDiv>
                          </div>
                        </ShareDetail>
                      </LineCard>
                      <LineCard style={{ width: "100%" }}>
                        <Button
                          type="submit"
                          value="ยืนยันคำสั่งซื้อ"
                          onClick={() => handlerOnSubmited()}
                        // onClick={handleSubmited}
                        />
                      </LineCard>
                    </div>
                  </div>
                </>
              );
            }

            if (page === 3) {
              return (
                <>
                  <LineCard style={{ width: "729px", margin: "auto" }}>
                    <ShareDetail>
                      <b style={{ color: persianblue }}>
                        ส่งหลักฐานการชำระเงิน
                      </b>
                      <Button
                        type="submit"
                        value="ดูวิธีการชำระเงิน"
                        style={{
                          width: "20%",
                          fontSize: "17px",
                          color: "#000000",
                          backgroundColor: "#EDB52D",
                          height: "42px",
                        }}
                      />
                    </ShareDetail>
                    <ShareDetail>
                      <p style={{ width: "100%" }}>
                        ท่านสามารถดำเนินการชำระเงินในการซื้อหุ้นเพิ่มทุนของท่านได้ที่
                      </p>
                    </ShareDetail>
                    <ShareDetail style={{ fontSize: "22px" }}>
                      <b style={{ width: "300px" }}>ยอดที่ท่านต้องทำรายการ</b>
                      <b style={{ textAlign: "start" }}>{currentPrice}</b>
                      <b style={{ textAlign: "start" }}>บาท</b>
                    </ShareDetail>
                    <ShareDetail>
                      <div className="payment-image" style={{ width: "100%" }}>
                        <img
                          src={logo}
                          style={{
                            width: "105px",
                            height: "105px",
                            margin: "20px",
                          }}
                        />
                        <div className="payment-detail">
                          <p>{nameTH}</p>
                          <p>REF 1: {ref1}</p>
                          <p>REF 2: {ref2}</p>
                        </div>
                      </div>
                      <img
                        src={qrCode}
                        height={"200px"}
                        width={"200px"}
                        style={{ margin: "auto", textAlign: "start" }}
                      />
                    </ShareDetail>
                    <ShareDetail>
                      <UploadButton>
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
                          onChange={handleSelectedFile}
                        />
                      </UploadButton>
                    </ShareDetail>
                    <ShareDetail style={{ margin: "20px 0" }}>
                      <p style={{ margin: "auto", textAlign: "center" }}>
                        {file ? file.name : ""}
                      </p>
                    </ShareDetail>
                  </LineCard>
                  <LineCard
                    style={{
                      width: "729px",
                      margin: "auto",
                      border: "none",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <ShareDetail style={{ textAlign: "end" }}>
                      <Button
                        type="submit"
                        value="ยืนยันหลักฐาน"
                        onClick={handleSubmit}
                        style={{
                          backgroundColor: shamrock,
                          color: white,
                          width: "100%",
                          fontSize: "17px",
                          padding: "0 20px",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      />
                    </ShareDetail>
                  </LineCard>
                </>
              );
            }
          })()}
        </FlexContainer>
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

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;

    .card-tag {
      display: inline;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    width: 80vw;

    .card-tag {
      display: inline;
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
  color: #000000;
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

export default Buy;
