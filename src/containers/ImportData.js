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
    display: block;
    text-align: center;

    .input-btn {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 1024px) {
  }
`;

const ImportData = () => {
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const handleSelectedFile = (e) => {
    const [file] = e.target.files;
    const { name: fileName, size } = file;
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
    setAlertMessage(msg);
    showAlert(setShow, 2000);
    setFile();

    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  return (
    <Card>
      <Container>
        <ModalAlert show={show} msg={alertMessage} status={status} />
        <input className="input-btn" type="file" onChange={handleSelectedFile} />
        <Button onClick={handleSubmit}>Import Data</Button>
      </Container>
    </Card>
  );
};

export default ImportData;
