import styled from "styled-components";

import { white } from "../../utils/color";

export const StyledCard = styled.div`
  /* padding: 1rem; */
  /* width: 100%; */
  width: fit-content;
  margin: auto;
  margin: 1rem auto 1rem auto;
  border-radius: 15px;
  background: ${white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: ${props => props.isScroll ? 'scroll' : 'visible'};
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
  overflow-x: auto;
  overflow-y: auto;

  .card-term-condition {
    padding-left: 0;
    width: 100%;
    padding: 0 2rem;
    margin-bottom: 0;

    .pre-term-condition {
      padding: 0 2rem;
      white-space: break-spaces;
      margin-bottom: 0;
    }

    .div-term-condition {
      height: 210px;
      overflow: scroll;
      overflow-x: auto;
      overflow-y: auto;
    }
  }
  .btn-div {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  .accept-term-condition {
    // display: flex;
    // justify-content: space-betwenn;
    overflow: scroll;
    overflow-x: auto;
    overflow-y: auto;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    margin: auto;
    overflow: scroll;
    overflow-x: auto;
    overflow-y: auto;    
    
    .btn-div {
      display: grid;
      text-align: center;
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    margin: auto;
    overflow: scroll;
    overflow-x: auto;
    overflow-y: auto;

    .btn-div {
      display: grid;
      text-align: center;
    }
  }
`;

export const StyledLineCard = styled.div`
  border-radius: 10px;
  border: 1px solid #d9e1e7;
  width: 100%;
  // margin: 0 10px;

  .table-detail {
    overflow: scroll;
    overflow-x: auto;
    overflow-y: auto;
    // height: 100%;
  }

  .modal-flex {
    display: flex;
    width: 100%;
    margin: 10px 0;
    align-items: baseline;
    justify-content: space-between;

    .modal-flex-pre {
      text-align: start;
    }

    .modal-flex-label {
      width: 100%;
    }

    .modal-flex-label-info {
      width: 100%;
      text-align: start;
    }
  }

  .modal-block {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .modal-block-label {
      width: 50%;
      margin-top: auto;
      margin-bottom: auto;
    }
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    margin: 0;
    overflow: scroll;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    ::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
    
    .modal-flex {
      display: flex;
      width: 100%;
      margin: 10px 0;
      align-items: baseline;
      justify-content: space-between;

      .modal-flex-pre {
        text-align: start;
      }
    }

    .modal-block {
      display: block;
      width: 100%;

      .modal-block-label {
        width: 100%;
        margin-top: 0.5rem;
        margin-bottom: auto;
      }
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880ยป) {
    margin: 0;

    .modal-flex {
      display: flex;
      width: 100%;
      margin: 10px 0;
      align-items: baseline;
      justify-content: space-between;

      .modal-flex-pre {
        text-align: start;
      }
    }

    .modal-block {
      display: block;
      width: 100%;

      .modal-block-label {
        width: 100%;
        margin-bottom: 0.5rem;
      }
    }
  }
`;

export const StyledLineCardBank = styled.div`
  border-radius: 10px;
  border: 1px solid #d9e1e7;
  margin: 0.5rem;
  width: 100%;
  flex-basis: 46%;
  display: flex;
  padding: 5px;

  /* For Mobile */
  @media screen and (max-width: 540px) {
    margin: 0;
    flex-basis: 100%;
    display: flex;
    margin-top: 1rem;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 1024px) {
    margin: 0.5rem;
  }
`;

export const Card = ({ children, isScroll, style }) => <StyledCard isScroll={isScroll} style={style}>{children}</StyledCard>;

export const LineCard = ({ children, style }) => (
  <StyledLineCard style={style}>{children}</StyledLineCard>
);

export const LineCardBank = ({ children, style }) => (
  <StyledLineCardBank style={style}>{children}</StyledLineCardBank>
);
