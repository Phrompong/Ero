import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0px;

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
      justify-content: space-between;

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

      .content-detail-share {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    flex-direction: column;

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

        .content-detail-share {
          display: block;
          
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
  @media screen and (min-width: 540px) and (max-width: 1024px) {
    /* flex-direction: column;  */

    // > div {
    //   margin-left: 0;
    //   margin-bottom: 20px;
    // }

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
  
        .content-detail-text {
          display: block;
          
          .detail-text-label {
            margin-top: 0.5rem;
            margin-left: 0rem;
            color: #000000;
          }
  
          .bank-title {
            margin-right: 1rem;
          }
  
          .bank-logo-img {
            margin-left: 0rem;
            display: flex;
          }
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
