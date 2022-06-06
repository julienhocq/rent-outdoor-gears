import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { render } from "react-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import imgIcon from "../assets/bike-icon-bis.jpg";
import imgIconMap from "../assets/mapbox-icon.png";

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 45.463839,
    longitude: -73.577551,
    // width: "100vw",
    // height: "100vh",
    zoom: 14,
  });
  const [items, setItems] = useState();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch(
      "/api/items?" +
        new URLSearchParams({
          category: "",
          city: "",
        })
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   items.map((item) =>
  //   new mapboxgl.Marker().setLngLat(item.coordinates).addTo(map))

  // }, [])

  console.log("items", items);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
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
            key={item._id}
            latitude={item.latitude}
            longitude={item.longitude}
            color="red"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                // console.log('im cliked');
                setSelectedItem(item);
              }}
            >
              <Img />
            </Button>
          </Marker>
        ))}
        {selectedItem ? (
          <Popup
            latitude={selectedItem.latitude}
            longitude={selectedItem.longitude}
            onClose={() => {
              setSelectedItem(null);
            }}
          >
            <div>
              <h2>{selectedItem.name}</h2>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
};

const Button = styled.button`
  cursor: pointer;
`;

const Img = styled.img`
  background-image: url(${imgIconMap});
  background-size: cover;
  min-width: 50px;
  height: 50px;
  /* border-radius: 50%; */
  /* width: 80px; */
`;

export default Map;
