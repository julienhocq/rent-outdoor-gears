import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingPage from "./Loading";

import styled from "styled-components";
import CalendarReservation from "./CalendarReservation";

const ItemDetails = () => {
  const [isPending, setIsPending] = useState(true);

  const [item, setItem] = useState([]);
  const [owner, setOwner] = useState([]);
  const { itemById } = useParams();

  // fetch item data by itemId
  useEffect(() => {
    const fetchProduct = async () => {
      await fetch(`/api/item/${itemById}`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data.data);
          setIsPending(false);
        })
        .catch((err) => {
          setIsPending(false);
        });
    };
    fetchProduct();
  }, [itemById]);

  // fetch item's owner data
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

  // Rules to book: user has to be sign in
  // More details about the logic in CalendarReservation component

  return (
    <>
      {isPending && <LoadingPage />}

      {item && owner && owner.address && (
        <Main>
          <PageWrapper>
            <h1>{item.name}</h1>
            <ItemImageWrapper>
              <ItemImg src={item.image} />
            </ItemImageWrapper>
            <OwnerImageWrapper>
              <Img src={owner.image} />
              <NameCityWrapper>
                <Link to={`/profile/${owner._id}`}>
                  <h3>{owner.username}</h3>
                </Link>
                <OwnerCity>{owner.address.city}</OwnerCity>
              </NameCityWrapper>
            </OwnerImageWrapper>

            <ItemDescription>
              Description: {item.description}
              <p>Daily price: $ {item.priceDaily}</p>
              <p>Weekly price: $ {item.priceWeekly}</p>
              <h3>Interested? Check the availabilities!</h3>
            </ItemDescription>

            <Wrapper>
              <CalendarReservation owner={owner} item={item} />
            </Wrapper>
          </PageWrapper>
        </Main>
      )}
    </>
  );
};

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const PageWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 4px solid var(--color-primary);
  margin-bottom: 40px;

  h1 {
    text-align: center;
  }
`;

const ItemImageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-height: 400px;
  max-width: 600px;
`;
const ItemImg = styled.img`
  max-width: 800px;
  width: 100%;
  object-fit: cover;
`;

const OwnerImageWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  position: relative;
  top: -40px;
  padding: 0 10px;
  height: 130px;
  width: 100%;
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
  justify-content: space-between;
  width: 100%;

  h3 {
    padding-left: 20px;
    font-size: 1.4em;
  }
  a {
    color: var(--color-primary);
    text-decoration: none;
  }
  a:hover {
    color: pink;
  }
`;

const OwnerCity = styled.div``;

const ItemDescription = styled.div`
  padding-top: 20px;
  padding-left: 10px;
  p {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  h3 {
    padding-top: 10px;
    font-size: 1.4em;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  padding-top: 30px;
  margin: 0 auto;
`;

export default ItemDetails;
