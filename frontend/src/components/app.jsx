import React from "react";
import { AuthRoute } from "../util/route_util";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import Modal from './modal/modal';
import NavBarContainer from "./nav/navbar_container";
import RecipeShowContainer from './recipes/recipe_show_container';
import PantryShowContainer from './pantry/pantry_container';
import "./app.css";

import MainPage from "./main/main_page";

const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
    <Switch>
      <Route exact path='/recipes/:recipeId' component={RecipeShowContainer} />
      {/* <Route exact path='/pantries' component={PantryShowContainer} /> */}
      <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;
