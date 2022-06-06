import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";


const ItemDetails = () => {
    const [item, setItem] = useState([]);

    const {itemById} = useParams()


  // fetching product info by itemId
useEffect(() =>{
    const fetchProduct = async () => {
        const data = await fetch (`/api/item/${itemById}`)
        const json = await data.json()
        setItem(json.data);

    } 
    fetchProduct()
}, [itemById])

console.log('', item);


    return (
<>
        <Img src={item.image} />
        <p>{item.name}</p>
        <p>{item.description}</p>
        <p>$ {item.priceDaily}</p>

        </>
    )
}

const Img = styled.img`
max-width: 600px;
`

export default ItemDetails