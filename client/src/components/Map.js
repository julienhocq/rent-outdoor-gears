import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styled from "styled-components";
import imgIcon from "../assets/bike-icon-bis.jpg";
import imgIconMap from "../assets/mapbox-icon.png";
import { ItemContext } from "./context/Context";
import MainGeoControl from "./MainGeocontrol";

const MainMap = () => {
  const [items, setItems] = useState([]);
  const { selectedItem, setSelectedItem } = useContext(ItemContext);

  const [filteredItems, setFilteredItems] = useState(items);
  const [filterParam, setFilterParam] = useState();

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

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [setSelectedItem]);

  useEffect(() => {
    const filterItems = () => {
      let filteredProduct = [];
      filteredProduct = items.filter((item) => item.category === filterParam);
      console.log("filteredProduct IS", filterParam, filteredProduct);
      setFilteredItems(filteredProduct);
      return filteredProduct;
    };
    filterItems();
  }, [filterParam, items]);

  console.log("items is", items);
  console.log("filteredItems is", filteredItems);

  return (
    <>
      <Map
        initialViewState={{
          longitude: -73.577551,
          latitude: 45.463839,
          zoom: 10,
        }}
        style={{ width: 800, height: 400 }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <MainGeoControl />
        {filteredItems?.map((item) => (
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
              <Link to={`/item/${selectedItem._id}`}>
                <h2>{selectedItem.name}</h2>
              </Link>
            </div>
          </Popup>
        ) : null}
      </Map>
      <FilterSection>
        <div>Filter Section</div>
        <form>
        <label>
            <input
              type="radio"
              value="all"
              name="filterGroup"
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
            ></input>
            <span>All</span>
          </label>
          <label>
            <input
              type="radio"
              value="bike"
              name="filterGroup"
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
            ></input>
            <span>Bike</span>
          </label>
          <label>
            <input
              type="radio"
              name="filterGroup"
              value="camping"
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
              // onChange={(e)=> filterByCategoryCamping()}
            ></input>
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
`;

export default MainMap;
