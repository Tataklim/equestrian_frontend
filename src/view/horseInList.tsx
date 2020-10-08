import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
    Link
} from 'react-router-dom';

interface props {
    country: string,
    image: string,
    lear: string,
    moniker: string,
    passport: string,
    startOwning?: string,
    endOwning?: string
}

export default class HorseInList extends React.Component<props, any> {
    render() {
        const {country, image, lear, moniker, passport, startOwning, endOwning} = this.props;

        const opt = {};
        opt['to'] = `/horse?passport=${passport}`;

        return <Card className="m-3 item-in-list">
            <Card.Header> {moniker}</Card.Header>
            <Card.Body>
                <Card.Img className={'horse-avatar'} variant="top" src={image}/>
                <Card.Text> Lear: {lear} </Card.Text>
                <Card.Text> Country: {country} </Card.Text>

                {startOwning && (
                    <Card.Text> Start owning: {startOwning} </Card.Text>
                )}

                {endOwning && (
                    <Card.Text> End owning: {endOwning} </Card.Text>
                )}

                <Button style={{padding: '0'}}
                    variant="primary">
                    <Link {...opt} className="text-decoration-none text-reset pl-4 pr-4"> Details </Link>
                </Button>


            </Card.Body>
        </Card>
    }
}
