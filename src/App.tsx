import React from 'react';

import {
    BrowserRouter as Router,
    Link,
    useLocation
} from 'react-router-dom';
import HorseView from "./view/horse";
import UserView from "./view/user";
import {ROUTE} from "./lib/consts";
import {Route, Switch} from "react-router";
import Row from 'react-bootstrap/esm/Row';
import Col from "react-bootstrap/cjs/Col";

export function useQuery(search: string = window.location.search) {
    return new URLSearchParams(search);
}

export default function App () {
    let query =  useQuery();
    return (
        <Router>
            <Row className="justify-content-md-center">
                <Col xs lg="2">
                    1 of 3
                </Col>
                <Col md="auto">Variable width content</Col>
                <Col xs lg="2">
                    3 of 3
                </Col>
            </Row>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/horse?id=12">Horse</Link>
                    </li>
                    <li>
                        <Link to="/user">User</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/user">
                        <UserView />
                    </Route>
                    {/*<Route path="/horse">*/}
                    {/*    <HorseView id={query.get('id')}/>*/}
                    {/*</Route>*/}
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}
