import { useContext } from "react";
import styled from "styled-components";
import { OwnerContext } from "./context/Context";
import moment from "moment";
import { Link } from "react-router-dom";

const MyOwnReservations = ({ ownerProfile, reservations }) => {
  const { owner: user } = useContext(OwnerContext);

  let userId = user[1];


  // Rules to only provide user's reservations to him.
 
  return (
    <>
      {userId !== ownerProfile._id && !reservations && (
        <>
          <OwnerReservations>Items you booked</OwnerReservations>
          <p>No reservation yet</p>
        </>
      )}

      {userId === ownerProfile._id && (
        <>
          <OwnerReservations>Items you booked</OwnerReservations>
        </>
      )}

      <AllReservations>
        {userId === ownerProfile._id &&
          reservations?.map((reservation) => (
            <ReservationWrapper>
              <>
                <h4>Reservation n°: {reservations.indexOf(reservation) + 1}</h4>
                <>
                  {reservation.date.length === 1 ? (
                    <>
                      <p>
                        {moment
                          .utc(reservation.date[0])
                          .format("dddd Do MMM YYYY")}{" "}
                      </p>
                      <>
                        <Link to={`/item/${reservation.itemId}`}>
                          <button>Item you booked</button>
                        </Link>
                      </>
                    </>
                  ) : (
                    <>
                      <p>
                        From:
                        <span>
                          {" "}
                          {moment
                            .utc(reservation.date[0])
                            .format("dddd Do MMM YYYY")}
                        </span>{" "}
                      </p>
                      <p>
                        To:
                        <span>
                          {" "}
                          {moment
                            .utc(reservation.date[1])
                            .format("dddd Do MMM YYYY")}
                        </span>{" "}
                      </p>
                      <Link to={`/item/${reservation.itemId}`}>
                        <button>Item you booked</button>
                      </Link>
                    </>
                  )}
                </>
              </>
            </ReservationWrapper>
          ))}
      </AllReservations>
    </>
  );
};

const OwnerReservations = styled.h2`
  padding-left: 40px;
  padding-top: 20px;
`;

const AllReservations = styled.div`
  /* border: 1px solid black ; */
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 40px 20px;
`;

const ReservationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
  margin: 20px;
  padding: 30px;

  h4 {
    padding-bottom: 20px;
  }

  p {
    text-align: left;
    padding: 5px;
  }

  button {
    background-color: var(--color-primary);
    border: none;
    color: white;
    padding: 10px;
    margin-top: 20px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--color-tertiary);
    color: white;
  }
`;

export default MyOwnReservations;
