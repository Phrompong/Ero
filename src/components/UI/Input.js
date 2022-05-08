import React from "react";
import styled from "styled-components";
import { Label } from "./Label";

import { white, snow } from "../../utils/color";

export const Input = React.forwardRef((props, ref) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <StyledInput
          //   onChange={props.changed}
          ref={ref}
          {...props.elementConfig}
          autoComplete="new-password"
        />
      );
      break;
    case "field":
      inputElement = (
        <StyledField onChange={props.changed} {...props.elementConfig} />
      );
      break;
    default:
      inputElement = (
        <input ref={ref} value={props.value} {...props.elementConfig} />
      );
  }
  return (
    <Container width={props.width}>
      {inputElement}
      <Label top={props.top} color={props.labelColor}>
        {props.label}
      </Label>
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  width: 100%;
  /* width: ${({ width }) => (width ? width : "fit-content")}; */
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 18px;
  width: 100%;
  height: 50px;
  box-shadow: 0px 4px rgba(0, 0, 0, 0.25);
  background: ${white};
  border: 2px solid ${snow};
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  :-webkit-autofill,
  -webkit-autofill:hover,
  -webkit-autofill:focus {
    box-shadow: 0 0 0px;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  :focus {
    outline: none;
  }
`;

const StyledField = styled.input`
  border: 1px solid #bed3c3;
  border-radius: 5px;
  padding: 7px;
  /* background-color: rgba(191, 212, 196, 0.35); */
  /* border: none; */
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #bed3c3;
    opacity: 1;
  }

  :disabled {
    /* background: rgba(73, 144, 156, 0.2); */
    background: rgba(191, 212, 196, 0.4);
    color: #212e53;
    border: none;
    font-style: italic;
  }

  :focus {
    outline: none;
  }
`;

export const InputSearch = styled.input`
  border: 2px solid #d9e1e7;
  border-radius: 10px;
  background: #fff;
  position: relative;
  font-size: 16px;
  padding: 12px;

  :focus {
    outline: none;
  }
`;
