import { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";

import styled from "styled-components";
import { OwnerContext } from "./context/Context";

const AddItem = () => {
  const history = useHistory();
  const { markerNewItem, setMarkerNewItem } = useContext(OwnerContext);
 const {owner} = useContext(OwnerContext)
  console.log('userId', owner[1]);

  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [dailyPrice, setDailyPrice] = useState(null);
  const [weeklyPrice, setWeeklyPrice] = useState(null);
  // const [uploadImage, setUploadImage] = useState(null);

  const [newItem, setNewItem] = useState([]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleDailyPrice = (e) => {
    setDailyPrice(e.target.value);
  };
  const handleWeeklyPrice = (e) => {
    setWeeklyPrice(e.target.value);
  };
  // const handleImageUpload = (e) => {
  //   // console.log("event target for image", e.target);
  //   setUploadImage(e.target.files[0]);
  // };

  const linkToConfirmationPage = (formData) => {
    history.push("/confirmation");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //How to handle multi format form
    let image = document.getElementById("image-file").files[0];
    let formData = new FormData();

    formData.append("image", image);
    formData.append("description", description);
    formData.append("priceDaily", dailyPrice);
    formData.append("priceWeekly", weeklyPrice);
    formData.append("category", category);
    formData.append("name", title);
    formData.append("OwnerId", owner[1])
    formData.append("latitude", markerNewItem.latitude);
    formData.append("longitude", markerNewItem.longitude);

    try {
      const data = await fetch("/upload", { method: "POST", body: formData });
      const json = await data.json();
      //Set a session storage to use the data to the confirmation page
      sessionStorage.setItem("NewItem", JSON.stringify(json.data));
      linkToConfirmationPage(formData);
    } catch (error) {
      console.log("ERROR:", error.message);
    }
  };

  return (
    <Wrapper>

      <AddItemForm
        action="/upload"
        enctype="multipart/form-data"
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
      >
      <ReturnWrapper>
        <Link to="/add-location">
          <GrFormPreviousLink />
          <span> Change location</span>
        </Link>
      </ReturnWrapper>


        
        <p>Step 2: Choose a category</p>
        <select
          name="category"
          id="category"
          onChange={(e) => handleCategory(e)}
        >
          <option value="road">Road</option>
          <option value="land">Land</option>
          <option value="water">Water</option>
        </select>

        <input
          type="text"
          id="title"
          placeholder="Title"
          onChange={(e) => handleTitle(e)}
          required
        />
        <input
          type="text"
          id="description"
          placeholder="Description"
          onChange={(e) => handleDescription(e)}
          minlength="10"
          required
        />
        <input
          type="number"
          placeholder="Daily Price ($)"
          onChange={(e) => handleDailyPrice(e)}
          required
        />
        <input
          type="number"
          placeholder="Weekly Price ($)"
          onChange={(e) => handleWeeklyPrice(e)}
          required
        />
        <p>Step 3: Upload an image </p>
        <input
          type="file"
          id="image-file"
          name="image"
          // onChange={(e) => handleImageUpload(e)}
        ></input>
        <button type="submit">Add the item</button>
      </AddItemForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

const ReturnWrapper = styled.div`
display: flex;
  padding-bottom: 20px;
  span {
    padding: 10px;
  }
  a {
    color: #32cd32;
    text-decoration: none;
  }
`;

const AddItemForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
  box-shadow: 5px 15px 31px 4px #dfdfdf;
  width: 500px;
  height: 60vh;
  gap: 10px;
  p {
    font-size: 1.3rem;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  input {
    width: 250px;
    height: 40px;
    outline: none;
  }
  button {
    width: 250px;
    height: 40px;
    padding: 7px 20px;
    font-size: 1.2rem;
    border: none;
    color: white;
    background-color: blue;
    cursor: pointer;
  }
  a {
    color: #32cd32;
    text-decoration: none;
  }
`;

export default AddItem;
