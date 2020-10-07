import React from 'react';
import {useQuery} from "../App";
import {errorToast} from '../lib/errorToast'
import Api from "../lib/api";
import Card from "react-bootstrap/Card";

interface IHorse {
    birth: string,
    breed: string,
    country: string,
    image: string,
    lear: string,
    moniker: string,
    passport: string,
    sex: string,
}

interface HorseProps {
    location: any;
}

export default class HorseView extends React.Component<HorseProps, object> {
    state: {
        passport: string | null,
        horse: IHorse,
        error: boolean,
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            passport: useQuery(this.props.location?.search).get('passport'),
            horse: {
                birth: '',
                breed: '',
                country: '',
                image: '',
                lear: '',
                moniker: '',
                passport: '',
                sex: '',
            },
            error: false,
        }
    }

    getHorse() {
        Api.getHorse(this.state.passport)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((horse) => {
                if (horse === {}) {
                    this.setState((state) => {
                        return {error: true};
                    });
                } else {
                    this.setState((state) => {
                        return {horse: horse};
                    });
                }
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    render() {
        const {horse, error} = this.state;
        if (error) {
            return errorToast();
        }
        if (horse?.country === '') {
            this.getHorse();
        }
        const {country, image, lear, moniker, birth, sex} = this.state.horse;

        return <Card className="m-3 horse-item">
            <Card.Header> {moniker}</Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={image}/>
                <Card.Text> Lear: {lear} </Card.Text>
                <Card.Text> Country: {country} </Card.Text>
                <Card.Text> Birth: {birth} </Card.Text>
                <Card.Text> Lear: {lear} </Card.Text>
                <Card.Text> Sex: {sex? 'female' : 'male'} </Card.Text>
            </Card.Body>
        </Card>
    }
}
