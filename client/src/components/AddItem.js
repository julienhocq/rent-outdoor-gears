import { useState } from "react";
import styled from "styled-components";

const AddItem = () => {
  // Fetch - POST to create NEW ITEM
  // NEED to keep the data in a state

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    // Nick'solution to convert to a string
    // const reader = new FileReader();
    // reader.addEventListener("loadend", function() {
    //   const view = new Int8Array(reader.result);
    //   const bin = [...view].map((n) => n.toString(16).padStart(2, "0")).join("");
    //   const b64 = btoa(bin)
    //   console.log(bin)
    //   console.log(b64)
    // });
    // reader.readAsArrayBuffer(uploadImage);

    let image = document.getElementById("image-file").files[0];
    let formData = new FormData();

    formData.append("image", image);
    formData.append("description", description);
    formData.append("priceDaily", dailyPrice);
    formData.append("priceWeekly", weeklyPrice);
    formData.append("category", category);
    console.log('category', category);


    formData.append("name", title);

    try {
      await fetch("/upload", { method: "POST", body: formData });
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
        <p>Choose a category</p>
        <select
          name="category"
          id="category"
          onChange={(e) => handleCategory(e)}
        >
          <option value="camping">Camping</option>
          <option value="bike">Bike</option>
          <option value="Surf">Surf</option>
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
        <input
          type="file"
          id="image-file"
          name="image"
          // onChange={(e) => handleImageUpload(e)}
        ></input>
        <button type="submit">Upload</button>
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

const AddItemForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
  box-shadow: 5px 15px 31px 4px #dfdfdf;
  width: 500px;
  height: 50vh;
  gap: 10px;
  p {
    font-size: 1.3rem;
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
