import styled from "styled-components";

import { Search } from "@styled-icons/bootstrap/Search";

const Container = styled.div`
  border: 2px solid #d9e1e7;
  border-radius: 10px;
  background: #fff;
  position: relative;
  height: 40px;
  /* min-height: fit-content; */

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    margin: 0;
    padding-left: 15px;
    background-color: transparent;
    height: 100%;
    font-size: 16px;

    :focus {
      outline: none;
    }
  }

  @media screen and (max-width: 540px) {
    input {
      width: 150px;
    }
  }

  /* @media screen and (min-width: 540px) and (max-width: 880px) {
    input {
      width: 200px;
    }
  } */
`;

const SearchIcon = styled(Search)`
  width: 17px;
  margin-right: 10px;
  vertical-align: text-top;
  color: darkgray;
`;

export const SearchableInput = () => (
  <Container>
    <input placeholder="Search..." />
    <SearchIcon />
  </Container>
);

export const FieldInput = ({ placeholder }) => (
  <Container style={{ width: '100%', textAlign: 'center' }}>
    <input placeholder={placeholder || 'input...'} />
  </Container>
);
