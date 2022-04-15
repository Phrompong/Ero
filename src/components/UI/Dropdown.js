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
  height: 40px;
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
  text-align: center;
  :focus {
    outline: none;
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
  /* margin-right: 10px; */
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`;

export const Dropdown = ({}) => {
  const years = ["2023", "2024", "2025", 2026];
  const options = () => years.map((year) => <Option key={year}>{year}</Option>);
  return (
    <Container>
      <Select>
        <Option>This year</Option>
        {options()}
      </Select>
      <Arrow />
    </Container>
  );
};
