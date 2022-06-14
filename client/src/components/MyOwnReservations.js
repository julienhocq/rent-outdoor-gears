import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { OwnerContext } from "./context/Context";
import moment from "moment";
import { Link } from "react-router-dom";


const MyOwnReservations = ({ ownerProfile, reservations }) => {
  const { owner: user } = useContext(OwnerContext);
  let userId = user[1];
  const [isPending, setIsPending] = useState(true);
  const [item, setItem] = useState([]);
  const { itemId } = useParams();

  // let dateStart = new Date(getNewBooking.date[0]);
  // let dateEnd = new Date(getNewBooking.date[1]);

  // console.log('reservations', reservations);

  // console.log('user Id IS', userId);
  // console.log('ownerProfile', ownerProfile);

  // fetching product info by itemId
  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       await fetch(`/api/item/${itemId}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           //   console.log('data',data.data);
  //           setItem(data.data);
  //           setIsPending(false);
  //         })
  //         .catch((err) => {
  //           setIsPending(false);
  //         });
  //     };
  //     fetchProduct();
  //   }, [itemId]);

  // console.log('item IS', item);

  console.log("reservation", reservations);

  return (
    <>
    
    {userId !== ownerProfile._id && !reservations &&
    ( <><OwnerReservations>Items you booked</OwnerReservations><p>No reservation yet</p></>)}

    {userId === ownerProfile._id && ( 
        <><OwnerReservations>Items you booked</OwnerReservations></>
    )}

      <AllReservations>
        {userId === ownerProfile._id &&
          reservations?.map((reservation) => (
              
            <ReservationWrapper>
              <>
                <h4>Reservation n°: {reservations.indexOf(reservation) + 1}</h4>
                <>
                  {reservation.date.length === 1 ? (
                    <><p>
                                  {moment.utc(reservation.date[0]).format("dddd Do YYYY")}{" "}
                              </p><>
                                      <Link to={`/item/${reservation.itemId}`}>
                                          <button>Item you booked</button>
                                      </Link>
                                  </></>
                  ) : (
                    <>
                      <p>
                        From:
                        <span>
                          {" "}
                          {moment
                            .utc(reservation.date[0])
                            .format("dddd Do YYYY")}
                        </span>{" "}
                      </p>
                      <p>
                        To:
                        <span>
                          {" "}
                          {moment
                            .utc(reservation.date[1])
                            .format("dddd Do YYYY")}
                        </span>{" "}
                      </p>
                      <Link to={`/item/${reservation.itemId}`} >
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
border: 1px solid black ;
margin: 20px;
padding: 30px;

h4{
    padding-bottom: 20px;
}

p {
    text-align: left;
    padding: 5px;
}

/* p:nth-child(2) { 
    text-align: left;
} */

button {
    background-color: blue;
    border: none;
    color: white;
    padding: 10px;
    margin-top: 20px;
    cursor: pointer;
}

`;



export default MyOwnReservations;
