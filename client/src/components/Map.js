import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { render } from "react-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 45.463839,
    longitude: -73.577551,
    // width: "100vw",
    // height: "100vh",
    zoom: 14
  });
  const [items, setItems] = useState()


  useEffect(() => {

    fetch("/api/items?" + new URLSearchParams({
      category: "",
      city: ""
    }) )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data)
      })
      .catch((err) => console.log(err));
    }, []);

    // useEffect(() => {
    //   items.map((item) =>
    //   new mapboxgl.Marker().setLngLat(item.coordinates).addTo(map))

    // }, [])

    console.log('items', items);

  // useEffect(() => {
  //   const listener = e => {
  //     if (e.key === "Escape") {
  //       setSelectedPark(null);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);

  

  return (
    <ReactMapGL
      initialViewState={{
        latitude: 45.463839,
        longitude: -73.577551,
        zoom: 10,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >

      {items?.map((item) => (
        <Marker
         latitude={item.latitude}
         longitude={item.longitude}  color="red" />
      ))}
    </ReactMapGL>
  );
};

export default Map;
