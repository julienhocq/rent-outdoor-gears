import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import LoadingPage from "./Loading";
import ErrorMessage from "./Error";

import { GrMapLocation } from "react-icons/gr";
import { GiNinjaHead } from "react-icons/gi";
import { OwnerContext } from "./context/Context";

const OwnerHome = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [ownerProfile, setOwnerProfile] = useState([]);
  const [items, setItems] = useState([]);

  const { owner } = useContext(OwnerContext);
  let userId = owner[1];
  console.log("userId", userId);
  const { profileById } = useParams();

  useEffect(() => {
    const fetchOwnerProfile = async () => {
      await fetch(`/api/profile/${profileById}`)
        .then((res) => res.json())
        .then((data) => {
          setOwnerProfile(data.data);
          setIsPending(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    };
    fetchOwnerProfile();
  }, [profileById]);

  useEffect(() => {
    const fetchItemsOwner = async () => {
      await fetch(`/api/profile/${profileById}/items`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
          setIsPending(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    };
    fetchItemsOwner();
  }, [profileById]);

  console.log("ownerProfile Id is", ownerProfile._id);
  console.log("items is", items);
  // console.log("items 1", items[0]);
  // console.log("items 2", items[1]);

  return (
    <>
      {error && <ErrorMessage></ErrorMessage>}

      {isPending && <LoadingPage />}

      {ownerProfile && items && ownerProfile.username && (
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
                <Link to={`/item/${item._id}`}>
                  <ItemContainer>
                    <ItemImg src={item.image}></ItemImg>
                    <h2>{item.name}</h2>
                  </ItemContainer>
                </Link>
              ))}
            </ItemsWrapper>
          ) : (
            <TextNoItem>No Item yet! </TextNoItem>
          )}
          {ownerProfile._id === userId &&
          <>
          <OwnerItem>Add new item</OwnerItem>
          <Link to ="/add-location">
          <button>Yes!</button>
          </Link>
          </>
          }
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
  align-items: center;
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
  padding: 30px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const ItemImg = styled.img`
  /* max-width: 120px; */
  padding-bottom: 20px;
`;

export default OwnerHome;
