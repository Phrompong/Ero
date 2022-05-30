import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0px;

  .overview {
    width: 100%;
    display: flex;
    justify-content: start;

    .overview-content {
      margin: 0.5rem 0.5rem 0rem 0.5rem;
    }
  }

  .card-div {
    display: flex;
    width: 100%;
  }

  .msg-header {
    display: block;
    margin-left: 2rem;
  }

  .content-member {
    margin-top: 1rem;
    margin-left: 2rem;

    .content-detail-member {
      display: flex;
      justify-content: start;

      .right {
        margin-left: 2rem;
      }

      .checkbox {
        width: 25%;
      }
      
      .content-detail-text {
        display: flex;
        justify-content: space-between;
        
        .detail-text-label {
          margin-top: 0.5rem;
          margin-left: 1rem;
          color: #000000;
        }

        .bank-title {
          margin-right: 1rem;
        }

        .bank-logo-img {
          margin-left: 1rem;
          display: contents;
        }
      }

      .share {
        > :nth-child(1) {
          width: 500px;
        }

        > :nth-child(2) {
          margin: 0;
          width: 150px;
        }

        > :nth-child(3) {
          margin: 0;
          width: 150px;
        }

        > :nth-child(4) {
          margin: 0;
          width: 150px;
        }
      }

      .content-detail-share {
        margin: 1rem 0;
        display: flex;
        justify-content: start;

        .right {
          margin-left: 2rem;
        }
      }
    }
  }

  .info-label {
    width: 100%;
    max-width: 300px;
  }

  .info-detail {
    width: 100%;
  }

  .step-div {
    margin: auto;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    flex-direction: column;

    .overview {
      display: block;
      width: 100%;

      // .overview-content {
      //   width: 100%;
      //   margin: 0.5rem 0.5rem 0rem 0.5rem;
      // }
    }

    > div {
      margin-left: 0;
      margin-bottom: 20px;
    }

    .card-div {
      display: block;
      width: 100%;
    }

    .msg-header {
      display: block;
      margin-left: 2rem;
    }

    .content-member {
      margin-top: 1rem;
      margin-left: 2rem;
  
      .content-detail-member {
        display: block;

        .content-detail-share {
          display: block;
        }

        .right {
          margin-left: 0;
        }

        .checkbox {
          width: 100%;
        }
        
        .content-detail-text {
          display: block;

          .detail-text-label {
            margin-top: 0.5rem;
            margin-left: 0rem;
            color: #000000;
          }
          
          .bank-title {
            margin-right: 0rem;
          }
  
          .bank-logo-img {
            margin-left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
          }
        }

        .share {
          width: 100%;
          display: flex;
        }

        .content-detail-share {
          display: block;
          .right {
            margin-left: 0;
          }
          .text-title {
            display: flex;
            width: 100%;
            margin-top: 1rem;
          }

          .text-amount {
            display: flex;
            width: 100%;
            margin-top: 1rem;
          }
        }
      }
    }
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    .overview {
      display: block;
      width: 100%;

      // .overview-content {
      //   width: 100%;
      //   margin: 0.5rem 0.5rem 0rem 0.5rem;
      // }
    }

    .card-div {
      display: block;
      width: 100%;
    }

    .msg-header {
      display: block;
      margin-left: 2rem;
    }

    .content-member {
      margin-top: 1rem;
      margin-left: 2rem;

      .content-detail-member {
        display: flex;
        justify-content: space-between;

        .right {
          margin-left: 0;
        }

        .checkbox {
          width: 50%;
        }
  
        .content-detail-text {
          display: block;
          
          .detail-text-label {
            margin-top: 0.5rem;
            margin-left: 0rem;
            color: #000000;
          }
  
          .bank-title {
            margin: 0;
          }
  
          .bank-logo-img {
            margin-left: 0rem;
            display: flex;
          }
        }

        .share {
          width: 100%;
          display: flex;
        }
  
        .content-detail-share {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
`;
export const FlexContainer = ({ children, style }) => (
  <Container style={style}>{children}</Container>
);
