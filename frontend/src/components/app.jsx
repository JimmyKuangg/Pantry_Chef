import React from "react";
import { AuthRoute } from "../util/route_util";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import Modal from './modal/modal';
import Sidemenu from './sidemenu/sidemenu';
import NavBarContainer from "./nav/navbar_container";
import RecipeShowContainer from './recipes/recipe_show_container';
import PantryShowContainer from './pantry/pantry_container';
import RecipeIndexContainer from "./recipes/recipe_index_container";
import "./app.css";

import MainPage from "./main/main_page";
import MeetTheTeam from "./meet_the_team/meet_the_team";

const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
    <Sidemenu />
    <Switch>
      <Route exact path='/recipes/:recipeId' component={RecipeShowContainer} />
      <Route exact path='/recipes/' component={RecipeIndexContainer} />
      <Route exact path='/meet-the-team' component={MeetTheTeam}/>
      <Route exact path='/pantries' component={PantryShowContainer} />
      <Route exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;
