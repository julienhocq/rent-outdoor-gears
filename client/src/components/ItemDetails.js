import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import styled from "styled-components";
import { ItemContext } from "./context/Context";


const ItemDetails = () => {
    const [item, setItem] = useState([]);

    const {itemById} = useParams()

    const {selectedItem, setSelectedItem} = useContext(ItemContext)
    console.log('selectedItem IS', selectedItem);

  // fetching product info by itemId
useEffect(() =>{
    const fetchProduct = async () => {
        const data = await fetch (`/api/item/${itemById}`)
        console.log('data',data);
        const json = await data.json()
        setItem(json.data);

    } 
    fetchProduct()
}, [itemById])

console.log('item IS', item);


    return (
<>
        <Img src={item.image} />
        <p>{item.name}</p>
        <p>{item.description}</p>
        <p>$ {item.priceDaily}</p>
        <Link to="/checkout">
        <button>BOOK THIS ITEM</button>
        </Link>
        </>
    )
}

const Img = styled.img`
max-width: 600px;
`

export default ItemDetails