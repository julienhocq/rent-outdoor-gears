import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import styled from "styled-components";
import { ItemContext } from "./context/Context";
import CalendarReservation from "./CalendarReservation";

const ItemDetails = () => {
  const [item, setItem] = useState([]);
  const [owner, setOwner] = useState([]);

  const { itemById } = useParams();

  // fetching product info by itemId
  useEffect(() => {
    const fetchProduct = async () => {
      await fetch(`/api/item/${itemById}`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log('data',data.data);
          setItem(data.data);
        });
    };
    fetchProduct();
  }, [itemById]);

  //   console.log("item IS", item);

  useEffect(() => {
    const FetchOwner = async () => {
      const ownerId = item.OwnerId;
      await fetch(`/api/profile/${ownerId}`)
        .then((res) => res.json())
        .then((data) => {
          setOwner(data.data);
        });
    };
    FetchOwner();
  }, [item.OwnerId, item._id]);

  // console.log("item", item._id);
  // console.log("ownerData", owner);
  // console.log("ownerId", owner._id);
  //   console.log("owner address", owner.address);

  return (
    <>
      {item && owner && (
        <>
          <Main>
            <PageWrapper>
              <h1>{item.name}</h1>
              <ItemImageWrapper>
                <ItemImg src={item.image} />
              </ItemImageWrapper>
              <OwnerProfileWrapper>
                <OwnerImageWrapper>
                  <Img src={owner.image} />
                </OwnerImageWrapper>
                <Link to={`/profile/${owner._id}`}>
                  <OwnerName>{owner.username}</OwnerName>
                </Link>
                {/* <OwnerCity>{owner.address.city}</OwnerCity> */}
              </OwnerProfileWrapper>
              <ItemDescription>Description: {item.description}</ItemDescription>
              <p>Daily price: $ {item.priceDaily}</p>
              <p>Weekly price: $ {item.priceWeekly}</p>

              <Link to="/checkout">
                <button>BOOK THIS ITEM</button>
              </Link>
              <Wrapper>
                <CalendarReservation owner={owner} item={item} />
              </Wrapper>
            </PageWrapper>
          </Main>
        </>
      )}
    </>
  );
};

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid black;

  h1 {
    text-align: center;
  }
`;

// const ItemTitle = styled.h1`
// display: flex;
// text-align: center;
// `

const ItemImageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ItemImg = styled.img`
  max-width: 500px;
  width: 100%;
`;

const OwnerImageWrapper = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  /* align-items: center; */
  position: relative;
  width: 100px;
  height: 100px;
`;

const Img = styled.img`
  border-radius: 50%;
  /* display: flex; */
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
`;

const OwnerName = styled.div`
  padding-left: 20px;
`;

const OwnerProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ItemDescription = styled.div`
  padding-top: 20px;
`;

/* 
const OwnerCity = styled.div``; */

const Wrapper = styled.div`
  padding-top: 30px;
  /* width: 500px; */
`;

export default ItemDetails;
