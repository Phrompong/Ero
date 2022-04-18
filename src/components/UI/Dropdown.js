import React from "react";
import styled from "styled-components";

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
`;

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

export const DropdownSelect = ({ options }) => {
  const _options = options.map((option, index) => {
    return (
      <Option key={index} value={option.code}>
        {option.code} {option.name}
      </Option>
    );
  });
  return (
    <Container>
      <Select style={{ padding: "0 32px 0  20px" }}>{_options}</Select>
      <Arrow />
    </Container>
  );
};
