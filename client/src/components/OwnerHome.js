import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const OwnerHome = () => {
  const [owner, setOwner] = useState([]);
  const { profileById } = useParams();

  useEffect(() => {
    const fetchOwner = async () => {
      const data = await fetch(`/api/profile/${profileById}`);
      const json = await data.json();
      setOwner(json.data);
    };
    fetchOwner();
  }, [profileById]);

  console.log("owner is", owner);

  return (
<>
    <Img src={owner.image} />
    <p>{owner.username}</p>
<p>Your items: </p>

<p>Add new item</p>

    </>

  )
};

const Img = styled.img`
max-width: 80px;
`


export default OwnerHome;
