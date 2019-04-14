import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import routes from "../../config/routes";
import PrivateRoute from "../PrivateRoute";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map(elem =>
            elem.public === true ? (
              <Route key={elem.path} exact={true} {...elem} />
            ) : (
              <PrivateRoute key={elem.path} exact={true} {...elem} />
            )
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
