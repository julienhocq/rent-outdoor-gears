import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import LoadingPage from "./Loading";
import ErrorMessage from "./Error";

import {GrMapLocation} from "react-icons/gr"

const OwnerHome = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [owner, setOwner] = useState([]);
  const [items, setItems] = useState([]);

  const { profileById } = useParams();

  useEffect(() => {
    const fetchOwner = async () => {
      await fetch(`/api/profile/${profileById}`)
        .then((res) => res.json())
        .then((data) => {
          setOwner(data.data);
          setIsPending(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    };
    fetchOwner();
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

  console.log("owner is", owner);
  console.log("items is", items);
  console.log("items 1", items[0]);
  console.log("items 2", items[1]);

  return (
    <>
      {error && <ErrorMessage></ErrorMessage>}

      {isPending && <LoadingPage />}

      {owner && items && owner.username && (
        <>
          <PageWrapper>
            <OwnerProfileWrapper>
              <OwnerImageWrapper>
                <OwnerImg src={owner.image} />
              </OwnerImageWrapper>
              <OwnerNameCityWrapper>
                <OwnerName>{owner.username}</OwnerName>
                <WrapperLocation>
                <GrMapLocation />
                <OwnerCity>{owner.address.city}</OwnerCity>
                </WrapperLocation>
              </OwnerNameCityWrapper>

            </OwnerProfileWrapper>
              </PageWrapper>
            <OwnerItemh2>{owner.username}'s items: </OwnerItemh2>
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
            <p>Add new item</p>
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

`


const OwnerProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const OwnerNameCityWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const OwnerItemh2 = styled.h2`
padding-left: 40px;
padding-top: 20px;
`

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
`

export default OwnerHome;
