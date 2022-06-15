import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styled from "styled-components";
import markerLocation from "../assets/Marker-location.svg";

import { ItemContext, OwnerContext } from "./context/Context";
import MainGeoControl from "./MainGeocontrol";
import ErrorMessage from "./Error";

// import { GiMountains } from "react-icons/gi";

import LoadingPage from "./Loading";

import landImage from "../assets/Category-Land-01_m.jpg";
import roadImage from "../assets/Category-Road-01_m.jpg";
import waterImage from "../assets/Category-Water-01_m.jpg";
import heroImageOne from "../assets/Hero-image01.jpg";

const MainMap = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [items, setItems] = useState([]);
  const { selectedItem, setSelectedItem } = useContext(ItemContext);
  const { owner } = useContext(OwnerContext);

  const [filteredItems, setFilteredItems] = useState(items);
  const [filterParam, setFilterParam] = useState();

  // Fetch all items
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

  // close the popup windows on the map
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

  // Filter the items by category and update the map with filtered items
  useEffect(() => {
    const filterItems = () => {
      let filteredProduct = [];
      filteredProduct = items.filter((item) => item.category === filterParam);
      if (filterParam === undefined || filterParam === "all") {
        setFilteredItems(items);
      } else {
        setFilteredItems(filteredProduct);
      }
      return filteredProduct;
    };
    filterItems();
  }, [filterParam, items]);

  const [loginMessage, setLoginMessage] = useState();

  // Can't add an item if you are not login
  const handleClick = () => {
    setLoginMessage("Please login");
  };

  return (
    <>
      {error && <ErrorMessage></ErrorMessage>}
      {isPending && <LoadingPage />}
      <Main>
        <SectionHeroImage>
          <img src={heroImageOne} alt="" />
          <HeroText>
            <h2>Ready? </h2>
            <p>Your next adventure is at your fingertips</p>
          </HeroText>
        </SectionHeroImage>
        <SectionFilter>
          <h2>Find what you need based on type & location </h2>
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
          <h2>Share your gear and share the next adventure</h2>
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
                <LoginMessStyle>
                  <LinkStyled to="/login">
                    <p>{loginMessage}</p>
                  </LinkStyled>
                </LoginMessStyle>
              </>
            )}
          </div>
        </SectionAddItem>
        <SectionExploreCategory>
          <h2>Explore by universe</h2>
        </SectionExploreCategory>
        <SectionCategories>
          <RoadContainer>
            <img src={roadImage} alt="road-category" />
            <h3>Road</h3>
          </RoadContainer>
          <LandContainer>
            <img src={landImage} alt="land-category" />
            <h3>Land</h3>
          </LandContainer>
          <WaterContainer>
            <img src={waterImage} alt="water-category" />
            <h3>Water</h3>
          </WaterContainer>
        </SectionCategories>
      </Main>
    </>
  );
};

const Main = styled.div`
  /* max-width: 1600px; */
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
`;
const SectionHeroImage = styled.div`
  padding-bottom: 60px;
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
    letter-spacing: 0.2em;
  }

  p {
    font-size: 2em;
  }
`;

const SectionFilter = styled.div`
  padding: 20px 0;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: #85D3F2; */
  width: 100%;

  h2 {
    font-size: 2em;
    padding-bottom: 10px;
    color: #d97652;
  }

  form {
    /* color: green; */
    font-size: 1.4em;
    display: flex;
    flex-direction: row;
    padding-top: 20px;
  }
  label {
    padding: 10px 30px;
  }
  span {
    padding: 0 10px;
  }
`;
const SectionAddItem = styled.div`
  margin-top: 80px;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: black;
  background-color: var(--color-lightBlue);

  h2 {
    font-size: 2em;
    padding-right: 10px;
    padding-bottom: 20px;
  }
`;

const ButtonAddItem = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 1.6rem;
  border: none;
  color: white;
  cursor: pointer;
  font-family: monospace;
  background-color: var(--color-secondary);
  border: 2px solid #e1f3f3;
  padding: 0.25em 0.5em;
  transition: background-color 2s ease-out;

  &:hover {
    background-color: var(--color-tertiary);
  }
`;

const LoginMessStyle = styled.div`
  p {
    text-align: center;
    font-weight: 600;
    /* color: red; */
  }

  a:hover {
    color: pink;
  }
`;

const SectionExploreCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;

  h2 {
    font-size: 2em;
  }
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
