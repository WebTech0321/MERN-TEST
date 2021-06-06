import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
/* Pages */
import Home from "../pages/Home";
import Content from "../pages/Content";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/page/:id" component={Content} />
                        <Redirect exact path="/" to="/home" />
                    </Switch>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default Router;
