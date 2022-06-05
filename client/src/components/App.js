import { BrowserRouter, Switch, Route } from "react-router-dom";
import Map from "./Map";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
        <Map />
        </Route>
        <Route exact path=""></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
