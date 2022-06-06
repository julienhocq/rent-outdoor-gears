// eslint-disable-next-line
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import styled from "styled-components";
// const path = require("path");

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
console.log('process.env.REACT_APP_MAPBOX_TOKEN',process.env.REACT_APP_MAPBOX_TOKEN);


function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.561668);
  const [lat, setLat] = useState(45.508888);
  const [zoom, setZoom] = useState(9);
  const [items, setItems] = useState([])

  // Initialize the Map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {

    fetch("/api/items?" + new URLSearchParams({
      category: "",
      // city: ""
    }) )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }, []);




  return (
    <div> heoo
      <MapContainer ref={mapContainer}
    />
    <p>Bike</p>
    </div>
  );
}

const MapContainer = styled.div`
  width: 50vw;
  height: 50vh;
`;

export default Map;
