import {Route, Switch} from 'react-router';
import UserView from '../view/user';
import HorseView from '../view/horse';
import HorseListView from '../view/horseList';
import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

import NavbarView from '../view/navbar';
import UserList from '../view/userList';
import CreateHorseView from '../view/createHorse';
import CreateUserView from '../view/createUser';
import CreateCompetitionView from "../view/createCompetition";
import CompetitionView from "../view/competition";
import CompetitionListView from "../view/competitionList";

export const ROUTES = [
    {
        path: '/horse',
        component: HorseView
    },
    {
        path: '/horses',
        component: HorseListView
    },
    {
        path: '/users',
        component: UserList
    },
    {
        path: '/user',
        component: UserView
    },
    {
        path: '/create/horse',
        component: CreateHorseView
    },
    {
        path: '/create/user',
        component: CreateUserView
    },
    {
        path: '/create/competition',
        component: CreateCompetitionView
    },
    {
        path: '/competition',
        component: CompetitionView
    },
    {
        path: '/competitions',
        component: CompetitionListView
    },
];

export default function App() {
    return (
        <Router>
            <div>
                <NavbarView/>
                <div className={'main-content'}>
                    <Switch>
                        {ROUTES.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
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
