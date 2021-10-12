import React from "react";
import { AuthRoute } from "../util/route_util";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import RecipeShowContainer from './recipes/recipe_show_container'

import MainPage from "./main/main_page";
// import LoginFormContainer from "./session/login_form_container";
// import SignupFormContainer from "./session/signup_form_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <Route exact path='/show' component={RecipeShowContainer} />
      <AuthRoute exact path="/" component={MainPage} />
      {/* <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} /> */}
    </Switch>
  </div>
);

export default App;
