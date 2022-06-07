import { createContext, useContext, useState } from "react";


export const ItemContext = createContext()

export const ItemProvider = ({children}) => {
    const [items, setItems] = useState();
    console.log('erer ', items);

    const [selectedItem, setSelectedItem] = useState(null);
    console.log('selected in context', selectedItem);
    

    return (
        <ItemContext.Provider
        value={{
            items,
            setItems,
            selectedItem,
            setSelectedItem,
        }}
        >

        {children}

        </ItemContext.Provider>
    )

}

// export const ItemState = () => {
//     return useContext(ItemContext)
// }