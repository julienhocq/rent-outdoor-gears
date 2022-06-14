import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { OwnerContext } from "./context/Context";
import moment from "moment";




const MyOwnReservations = ({ownerProfile, reservations}) =>{
    const { owner: user } = useContext(OwnerContext);
    let userId = user[1]
    const [isPending, setIsPending] = useState(true);
    const [item, setItem] = useState([]);
    const { itemId } = useParams();

    // let dateStart = new Date(getNewBooking.date[0]);
    // let dateEnd = new Date(getNewBooking.date[1]);
  
  
console.log('reservations', reservations);


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



    return (
        <>
        <div>yop</div>
         {userId === ownerProfile._id && (
             reservations?.map((reservation) => (
                 <><p>{reservation.itemId}</p><>
                     {reservation.date.length === 1 ? (
                         <p>{moment.utc(reservation.date[0]).format("dddd Do YYYY")} </p>
                     ) : (
                         <>
                             <p>
                                 From:
                                 <span> {moment.utc(reservation.date[0]).format("dddd Do YYYY")}</span>{" "}
                             </p>
                             <p>
                                 To:<span> {moment.utc(reservation.date[1]).format("dddd Do YYYY")}</span>{" "}
                             </p>
                         </>
                     )}
                 </></>
             ))
         )}

        </>
    )
}

export default MyOwnReservations