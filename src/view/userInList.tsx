import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
    Link
} from 'react-router-dom';

interface props {
    country: string,
    image: string,
    name: string,
    login: string,
    sex?: string,
    birth?: string,
}

export default class UserInList extends React.Component<props, any> {
    render() {
        const {country, image, name, login} = this.props;

        const opt = {};
        opt['to'] = `/user?login=${login}`;

        return <Card className="m-3 item-in-list">
            <Card.Header> {login}</Card.Header>
            <Card.Body>
                <Card.Img className={'user-avatar'} variant="top" src={image}/>
                <Card.Text> Name: {name} </Card.Text>
                <Card.Text> Country: {country} </Card.Text>

                <Button style={{padding: '0'}}
                        variant="primary">
                    <Link {...opt} className="text-decoration-none text-reset pl-4 pr-4"> Details </Link>
                </Button>

            </Card.Body>
        </Card>
    }
}
