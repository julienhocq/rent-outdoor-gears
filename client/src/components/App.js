import { BrowserRouter, Switch, Route } from "react-router-dom";
import ItemDetails from "./ItemDetails";
import Map from "./Map";



const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
        <Map />
        </Route>
        <Route exact path="/item/:itemById">
        <ItemDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
