import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Detector } from "react-detect-offline";

import routes from "../../config/routes";
import PrivateRoute from "./PrivateRoute";
import NetworkNotification from "../../components/NetworkNotification/NetworkNotification.component";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <>
              <Detector render={({ online }) => (!online ? <NetworkNotification /> : null)} />
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                  <Switch location={location}>
                    {routes.map(elem =>
                      elem.public === true ? (
                        <Route key={elem.path} exact {...elem} />
                      ) : (
                        <PrivateRoute key={elem.path} exact {...elem} />
                      )
                    )}
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default Router;
