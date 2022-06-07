import { BrowserRouter, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Header from "./Header";
// import { ItemState } from "./context/Context";
import ItemDetails from "./ItemDetails";
import Login from "./Login";
import Map from "./Map";


const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Switch>
        <Route exact path="/">
          <Map />
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

      </Switch>
    </BrowserRouter>
  );
};

export default App;
