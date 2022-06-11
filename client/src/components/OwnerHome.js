import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingPage from "./Loading";
import ErrorMessage from "./Error";


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

      {owner && items && (
        <>
          <Img src={owner.image} />
          <p>{owner.username}</p>
          <p>Your items: </p>

          {items.map((item) => (
            <p>{item.name}</p>
          ))}

          <p>Add new item</p>
        </>
      )}
    </>
  );
};

const Img = styled.img`
  max-width: 80px;
`;

export default OwnerHome;
