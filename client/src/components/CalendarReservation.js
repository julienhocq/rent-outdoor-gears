import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

import { isWithinInterval } from "date-fns";
import ItemDetails from "./ItemDetails";

const CalendarReservation = ({ owner, item }) => {
  const { itemById } = useParams();

  const [date, setDate] = useState();
  // console.log('new Date', new Date());

  const disabledRanges = [
    [new Date(2022, 5, 25), new Date(2022, 5, 28)],
    [new Date(2022, 5, 17), new Date(2022, 5, 22)],
  ];

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
  console.log("owner", owner);
  console.log("item", item);

  console.log('ownerId', owner._id);
  console.log('itemById', itemById);


  const handleBooking = async (e) => {
    e.preventDefault();

    // useEffect(() => {

   
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
// }, [])

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
        <Button>Book</Button>
      </Form>
    </div>
  );
};

const Form = styled.form``;

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
