import { useState } from "react";
import styled from "styled-components";

import { httpPostRequest, httpPostRequestUploadFile } from "../utils/fetch";
import { showAlert } from "../utils/showAlert";

import { Card } from "../components/UI/Card";
import { Button } from "../components/UI/Button";
import { ModalAlert } from "../components/ModalAlert/ModalAlert";

const Container = styled.div`
  padding: 10px;
  height: 80vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;

    .input-btn {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    width: 90vw;
  }
`;

const ImportData = () => {
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const handleSelectedFile = (e) => {
    const allowTypeFile = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const [file] = e.target.files;
    const { name: fileName, size, type } = file;
    if (!allowTypeFile.includes(type)) {
      setStatus(999);
      setAlertMessage("ประเภทไฟล์ไม่ถูกต้อง");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);

      setTimeout(() => {
        window.location.reload(false);
      }, 2000);

      return;
    }
    setFile(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("File", file);
    console.log(file);
    console.log(formData);
    const endpoint = "uploads";

    const [res, status] = await httpPostRequestUploadFile(formData, endpoint);
    setStatus(status);
    let msg = res.message;
    if (status === 200) {
      msg = "Upload Completed";
    }
    setAlertMessage("Data cannot be uploaded");
    showAlert(setShow, 2000);
    setFile();

    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  };

  return (
    <Card>
      <Container>
        <ModalAlert show={show} msg={alertMessage} status={status} />
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleSelectedFile}
        />
        <Button onClick={handleSubmit}>Import Data</Button>
      </Container>
    </Card>
  );
};

export default ImportData;
