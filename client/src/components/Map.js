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
import markerLocation from "../assets/Marker-location.svg";

import { ItemContext, OwnerContext } from "./context/Context";
import MainGeoControl from "./MainGeocontrol";
import ErrorMessage from "./Error";

import { GiMountains } from "react-icons/gi";

import LoadingPage from "./Loading";

import landImage from "../assets/Category-Land-01_m.jpg";
import roadImage from "../assets/Category-Road-01_m.jpg";
import waterImage from "../assets/Category-Water-01_m.jpg";
import heroImageOne from "../assets/Hero-image01.jpg";
import heroImageTwo from "../assets/Hero-image02.jpg";

const MainMap = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [items, setItems] = useState([]);
  const { selectedItem, setSelectedItem } = useContext(ItemContext);
  const { owner } = useContext(OwnerContext);
  console.log("owner", owner);

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

  const handleClick = () => {
    alert("Please log in!");
  };
  console.log("selectedItem", selectedItem);

  return (
    <>
      {error && <ErrorMessage></ErrorMessage>}
      {isPending && <LoadingPage />}
      <Main>
        <SectionHeroImage>
          <img src={heroImageOne} />
          <HeroText>
            <h2>Ready? </h2>
            <p>Your next adventure is at your fingertips</p>
          </HeroText>
        </SectionHeroImage>
        <SectionFilter>
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
        </SectionFilter>

        <SectionMap>
          <Map
            initialViewState={{
              longitude: -73.577551,
              latitude: 45.463839,
              zoom: 10,
            }}
            style={{ width: 1000, height: 500 }}
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
                  anchor="bottom"
                >
                  <Img
                    src={markerLocation}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedItem(item);
                    }}
                  />
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
                  <PopupStyle>
                    <h2>{selectedItem.name}</h2>
                    <img src={selectedItem.image} alt="" width="100%" />
                    <LinkStyled to={`/item/${selectedItem._id}`}>
                      <p>More details</p>
                    </LinkStyled>
                  </PopupStyle>
                </div>
              </Popup>
            ) : null}
          </Map>
        </SectionMap>
        <SectionAddItem>
          <div>
            {owner ? (
              <Link to="add-location">
                <ButtonAddItem>Post an item</ButtonAddItem>
              </Link>
            ) : (
              <>
                <ButtonAddItem onClick={(e) => handleClick(e)}>
                  Post an item
                </ButtonAddItem>
              </>
            )}
          </div>
        </SectionAddItem>
        <SectionExploreCategory>
          <h2>Explore by universe</h2>
        </SectionExploreCategory>
        <SectionCategories>
          <RoadContainer>
            <img src={roadImage} />
            <h3>Road</h3>
          </RoadContainer>
          <LandContainer>
            <img src={landImage} />
            <h3>Land</h3>
          </LandContainer>
          <WaterContainer>
            <img src={waterImage} />
            <h3>Water</h3>
          </WaterContainer>
        </SectionCategories>
      </Main>
    </>
  );
};

const Main = styled.div`
  /* max-width: 1600px; */
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SectionMap = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 40px;
  border: 2px solid black;
  box-shadow: 5px 15px 31px 4px #dfdfdf;
`;

const Button = styled.button`
  cursor: pointer;
`;

const PopupStyle = styled.div`
  border: none;

  h2 {
    text-align: center;
    padding-bottom: 10px;
  }

  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }
  a:hover {
    color: blue;
  }

  /* a:focus {
  color: blue;
} */

  p {
    text-align: right;
    font-style: italic;
  }
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
`;

const Img = styled.img`
  background-size: cover;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
  /* width: 80px; */
`;
const SectionHeroImage = styled.div`
  padding-bottom: 20px;
  /* height: 600px; */
  /* width: 100%; */
  /* position: relative; */
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */

  /* background-image: url("https://images.unsplash.com/photo-1499971670613-a1df6023b6e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"); */
  img {
  }
`;

const HeroText = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;

  h2 {
    font-size: 4em;
    padding-bottom: 20px;
  }

  p {
    font-size: 1.8em;
  }
`;

const SectionFilter = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;

  form {
    /* color: green; */
    font-size: 1.4em;
    display: flex;
    flex-direction: row;
  }
  label {
    padding: 0 30px;
  }
  span {
    padding: 0 10px;
  }
`;

const WrapperFiltersItems = styled.div`
  position: absolute;
  top: 500px;
  left: 100px;
`;

const ButtonAddItem = styled.button`
  margin: 20px;
  width: 250px;
  height: 40px;
  padding: 7px 20px;
  font-size: 1.2rem;
  border: none;
  color: white;
  background-color: blue;
  cursor: pointer;
`;

const SectionAddItem = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  background-color: teal;
`;

const SectionExploreCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
`;

const SectionCategories = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 60px;
  h3 {
    z-index: 10;
    color: white;
    /* opacity: 0.8; */
    font-size: 4em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const RoadContainer = styled.div`
  display: flex;
  height: 300px;
  padding: 20px;
  position: relative;
`;

const LandContainer = styled.div`
  display: flex;
  position: relative;
  height: 300px;
  padding: 20px;
`;

const WaterContainer = styled.div`
  display: flex;
  position: relative;
  height: 300px;
  padding: 20px;
`;

export default MainMap;
