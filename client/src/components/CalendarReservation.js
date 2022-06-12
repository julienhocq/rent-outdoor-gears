import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { OwnerContext } from "./context/Context";

import { isWithinInterval } from "date-fns";
import ItemDetails from "./ItemDetails";

const CalendarReservation = ({ owner, item }) => {
  const { itemById } = useParams();

  const { owner : user } = useContext(OwnerContext)
  console.log('user', user);


  const [date, setDate] = useState(new Date());
  const [resa, setResa] = useState([])
  const [essai, setEssai] = useState()

  // console.log('new Date', new Date());
  // const [disabledRanges, setDisabledRanges] = useState([])

  // const disabledRanges = [
  //   [new Date(2022, 5, 25), new Date(2022, 5, 28)],
  //   [new Date(2022, 5, 17), new Date(2022, 5, 22)],
  // ];
  const disabledRanges = [
    // [new Date(2022, 5, 25), new Date(2022, 5, 25)],
    //  ["2022-07-13", "2022-07-15"]
    
  ];


console.log('essai is', essai);


  console.log(new Date(2022, 5, 25));
  console.log('', date);
  // console.log('', (2022, 5, 25).toDateString());

  useEffect(() => {

    const fetchReservations = async () => {
      await fetch(`/api/item/${itemById}/reservations`)
      .then((res) => res.json())
      .then((data) => {
        setResa(data.data)
        let reservations = data.data
        let datesReservations = []
        // let filterResa = reservations.filter(e => datesReservations.push(new Date(e.date)))
        let filterResa = reservations.filter(e => datesReservations.push(e.date))
        console.log('datesReservations is', datesReservations);
        // let filterResa = reservations.filter(e => datesReservations.push(e.date.toString()))
        let newDatesFormat = []
        // for (let i = 0; i<= datesReservations.length; i++) {
        //   console.log('',datesReservations[i]);
        // //  let newDates = datesReservations[i].forEach((e) => e = new Date(e))
        // console.log(datesReservations[i].map(e => new Date(e)))
        // //  console.log('', newDates);
        // }
        // console.log('', datesReservations);




        // let newDatesFormat = []
        // datesReservations.filter(e => newDatesFormat.push(e[0], e[1]))

        // datesReservations.filter(e => newDatesFormat.push(new Date(e[0])))
        console.log('newDatesFormat', newDatesFormat);



        // console.log('filterResa', filterResa);
        // setDisabledRanges(datesReservations)
        // setEssai(datesReservations)


        // console.log('filterResa', filterResa);

        // console.log('reservations IS', reservations);

      })
    }
  
   fetchReservations()
  }, [itemById]);

  




  function tileDisabled({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is within any of the ranges
      return isWithinRanges(date, disabledRanges);
      // return false
    }
  }

  function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
  }

  function isWithinRanges(date, ranges) {
    return ranges.some((range) => isWithinRange(date, range));
  }

  console.log("date", date);
  // console.log("owner", owner);
  // console.log("item", item);

  // console.log('ownerId', owner._id);
  // console.log('itemById', itemById);




  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user ) console.log('pas possible de réserver');




    await fetch(`/api/item/${itemById}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ownerId: owner._id,
        itemId: item._id,
        date: date,
      }),
    })
      .then(() => {
        console.log("post sent, it's booked");
      })
      .catch((error) => {
        console.error("failed to book the item", error);
      });
  };


  return (
    <div>
      <Form onSubmit={handleBooking}>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
          allowPartialRange={true}
          tileDisabled={tileDisabled}
          minDate={new Date()}
        />
        {!user ? (
          <Link to="/login">
          <Button>Sign in to book!</Button>
          </Link>
        ) : (
          <Button>Book</Button>

        )
        
         }
      </Form>
    </div>
  );
};

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center
`;

const Button = styled.button`

  margin-top: 20px;
  width: 250px;
  height: 40px;
  padding: 7px 20px;
  font-size: 1.2rem;
  border: none;
  color: white;
  background-color: blue;
  cursor: pointer;
`;

export default CalendarReservation;
