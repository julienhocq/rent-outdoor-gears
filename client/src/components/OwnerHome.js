import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import LoadingPage from "./Loading";
import ErrorMessage from "./Error";

import { GrMapLocation } from "react-icons/gr";
import { GiNinjaHead } from "react-icons/gi";
import { OwnerContext } from "./context/Context";
import MyOwnReservations from "./MyOwnReservations";

const OwnerHome = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(true);

  const [ownerProfile, setOwnerProfile] = useState([]);
  const [items, setItems] = useState([]);
  const [reservations, setReservations] = useState(null);
  const [selectedItemById, setSelectedItemById] = useState();

  const { owner: user } = useContext(OwnerContext);
  // let userId = owner[1];
  // console.log("userId", userId);
  const { profileById } = useParams();
  // console.log('user', user);

  // Give informations on the owner - profile
  useEffect(() => {
    fetch(`/api/profile/${profileById}`)
      .then((res) => res.json())
      .then((data) => {
        setOwnerProfile(data.data);
        setStatus(true);
        setIsPending(false);
      })
      .catch((err) => {
        console.log("err", err);

        setIsPending(false);
        setError(err);
      });
  }, [profileById]);

  // Give all items for a selected owner
  useEffect(() => {
    fetch(`/api/profile/${profileById}/items`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 500) {
          throw new Error("error");
        }
        setItems(data.data);
        setStatus(true);
        setIsPending(false);
      })
      .catch((err) => {
        console.log("err", err);
        setIsPending(false);
        setError(err);
      });
  }, [profileById]);

  // Give all reservations for a selected profile owner
  useEffect(() => {
    fetch(`/api/profile/${profileById}/reservations`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 500) {
          throw new Error("error");
        }
        setReservations(data.data);
        setStatus(true);
        setIsPending(false);
      })

      .catch((err) => {
        console.log("err", err);
        setIsPending(false);
        setError(err);
      });
  }, [profileById]);

  //DELETE the selected item
  useEffect(() => {
    fetch(`/api/item/${selectedItemById}`, { method: "DELETE" })
      .then(() => setStatus(false))
      .catch((err) => {
        console.log("err", err);
        setIsPending(false);
        setError(err);
      });
  }, [selectedItemById]);

  return (
    <>
      {error && <ErrorMessage />}

      {isPending && <LoadingPage />}

      {status && ownerProfile && items && ownerProfile.username && (
        <>
          <PageWrapper>
            <OwnerProfileWrapper>
              <OwnerImageWrapper>
                {ownerProfile.image ? (
                  <OwnerImg src={ownerProfile.image} />
                ) : (
                  <>
                    <WrapperAvatarIcon>
                      <GiNinjaHead size={120} />
                      <p>Change image</p>
                    </WrapperAvatarIcon>
                  </>
                )}
              </OwnerImageWrapper>
              <OwnerNameCityWrapper>
                <OwnerName>{ownerProfile.username}</OwnerName>
                <WrapperLocation>
                  <GrMapLocation />
                  {ownerProfile.address ? (
                    <OwnerCity>{ownerProfile.address.city}</OwnerCity>
                  ) : (
                    <p>City is not displayed.</p>
                  )}
                </WrapperLocation>
              </OwnerNameCityWrapper>
            </OwnerProfileWrapper>
          </PageWrapper>
          <OwnerItem>{ownerProfile.username}'s items: </OwnerItem>
          {items.length > 0 ? (
            <ItemsWrapper>
              {items.map((item) => (
                <ItemContainer>
                  <Link to={`/item/${item._id}`}>
                    <ItemImg src={item.image}></ItemImg>
                    <h2>{item.name}</h2>
                  </Link>
                  <p>{item._id}</p>
                  <Container>
                    <div>
                      Category:<span> {item.category}</span>{" "}
                    </div>
                    <div>
                      Description: <span>{item.description}</span>{" "}
                    </div>
                    <div>Daily price: ${item.priceDaily} </div>
                    <div>Weekly price: ${item.priceWeekly} </div>
                  </Container>
                  {user && user[1] === ownerProfile._id && (
                    <ButtonDelete
                      id={`${item._id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedItemById(item._id);
                        window.location.reload(true);
                      }}
                    >
                      Delete the Item
                    </ButtonDelete>
                  )}
                </ItemContainer>
              ))}
            </ItemsWrapper>
          ) : (
            <TextNoItem>No Item yet! </TextNoItem>
          )}

          {user && (
            <MyOwnReservations
              ownerProfile={ownerProfile}
              reservations={reservations}
            />
          )}
        </>
      )}
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid black;
  padding: 20px;
`;
const OwnerImageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
`;

const OwnerImg = styled.img`
  max-width: 300px;
  width: 100%;
`;

const WrapperAvatarIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;

  p {
    padding-top: 10px;
    font-size: 0.8em;
    font-style: italic;
  }
`;

const OwnerName = styled.div`
  padding-left: 20px;
  padding-bottom: 20px;
  font-size: 2em;
  font-weight: 700;
`;
const OwnerCity = styled.div`
  padding-left: 20px;
`;

const WrapperLocation = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
  font-size: 1.4em;

  p {
    font-size: 0.6em;
    font-style: italic;
    padding-left: 10px;
  }
`;

const OwnerProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const OwnerNameCityWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const OwnerItem = styled.h2`
  padding-left: 40px;
  padding-top: 20px;
`;

const ItemsWrapper = styled.div`
  padding-bottom: 60px;
  max-width: 1200px;
  display: grid;
  align-items: stretch;
  justify-items: center;

  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));

  a {
    text-decoration: none;
    color: black;
  }
`;

const TextNoItem = styled.div`
  padding: 20px 20px 20px 60px;
`;

const ItemContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  /* align-items: flex-start; */

  padding: 30px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  h2 {
    text-align: center;
    color: green;
    padding-bottom: 10px;
  }
`;

const ItemImg = styled.img`
  /* max-width: 200px; */
  padding-bottom: 20px;
  width: 100%;
  max-height: 360px;
  object-fit: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    padding-bottom: 5px;
  }
  span {
    font-style: italic;
  }
`;

const ButtonDelete = styled.button`
  margin: 20px;
  width: 250px;
  height: 40px;
  padding: 7px 20px;
  font-size: 1.2rem;
  border: none;
  color: white;
  background-color: orange;
  cursor: pointer;

  &:hover {
    color: red;
    background-color: yellow;
  }
  &:active {
    color: purple;
    background-color: yellowgreen;
  }
`;

export default OwnerHome;
