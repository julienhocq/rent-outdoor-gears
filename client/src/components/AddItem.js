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
  const [uploadImage, setUploadImage] = useState(null);

  const [newItem, setNewItem] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const data = await fetch("/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",

          Accept: "application/json",
        },
        body: JSON.stringify({
          category: category,
          name: title,
          description: description,
          priceDaily: dailyPrice,
          priceWeekly: weeklyPrice,
          image: uploadImage
        }),
      });
      const json = await data.json();
      console.log('json.data is', json.data);
    //   const newItem = json.data
    //   setNewItem(json.data);
    //  console.log('setNewItem', newItem);
      // setOwner(username);
      if (json.status === 201) {
        console.log("youpii");
        //   history.push("/");
      }
    } catch (error) {
      console.log("ERROR:", error.message);
    }
  };



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
  const handleImageUpload = (e) => {
    setUploadImage(e.target.files[0]);
  };


console.log('weeklyPrice', weeklyPrice);
console.log('uploadImage', uploadImage);


  return (
    <Wrapper>
      <AddItemForm
        action="/upload"
        enctype="multipart/form-data"
        method="post"
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
          placeholder="Title"
          onChange={(e) => handleTitle(e)}
          required
        />
        <input
          type="text"
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
          name="image"
          onChange={(e) => handleImageUpload(e)}
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
