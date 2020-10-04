import {Route, Switch} from "react-router";
import UserView from "../view/user";
import HorseView from "../view/horse";
import HorseListView from "../view/horseList";
import React from "react";
import {
    BrowserRouter as Router,
} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import NavbarView from "../view/navbar";

export const ROUTES = [
    {
        path: "/horse",
        component: HorseView
    },
    {
        path: "/horses",
        component: HorseListView
    },
    {
        path: "/user",
        component: UserView
    },
];

export default function App() {
    return (
        <Router>
            <div>
                <NavbarView/>
                {/*<Button variant="primary">Primary</Button>{' '}*/}
                <Switch>
                    {ROUTES.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </Router>
    );
};

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}
