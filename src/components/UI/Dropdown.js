import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

import { persianblue } from "../../utils/color";

const Container = styled.div`
  position: relative;
  border: 2px solid #d9e1e7;
  border-radius: 10px;
  background: #fff;
  color: #06152b;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* height: 40px; */
`;

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 10px 32px 10px 20px;
  font-size: 16px;
  text-transform: capitalize;
  text-align: left;
  :focus {
    outline: none;
  }

  @media screen and (max-width: 540px) {
    font-size: 14px;
  }

  @media screen and (min-width: 541px) and (max-width: 880px) {
    font-size: 14px;
  }
`;

const Option = styled.option`
  text-transform: capitalize;
  bottom: 30%;
  padding: 10px 32px 10px 20px;
`;

const Arrow = styled.i`
  position: absolute;
  right: 10%;
  top: 38%;
  border: solid darkgray;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  z-index: 10;
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  margin: 0;
  padding-left: 15px;
  padding-right: 15px;
  background-color: transparent;
  height: 100%;
  font-size: 16px;
  padding: 8px 15px 8px 15px;
  border-radius: 10px;
`;

const OptionSelect = styled.a`
  color: black;
  padding: 12px 16px;
  // text-decoration: none;
  display: block;
  z-index: 999;
`;

const WrapperOption = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  // display: none;
  max-height: 150px;
  overflow: auto;
  width: 100%;
  position: absolute;
  background: #ffffff;
  z-index: 999;
  border: 2px solid #d9e1e7;
  & ${OptionSelect}:hover {
    background: ${(props) => (props.isEmtry ? "#FFFFFF" : "#f9f9f9")};
    color: "#FFFFFF";
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .input-select {
    width: 100%;
    display: flex;
  }
`;

const OpenArrow = styled.i`
  position: absolute;

  width: 0;
  height: 0;
  right: 0;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid ${persianblue};
`;

const CloseArrow = styled.i`
  position: absolute;

  width: 0;
  height: 0;
  right: 0;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid ${persianblue};
`;

export const Dropdown = ({ options, setSelected, selected, style }) => (
  <Container style={style}>
    <Select onChange={(e) => setSelected(e.target.value)} value={selected}>
      {options &&
        options.map((option, index) => (
          <Option key={index} value={option["value"]}>
            {option["label"]}
          </Option>
        ))}
    </Select>
    <Arrow />
  </Container>
);

export const DropdownArrow = ({
  options,
  setSelected,
  selected,
  isOpen,
  onClick,
  onBlur,
  display,
  otherOption = false,
}) => {
  return (
    <Container
      onClick={onClick}
      onBlurCapture={onBlur}
      style={{ width: "100%" }}
    >
      <Wrapper style={{ width: "100%" }}>
        <div className="input-select">
          <Input
            type={"text"}
            placeholder={"กรุณาเลือก"}
            value={selected ? selected[display] : ""}
            style={{ width: "100%" }}
            // disabled={!searchable}
          />
          {isOpen ? <OpenArrow /> : <CloseArrow />}
        </div>
        {options.length === 0 ? (
          <>
            <WrapperOption
              isOpen={isOpen}
              isEmtry={true}
              style={{ width: "100%" }}
            >
              <OptionSelect>ไม่มีข้อมูล</OptionSelect>
            </WrapperOption>
          </>
        ) : (
          <>
            <WrapperOption isOpen={isOpen} style={{ width: "100%" }}>
              {options &&
                options.map((option, index) => (
                  <OptionSelect
                    key={index}
                    onMouseDown={() => setSelected(option)}
                    style={{ width: "100%" }}
                  >
                    {option[display]}
                  </OptionSelect>
                ))}
              {otherOption && (
                <OptionSelect
                  onMouseDown={() => setSelected({ nameTH: "อื่นๆ" })}
                  style={{ width: "100%" }}
                >
                  อื่นๆ
                </OptionSelect>
              )}
            </WrapperOption>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export const DropdownSelect = ({
  options,
  setSelected,
  selected,
  searchFrom,
  isOpen,
  onClick,
  onBlur,
}) => {
  const [filter, setFilter] = useState(null);
  const [optionsFiltered, setOptionsFiltered] = useState([]);
  const [optionSelect, setOptionSelect] = useState(selected);
  useEffect(() => {
    setOptionsFiltered(options);
  }, [options]);

  useEffect(() => {
    if (optionSelect) {
      setFilter(optionSelect.fullname);
      setSelected(optionSelect);
    }
  }, [optionSelect]);

  useEffect(() => {
    if (filter) {
      setOptionsFiltered(
        options.filter((option) => option[searchFrom].includes(filter))
      );
    } else {
      setOptionsFiltered(options);
    }
  }, [filter]);
  return (
    <Container onClick={onClick} onBlurCapture={onBlur}>
      <Wrapper>
        {searchFrom && (
          <div className="input-select">
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={"กรุณาเลือก"}
            />
            {isOpen ? <OpenArrow /> : <CloseArrow />}
          </div>
        )}
        {options.length === 0 || optionsFiltered.length === 0 ? (
          <>
            <WrapperOption isOpen={isOpen} isEmtry={true}>
              <OptionSelect>ไม่มีข้อมูล</OptionSelect>
            </WrapperOption>
          </>
        ) : (
          <>
            <WrapperOption isOpen={isOpen}>
              {optionsFiltered &&
                optionsFiltered.map((option, index) => (
                  <OptionSelect
                    onMouseDown={() => setOptionSelect(option)}
                    key={index}
                    value={option.code}
                  >
                    {option.code} {option.name}
                  </OptionSelect>
                ))}
            </WrapperOption>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export const DropdownSelectMasterBank = ({
  options,
  setSelected,
  selected,
  searchFrom,
  isOpen,
  onClick,
  onBlur,
}) => {
  const [filter, setFilter] = useState(null);
  const [optionsFiltered, setOptionsFiltered] = useState([]);
  const [optionSelect, setOptionSelect] = useState(selected);
  useEffect(() => {
    setOptionsFiltered(options);
  }, [options]);

  useEffect(() => {
    if (optionSelect) {
      setFilter(optionSelect.nameTH);
      setSelected(optionSelect);
    }
  }, [optionSelect]);

  useEffect(() => {
    if (filter) {
      setOptionsFiltered(
        options.filter((option) => option[searchFrom].includes(filter))
      );
    }
    if (filter === "") {
      setOptionsFiltered(options);
    }
  }, [filter]);
  return (
    <Container
      onClick={onClick}
      onBlurCapture={onBlur}
      style={{ width: "100%", textAlign: "left" }}
    >
      <Wrapper style={{ width: "100%", textAlign: "left" }}>
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={"กรุณาเลือก"}
          style={{ width: "100%", textAlign: "left" }}
        />
        {options.length === 0 ? (
          <>
            <WrapperOption isOpen={isOpen} isEmtry={true}>
              <OptionSelect>ไม่มีข้อมูล</OptionSelect>
            </WrapperOption>
          </>
        ) : (
          <>
            <WrapperOption
              isOpen={isOpen}
              style={{ width: "100%", textAlign: "center" }}
            >
              {optionsFiltered &&
                optionsFiltered.map((option, index) => (
                  <OptionSelect
                    onMouseDown={() => setOptionSelect(option)}
                    key={index}
                    value={option._id}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {option.nameTH}
                  </OptionSelect>
                ))}
            </WrapperOption>
          </>
        )}
      </Wrapper>
    </Container>
  );
};
