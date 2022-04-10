import { useState } from "react";
import styled from "styled-components";

import { httpFetch } from "../utils/fetch";

import { Card } from "../components/UI/Card";
import { Button } from "../components/UI/Button";

const Container = styled.div`
  padding: 10px;
  height: 80vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const InputFile = styled.div`
//   .file {
//     opacity: 0;
//     width: 0.1px;
//     height: 0.1px;
//     position: absolute;
//   }

//   .file-name {
//     position: absolute;
//     bottom: -35px;
//     left: 10px;
//     font-size: 0.85rem;
//     color: #555;
//   }

//   label {
//     display: block;
//     position: relative;
//     width: 200px;
//     height: 50px;
//     border-radius: 10px;
//     background: linear-gradient(40deg, #809fb8, #1d3ab1);
//     box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #fff;
//     font-weight: bold;
//     cursor: pointer;
//     transition: transform 0.2s ease-out;
//   }
// `;

const ImportData = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();

  const handleSelectedFile = (e) => {
    const [file] = e.target.files;
    const { name: fileName, size } = file;
    setFile(file);
    setFileName(`${fileName}`);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("File", file);
    const url = "http://134.209.108.248:3000/api/v1/uploads";

    fetch("http://134.209.108.248:3000/api/v1/uploads", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Card>
      <Container>
        {/* <InputFile>
          <input
            id="file"
            type="file"
            className="file"
            onChange={handleSelectedFile}
          />
          <label htmlFor="file">
            Chose file...
            <p className="file-name">{fileName}</p>
          </label>
        </InputFile> */}
        <input type="file" onChange={handleSelectedFile} />
        <Button onClick={handleSubmit}>Import Data</Button>
      </Container>
    </Card>
  );
};

export default ImportData;
