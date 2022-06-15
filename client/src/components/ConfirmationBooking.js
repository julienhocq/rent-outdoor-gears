import styled from "styled-components";
import moment from "moment";
// import ErrorMessage from "./Error";

const ConfirmationBooking = () => {
  const getNewBooking = JSON.parse(sessionStorage.getItem("NewBooking"));

  const dateReservation = getNewBooking.date;
  let dateStart = new Date(getNewBooking.date[0]);
  let dateEnd = new Date(getNewBooking.date[1]);

    // Confirmation item booking page
    // use the session storage to retrieve item's reservation data.


  return (
    <>
      {/* {error && <ErrorMessage />} */}

      {getNewBooking && (
        <WrapperReservation>
          <h2>You have reserved this item!</h2>
          <p>Booked date:</p>

          {dateReservation.length === 1 ? (
            <p>{moment.utc(dateStart).format("dddd Do MMM YYYY")} </p>
          ) : (
            <>
              <p>
                From:
                <span>
                  {" "}
                  {moment.utc(dateStart).format("dddd Do MMM YYYY")}
                </span>{" "}
              </p>
              <p>
                To:
                <span> {moment.utc(dateEnd).format("dddd Do MMM YYYY")}</span>{" "}
              </p>
            </>
          )}
          <ItemId>
            Reservation n°: <span>{getNewBooking._id}</span>{" "}
          </ItemId>
        </WrapperReservation>
      )}
    </>
  );
};

const WrapperReservation = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid var(--color-primary);
  border-radius: 4px;
  padding: 30px;
  position: absolute;
  left: 30%;
  top: 40%;

  h2 {
    text-align: center;
    padding-bottom: 20px;
  }

  p {
    padding: 5px;
  }

  span {
    font-weight: 700;
  }
`;

const ItemId = styled.div`
  padding-top: 20px;

  span {
    font-style: italic;
    font-weight: normal;
  }
`;

export default ConfirmationBooking;
