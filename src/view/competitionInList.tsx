import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
    Link
} from 'react-router-dom';

interface props {
    name: string,
    image: string,
    year: string
}

export default class CompetitionInList extends React.Component<props, any> {
    render() {
        const {name, image, year} = this.props;

        const opt = {};
        opt['to'] = `/competition?name=${name}`;

        return <Card className="m-3 item-in-list">
            <Card.Header> {name}</Card.Header>
            <Card.Body>
                <Card.Img className={'horse-avatar'} variant="top" src={image}/>
                <Card.Text> Year: {year} </Card.Text>

                <Button style={{padding: '0'}}
                        variant="primary">
                    <Link {...opt} className="text-decoration-none text-reset pl-4 pr-4"> Details </Link>
                </Button>


            </Card.Body>
        </Card>
    }
}
