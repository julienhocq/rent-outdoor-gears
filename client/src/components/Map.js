import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import imgIcon from "../assets/bike-icon-bis.jpg";
import imgIconMap from "../assets/mapbox-icon.png";
import { ItemContext } from "./context/Context";

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 45.463839,
    longitude: -73.577551,
    zoom: 10,
  });

  const [items, setItems] = useState();
  const {selectedItem, setSelectedItem} = useContext(ItemContext)
  // const [selectedItem, setSelectedItem] = useState()
// console.log('sele', selectedItem);


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


  // console.log("items", items);

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
  }, [setSelectedItem]);


  return (
    <>
      <ReactMapGL
        {...viewport}
        style={{ width: 800, height: 400 }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
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
                // console.log('item', item);
              }}
            >
             
                      <Img src={imgIconMap} />
              
              
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
              <Link to={`/item/${selectedItem.id}`}>
              <h2>{selectedItem.name}</h2>
              </Link>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      <FilterSection>
        <div>Filter Section</div>
        <form>
          <label>
            <input
            type="radio"
            name="filterGroup"
            onChange={() => {
              items.filter((item) => {
                console.log('', item.category);
                return item.category === "bike"
              })
            }}>
            </input>
            <span>Bike</span>
          </label>
          <label>
            <input
            type="radio"
            name="filterGroup"
            // onChange={(e)=> setItems()}
            >
            </input>
            <span>Camping</span>
          </label>

        </form>
      </FilterSection>
    </>
  );
};

const Button = styled.button`
  cursor: pointer;
`;

const Img = styled.img`
  /* background-image: url(${imgIconMap}); */
  background-size: cover;
  min-width: 50px;
  height: 50px;
  /* border-radius: 50%; */
  /* width: 80px; */
`;

const FilterSection = styled.div`
padding-top: 20px;
`

export default Map;
