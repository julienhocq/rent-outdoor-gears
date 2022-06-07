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

  return <div>Hey</div>;
};

export default OwnerHome;
