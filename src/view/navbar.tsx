import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/cjs/Col";
import {
    Link
} from 'react-router-dom';

export default class NavbarView extends React.Component<any, object> {
    render() {
        // Api.signUp('lolkeek123', 'fs', 'fsdfsd', true, '2018.02.18', '/lolkek.okfd');
        return <Row className="justify-content-md-center p-2 navbar">
            <Col xs lg="2">
                <Link to="/" className="text-decoration-none text-reset">Home</Link>
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
        </Row>;
    }
}
