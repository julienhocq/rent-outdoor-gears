import { Link } from "react-router-dom";
import styled from "styled-components";

const ConfirmationNewItem = () => {
  const getNewItem = JSON.parse(sessionStorage.getItem("NewItem"));

  return (
    <>
      <WrapperReservation>
        <h2>Congratulations!</h2>
        <h2>
          You just added a new item to the {getNewItem.category} collection
        </h2>

        <img src={getNewItem.image} />

        <p>
          Title: <span>{getNewItem.name}</span>{" "}
        </p>
        <p>Description: {getNewItem.description}</p>
        <p>
          Daily price:<span> $ {getNewItem.priceDaily}</span>
        </p>

        <p>
          Weekly price:<span> $ {getNewItem.priceWeekly}</span>
        </p>
        <Link to={`/item/${getNewItem._id}`}>
          <h3>Go check your article</h3>
        </Link>
      </WrapperReservation>
    </>
  );
};

const WrapperReservation = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid var(--color-primary);
  border-radius: 4px;
  padding: 30px;
  max-width: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h2 {
    text-align: center;
    padding-bottom: 20px;
  }

  h3 {
    text-align: center;
  }

  a {
    color: var(--color-primary);
  }

  a:hover {
    color: pink;
  }
  img {
    max-width: 400px;
    margin: 0 auto;
    padding-bottom: 10px;
  }

  p {
    padding: 5px;
  }

  span {
    font-weight: 700;
  }
`;

export default ConfirmationNewItem;
