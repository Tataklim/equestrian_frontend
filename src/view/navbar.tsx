import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/cjs/Col";
import {
    Link
} from 'react-router-dom';

export default class NavbarView extends React.Component<any, object> {
    render() {
        return <Row className="justify-content-md-center p-2 ml-2 navbar">
            <Col xs lg="2">
                <Link to="/competitions" className="text-decoration-none text-reset">Competitions</Link>
            </Col>
            <Col xs lg="2">
                <Link to="/horses" className="text-decoration-none text-reset">Horses</Link>
            </Col>
            <Col xs lg="2">
                <Link to="/users" className="text-decoration-none text-reset">Users</Link>
            </Col>
            <Col xs lg="2">
                <Link to="/create/horse" className="text-decoration-none text-reset">Create horse</Link>
            </Col>
            <Col xs lg="2">
                <Link to="/create/user" className="text-decoration-none text-reset">Create user</Link>
            </Col>
            <Col xs lg="2">
                <Link to="/create/competition" className="text-decoration-none text-reset">Create competition</Link>
            </Col>
        </Row>;
    }
}
