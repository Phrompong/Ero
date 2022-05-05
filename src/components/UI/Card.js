import styled from "styled-components";

import { white } from "../../utils/color";

export const StyledCard = styled.div`
  /* padding: 1rem; */
  /* width: 100%; */
  width: fit-content;
  margin: 1rem;
  border-radius: 15px;
  background: ${white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: ${props => props.isScroll ? 'scroll' : 'visible'};
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;

  /* For Mobile */
  @media screen and (max-width: 540px) {
    margin: 1rem 0;
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 880px) {
    margin: 0;
  }
`;

export const StyledLineCard = styled.div`
  border-radius: 10px;
  border: 1px solid #d9e1e7;
  margin: 0 10px;

  .modal-flex {
    display: flex;
    width: 100%;
    margin: 10px 0;
    align-items: baseline;
    justify-content: space-between;

    .modal-flex-pre {
      text-align: end;
    }

    .modal-flex-label {
      width: 100%;
    }

    .modal-flex-label-info {
      width: 100%;
      text-align: end;
    }
  }

  .modal-block {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .modal-block-label {
      margin-bottom: 0.5rem;
    }
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    margin: 0;

    .modal-flex {
      display: flex;
      width: 100%;
      margin: 10px 0;
      align-items: baseline;
      justify-content: space-between;

      .modal-flex-pre {
        text-align: end;
      }
    }

    .modal-block {
      display: block;
      width: 100%;

      .modal-block-label {
        margin-bottom: 0.5rem;
      }
    }
  }

  /* For Tablets */
  @media screen and (min-width: 540px) and (max-width: 1024px) {
    margin: 0;

    .modal-flex {
      display: flex;
      width: 100%;
      margin: 10px 0;
      align-items: baseline;
      justify-content: space-between;

      .modal-flex-pre {
        text-align: end;
      }
    }

    .modal-block {
      display: block;
      width: 100%;

      .modal-block-label {
        margin-bottom: 0.5rem;
      }
    }
  }
`;

export const Card = ({ children, isScroll, style }) => <StyledCard isScroll={isScroll} style={style}>{children}</StyledCard>;

export const LineCard = ({ children, style }) => (
  <StyledLineCard style={style}>{children}</StyledLineCard>
);
