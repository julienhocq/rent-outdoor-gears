import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styled from "styled-components";
import imgIcon from "../assets/bike-icon-bis.jpg";
import imgIconMap from "../assets/mapbox-icon.png";
import { ItemContext } from "./context/Context";
import MainGeoControl from "./MainGeocontrol";
import ErrorMessage from "./Error";

import LoadingPage from "./Loading";


const MainMap = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

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
        setIsPending(false);

      })
      .catch((err) => {
        setError(err.message);
      });
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
      if (filterParam === undefined || filterParam === "all") {
        setFilteredItems(items);
      } else {
        setFilteredItems(filteredProduct);
      }
      return filteredProduct;
    };
    filterItems();
  }, [filterParam, items]);

  // const mapRef = useRef();

  // const checkIfPositionInViewport = (lat, lng) => {
  //     const bounds = mapRef.current.getMap().getBounds();
  //     return (lat >= bounds._sw.lat && lat <= bounds._nw.lat && lng >= bounds._sw.lng && lng <= bounds._nw.lng);
  // }

  // return <Map ref={mapRef}/>

  return (
    <>
          {error && <ErrorMessage></ErrorMessage>}
      {isPending && <LoadingPage />}

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
        <FullscreenControl position="top-left" />
        <MainGeoControl />
        <NavigationControl position="top-left" />
        {filteredItems?.map((item) => (
          <>
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
          </>
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
              value="road"
              name="filterGroup"
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
            ></input>
            <span>Road</span>
          </label>
          <label>
            <input
              type="radio"
              name="filterGroup"
              value="land"
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
              // onChange={(e)=> filterByCategoryCamping()}
            ></input>
            <span>Land</span>
          </label>
          <label>
            <input
              type="radio"
              name="filterGroup"
              value="water"
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
            ></input>
            <span>Water</span>
          </label>

        </form>
      </FilterSection>
      {/* <div>
                <WrapperFiltersItems>
                  <div>{item.name}</div>
                </WrapperFiltersItems>
              </div> */}
      {/* <div>
        {filteredItems?.map((item) => (
          <div>{item.name}</div>
        ))}
      </div> */}
      <div>
        <Link to="add-location">
          <ButtonAddItem>Add an item</ButtonAddItem>
        </Link>
      </div>
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

const WrapperFiltersItems = styled.div`
  position: absolute;
  top: 500px;
  left: 100px;
`;

const ButtonAddItem = styled.button`
margin-top: 40px;
width: 250px;
    height: 40px;
    padding: 7px 20px;
    font-size: 1.2rem;
    border: none;
    color: white;
    background-color: blue;
    cursor: pointer;

`;

export default MainMap;
