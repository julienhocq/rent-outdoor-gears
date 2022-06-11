import { useContext, useEffect, useState } from "react";
import CalendarReservation from "./CalendarReservation";
// import { useParams, Link } from "react-router-dom";

import styled from "styled-components";
import { ItemContext } from "./context/Context";

const Checkout = () => {
  const { selectedItem } = useContext(ItemContext);
  console.log("selectedItem", selectedItem);

  return (
    <>
    <Wrapper>
      <CalendarReservation />
      </Wrapper>
    </>
  );
};


const Wrapper = styled.div`
width: 500px;
`

export default Checkout;
