import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddItem from "./AddItem";
import Checkout from "./Checkout";
import Header from "./Header";
// import { ItemState } from "./context/Context";
import ItemDetails from "./ItemDetails";
import Login from "./Login";
import MainMap from "./Map";
import OwnerHome from "./OwnerHome";
import SignUp from "./SignUp";
import Geocoder from "./GeoLocalisation";
import ConfirmationNewItem from "./ConfirmationAddItem";
import GlobalStyles from "./GlobalStyles";



const App = () => {
  return (
    <BrowserRouter>
    <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <MainMap />
        </Route>
        <Route exact path="/item/:itemById">
          <ItemDetails />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>

        <Route exact path="/profile/:profileById">
          <OwnerHome />
        </Route>

        <Route exact path="/add-item">
          <AddItem />
        </Route>
        <Route exact path="/add-location">
          <Geocoder />

        </Route>
        <Route exact path="/confirmation">
          <ConfirmationNewItem />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
};

export default App;
