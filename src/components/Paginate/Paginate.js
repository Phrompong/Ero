import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { persianblue } from "../../utils/color";

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: "active", // default to "disabled"
})`
  margin-bottom: 1rem;
  display: flex;
  width: 100%;
  // min-width: 1200px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: #d9e1e7 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: ${persianblue};
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 100%;
    // min-width: 1200px;
  }

  /* For Mobile */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    width: 100%;
    // min-width: 1200px;
  }
`;
const Paginate = ({ setCurrentPage, totalPages }) => (
  <MyPaginate
    breakLabel="..."
    nextLabel="next >"
    pageRangeDisplayed={4}
    pageCount={totalPages}
    previousLabel="< previous"
    renderOnZeroPageCount={null}
    marginPagesDisplayed={2}
    onPageChange={(e) => setCurrentPage(e.selected + 1)}
  />
);

export default Paginate;
