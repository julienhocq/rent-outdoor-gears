import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingPage from "./Loading";

import styled from "styled-components";
import CalendarReservation from "./CalendarReservation";

const ItemDetails = () => {
  const [isPending, setIsPending] = useState(true);

  const [item, setItem] = useState([]);
  const [owner, setOwner] = useState([]);
  console.log("owner", owner);
  const { itemById } = useParams();

  // fetching product info by itemId
  useEffect(() => {
    const fetchProduct = async () => {
      await fetch(`/api/item/${itemById}`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log('data',data.data);
          setItem(data.data);
          setIsPending(false);
        })
        .catch((err) => {
          setIsPending(false);
        });
    };
    fetchProduct();
  }, [itemById]);

  console.log("item IS", item);

  useEffect(() => {
    const FetchOwner = async () => {
      const ownerId = item.OwnerId;
      await fetch(`/api/profile/${ownerId}`)
        .then((res) => res.json())
        .then((data) => {
          setOwner(data.data);
          setIsPending(false);
        })
        .catch((err) => {
          setIsPending(false);
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
      {isPending && <LoadingPage />}

      {item && owner && owner.address && (
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
                  <NameCityWrapper>
                    <Link to={`/profile/${owner._id}`}>
                      <OwnerName>{owner.username}</OwnerName>
                    </Link>
                    <OwnerCity>{owner.address.city}</OwnerCity>
                  </NameCityWrapper>
                </OwnerImageWrapper>
                {/* <OwnerCity>{owner.address.city}</OwnerCity> */}
              </OwnerProfileWrapper>
              <ItemDescription>
                Description: {item.description}
                <p>Daily price: $ {item.priceDaily}</p>
                <p>Weekly price: $ {item.priceWeekly}</p>
              </ItemDescription>
              <AvailabilityWrapper>
                Check the availabilties!
              </AvailabilityWrapper>
              {/* <Link to="/checkout">
                <button>BOOK THIS ITEM</button>
              </Link> */}
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
  max-width: 800px;
  width: 100%;
`;

const OwnerImageWrapper = styled.div`
  /* border: 1px solid black; */
  border-radius: 50%;
  display: flex;
  /* align-items: center; */
  position: relative;
  top: -40px;
  left: 10px;
  width: 130px;
  height: 130px;
`;

const Img = styled.img`
  border-radius: 50%;
  max-width: 130px;
  max-height: 130px;
  object-fit: cover;
  border: 2px solid white;
`;

const NameCityWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
`;

const OwnerName = styled.div`
  padding-left: 20px;
  /* padding-top: 60px; */
  font-size: 1.4em;
`;

const OwnerCity = styled.div``;

const OwnerProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ItemDescription = styled.div`
  padding-top: 20px;
  p {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

/* 
const OwnerCity = styled.div``; */

const AvailabilityWrapper = styled.div`
  font-size: 1.4em;
`;

const Wrapper = styled.div`
  display: flex;
  padding-top: 30px;
  /* width: 500px; */
`;

export default ItemDetails;
