import { SuccessAlert, ErrorAlert } from "../UI/Alert";
export const ModalAlert = ({ status, msg, show }) => {
  return (
    <>
      {status === 200 ? (
        <SuccessAlert show={show}>
          <div>
            <h4>Success!</h4> <p>{msg}</p>
          </div>
        </SuccessAlert>
      ) : (
        <ErrorAlert show={show}>
          <div>
            <h4>Error!</h4> <p>{msg}</p>
          </div>
        </ErrorAlert>
      )}
    </>
  );
};
