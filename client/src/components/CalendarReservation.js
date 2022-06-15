import { useContext, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { OwnerContext } from "./context/Context";

import { isWithinInterval } from "date-fns";
import ItemDetails from "./ItemDetails";

const CalendarReservation = ({ owner, item }) => {
  const { itemById } = useParams();
  const history = useHistory();

  const { owner: user } = useContext(OwnerContext);
  // console.log('user IS', user);

  const [date, setDate] = useState();
  const [reservations, setReservations] = useState([]);

  const [disabledRanges, setDisabledRanges] = useState([]);

  // new Date - ex: newDate(2017, 0, 1) - month index = 0
  // const disabledRanges = [
  //   [new Date(2022, 5, 25), new Date(2022, 5, 28)],
  //   [new Date(2022, 5, 21), new Date(2022, 5, 21)],
  // ];

  // console.log("disabledRanges", disabledRanges);
  // console.log('date selected', date);


  useEffect(() => {
    fetch(`/api/item/${itemById}/reservations`)
        .then((res) => res.json())
        .then((data) => {
          setReservations(data.data);
          // console.log("reservations", data.data);
          let reservations = data.data;
          let datesReservations = [];
          reservations.filter((e) => datesReservations.push(e.date));
          // console.log("datesReservations is", datesReservations);

          for (let i = 0; i < datesReservations.length; i++) {
            let array = datesReservations[i];
            if (array.length === 1) {
              array.push(array[0]);
            }
            array.forEach((element, index) => {
              array[index] = new Date(element);
            });
          }
          setDisabledRanges(datesReservations);

          // console.log("new array", datesReservations);
        });
   
  }, [itemById]);

  function tileDisabled({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is within any of the ranges
      return isWithinRanges(date, disabledRanges);
    }
  }

  function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
  }

  function isWithinRanges(date, ranges) {
    return ranges.some((range) => isWithinRange(date, range));
  }

  const handleAfterBooking = () => {
    if (date)
    history.push("/confirmation-booking");
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) console.log("no user!");
    let  clientId = user[1]

    try {
      const data = await fetch(`/api/item/${itemById}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ownerId: owner._id,
          itemId: item._id,
          clientId: clientId,
          date: date,
        }),
      });

      const json = await data.json();
      sessionStorage.setItem("NewBooking", JSON.stringify(json.data));
      handleAfterBooking();
    } catch (error) {
      console.error("failed to book the item", error);
    }
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
          !date? (
            <Button disabled style={{backgroundColor: "pink"}}>Select a date</Button>

          ) : (

            <Button onSubmit={handleAfterBooking}>Book</Button>
          )
        )}
      </Form>
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin: 20px;
  width: 250px;
  padding: 10px 20px;
  font-size: 1.6rem;
  border: none;
  color: white;
  cursor: pointer;
  font-family: monospace;
  background-color: var(--color-secondary);
  border: 2px solid #e1f3f3;
  padding: 0.25em 0.5em;
  transition: background-color 2s ease-out;

  &:hover {
    background-color: var(--color-tertiary);
  }

`;

export default CalendarReservation;
