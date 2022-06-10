

const ConfirmationNewItem = () => {

const getNewItem = JSON.parse(sessionStorage.getItem("NewItem"))

console.log('getNewItem', getNewItem);

console.log('getting ther?');

    return (
        <>
        <div>Confirmation</div>
        <p>{getNewItem.category}</p>
        <img src={getNewItem.image} />
        <p>{getNewItem.name}</p>
        <p>$ {getNewItem.priceDaily}</p>


        </>

    )
}


export default ConfirmationNewItem