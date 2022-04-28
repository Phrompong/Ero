import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

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

  @media screen and (min-width: 540px) and (max-width: 880px) {
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
`

const OptionSelect = styled.a`
  color: black;
  padding: 12px 16px;
  // text-decoration: none;
  display: block;
  z-index: 999;
`

const WrapperOption = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  // display: none;
  max-height: 150px;
  overflow: auto;
  width: 100%;
  position: absolute;
  background: #ffffff;
  z-index: 998;
  border: 2px solid #d9e1e7;
  & ${OptionSelect}:hover {
    background: ${(props) => (props.isEmtry ? "#FFFFFF" : "#90A0DA")};
    color: "#FFFFFF";
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  $ :focus {
    background: black;
  }
  // & ${Input}:focus-within + ${WrapperOption} {
  //   display: block;
  // }
`

export const Dropdown = ({ options, setSelected, selected }) => (
  <Container>
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

export const DropdownSelect = ({ options, setSelected, selected, searchFrom, isOpen, onClick, onBlur }) => {
  const [filter, setFilter] = useState(null)
  const [optionsFiltered, setOptionsFiltered] = useState([])
  const [optionSelect, setOptionSelect] = useState(selected)
  useEffect(() => {
    setOptionsFiltered(options)
  }, [options])

  useEffect(() => {
    if (optionSelect) {
      setFilter(optionSelect.fullname)
      setSelected(optionSelect)
    }
  }, [optionSelect])

  useEffect(() => {
    if (filter) {
      setOptionsFiltered(options.filter((option) => option[searchFrom].includes(filter)))
    }
    if (filter === '') {
      setOptionsFiltered(options)
    }
  }, [filter])
  return (
    <Container onClick={onClick} onBlurCapture={onBlur}>
      <Wrapper>
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={'กรุณาเลือก'} />
        {
          options.length === 0 ? <>
            <WrapperOption isOpen={isOpen} isEmtry={true}>
              <OptionSelect>ไม่มีข้อมูล</OptionSelect>
            </WrapperOption>
          </> : <>
            <WrapperOption isOpen={isOpen}>
              {
                optionsFiltered && optionsFiltered.map((option, index) => (
                  <OptionSelect onMouseDown={() => setOptionSelect(option)} key={index} value={option.code}>{option.code} {option.name}</OptionSelect>
                ))
              }
            </WrapperOption>
          </>
        }
      </Wrapper>
    </Container >
  );
};
