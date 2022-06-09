import { useState } from "react";

import Map from "react-map-gl";
import GeocoderSearch from "./GeocoderSearch";
import styled from "styled-components";

const Geocoder = () => {
  // const [marker, setMarker] = useState(null)

  return (
    <>
      <Wrapper>
        <TitleAction>Where is located you item?</TitleAction>
        <Map
          initialViewState={{
            longitude: -73.577551,
            latitude: 45.463839,
            zoom: 11,
          }}
          style={{ width: 800, height: 400 }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <GeocoderSearch />
        </Map>
        {/* <ControlPanel /> */}
        <Button>Add your item</Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const TitleAction = styled.h2`
  padding-bottom: 10px;
`;

const Button = styled.button`
  margin-top: 30px;
  width: 250px;
  height: 40px;
  padding: 7px 20px;
  font-size: 1.2rem;
  border: none;
  color: white;
  background-color: blue;
  cursor: pointer;
`;

export default Geocoder;
