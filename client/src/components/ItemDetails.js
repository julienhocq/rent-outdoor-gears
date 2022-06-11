import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import styled from "styled-components";
import { ItemContext } from "./context/Context";

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

  console.log("item", item);
  console.log("ownerData", owner);

  return (
    <>
      {item && owner && (
        <>
          <Img src={item.image} />
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>$ {item.priceDaily}</p>
          <Link to={`/profile/${owner._id}`}>
            <p>{owner.username}</p>
          </Link>
          <img src={owner.image} />

          <Link to="/checkout">
            <button>BOOK THIS ITEM</button>
          </Link>
        </>
      )}
    </>
  );
};

const Img = styled.img`
  max-width: 600px;
`;

export default ItemDetails;
