import { useState } from "react";
import styled from "styled-components";

import { httpFetch } from "../utils/fetch";
import { showAlert } from "../utils/showAlert";

import { SuccessAlert, ErrorAlert } from "../components/UI/Alert";
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
    const endpoint = "uploads";

    const [res, status] = await httpFetch("POST", formData, endpoint);
    setStatus(status);
    let msg = res.message;
    if (status === 200) {
      msg = "Upload Completed";
    }
    setAlertMessage(msg);
    showAlert(setShow, 2000);
    setFile();
  };

  return (
    <Card>
      <Container>
        <ModalAlert show={show} msg={alertMessage} status={status} />
        <input type="file" onChange={handleSelectedFile} />
        <Button onClick={handleSubmit}>Import Data</Button>
      </Container>
    </Card>
  );
};

export default ImportData;
