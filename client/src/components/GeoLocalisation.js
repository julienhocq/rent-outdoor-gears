import { useContext } from "react";
import { Link } from "react-router-dom";

import Map from "react-map-gl";
import GeocoderSearch from "./GeocoderSearch";
import styled from "styled-components";
import { OwnerContext } from "./context/Context";

const Geocoder = () => {
  const { owner } = useContext(OwnerContext);
  const ownerUsername = owner[0];
  const ownerId = owner[1];
  console.log("owner", owner[1]);

  return (
    <>
      {ownerId && (
        <Wrapper>
          <SectionOne>
            <p>Hi {ownerUsername}, let's add a new item in 3 quick steps!</p>
          </SectionOne>

          <TitleAction>Step 1: Where is located you item?</TitleAction>
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
          <Link to="/add-item">
            <Button>Validate your location</Button>
          </Link>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const SectionOne = styled.div`
  p {
    font-size: 1.4em;
    padding-bottom: 20px;
  }
`;

const TitleAction = styled.h2`
  padding-bottom: 20px;
`;

const Button = styled.button`
  margin: 30px;
  padding: 10px 20px;
  font-size: 1.6em;
  border: none;
  color: white;
  cursor: pointer;
  font-family: monospace;
  background-color: var(--color-secondary);
  border: 2px solid #e1f3f3;
  transition: background-color 2s ease-out;

  &:hover {
    background-color: var(--color-tertiary);
  }
`;

export default Geocoder;
