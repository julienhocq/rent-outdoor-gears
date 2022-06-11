import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

import { isWithinInterval } from "date-fns";


const CalendarReservation = () => {
  const [date, setDate] = useState();
console.log('new Date', new Date());

  const disabledRanges = [
    [new Date(2022,5,12), new Date(2022,5,13)],
    [new Date(2022,5,17), new Date(2022,5,22)],
  ];
  
  function tileDisabled({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is within any of the ranges
      return isWithinRanges(date, disabledRanges);
      // return false
    }
  }


  function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
  }
  
  function isWithinRanges(date, ranges) {
    return ranges.some(range => isWithinRange(date, range));
  }



  console.log('date', date);

  return (
    <div>
      <Calendar onChange={setDate} value={date} selectRange={true}
      tileDisabled={tileDisabled}
      />
    </div>
    
  );
};

export default CalendarReservation;
