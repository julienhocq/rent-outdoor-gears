import styled from "styled-components";
import moment from "moment";

const ConfirmationBooking = () => {
  const getNewBooking = JSON.parse(sessionStorage.getItem("NewBooking"));

  const dateReservation = getNewBooking.date;

  let dateStart = new Date(getNewBooking.date[0]);
  let dateEnd = new Date(getNewBooking.date[1]);

  return (
    <>
      <p>Your item has been reserved!</p>
      <p>Date(s):</p>

      {dateReservation.length === 1 ? (
        <p>{moment.utc(dateStart).format("dddd Do YYYY")} </p>
      ) : (
        <>
          <p>Start: {moment.utc(dateStart).format("dddd Do YYYY")} </p>
          <p>End: {moment.utc(dateEnd).format("dddd Do YYYY")} </p>
        </>
      )}

      <div></div>
    </>
  );
};

export default ConfirmationBooking;
