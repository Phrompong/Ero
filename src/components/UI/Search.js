import styled from "styled-components";

import { Search } from "@styled-icons/bootstrap/Search";

const Container = styled.div`
  border: 2px solid #d9e1e7;
  border-radius: 10px;
  background: #fff;
  position: relative;
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    margin: 0;
    padding-left: 10px;
    background-color: transparent;
    height: 100%;
    font-size: 16px;

    :focus {
      outline: none;
    }
  }
`;

const SearchIcon = styled(Search)`
  width: 17px;
  margin-right: 10px;
  vertical-align: text-top;
  color: darkgray;
`;
export const SearchableInput = () => (
  <Container>
    <input placeholder="search..." />
    <SearchIcon />
  </Container>
);
