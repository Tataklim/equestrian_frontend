import React from 'react';
import {Form, Card} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {errorToast} from "../lib/errorToast";
import Api from "../lib/api";

const MALE_IMAGE = 'https://img-fotki.yandex.ru/get/5100/299944781.1e/0_1237e2_e5f8a300_orig.jpg';
const FEMALE_IMAGE = 'https://zooclub.ru/attach/38000/38016.jpg';
const PASSPORT_IMAGE = 'https://kareta-petergof.ru/wp-content/uploads/2015/02/vMpNth74HA.jpg';

export default class CreateHorseView extends React.Component<any, any> {
    state: {
        passport: string,
        moniker: string,
        sex: string,
        lear: string,
        country: string,
        breed: string,
        birth: string,
        image: string,
        passport_image: string,
        login: string,

        error: boolean,
        errorText: string,
        created: boolean
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            login: '',
            passport: '',
            moniker: '',
            lear: '',
            country: '',
            breed: '',
            passport_image: PASSPORT_IMAGE,
            sex: '1',
            birth: '2018-07-22',
            image: FEMALE_IMAGE,

            error: false,
            errorText: '',
            created: false
        }
        this.setValue = this.setValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hasEmptyFields(): boolean {
        return this.state.login === '' || this.state.passport === '' || this.state.moniker === ''
            || this.state.lear === '' || this.state.country === '' || this.state.breed === '';
    }

    handleSubmit(event) {
        console.log(this.state)
        if (this.hasEmptyFields()) {
            this.setState((state) => {
                return {error: true, errorText: 'Fill all fields'};
            });
        } else {
            let {passport, moniker, sex, lear, country, breed, birth, image, passport_image, login} = this.state;
            if (sex === 'false') {
                image = MALE_IMAGE;
            }
            Api.createHorse(passport, moniker, sex, lear, country, breed, birth, image, passport_image, login).then((res) => {
                // @ts-ignore
                switch (res.status) {
                    case 201:
                        this.setState((state) => {
                            return {error: false, errorText: 'Success creation', created: true};
                        });
                        break;
                    case 409:
                        this.setState((state) => {
                            return {error: true, errorText: 'Passport duplication'};
                        });
                        break;
                    case 404:
                        this.setState((state) => {
                            return {error: true, errorText: 'No user with this login'};
                        });
                        break;
                    case 500:
                        this.setState((state) => {
                            return {error: true, errorText: 'Server error'};
                        });
                        break;
                }
            })
                .catch((error) => {
                    this.setState((state) => {
                        return {error: true, errorText: 'Server error'};
                    });
                    console.error(error);
                });
        }
    };

    setValue(event) {
        const value = event.currentTarget.value;
        const obj = {};
        obj[event.currentTarget.id] = value;
        this.setState((state) => {
            return obj;
        });
    };

    render() {
        return (
            <div className={'ml-5 mr-5 pl-5 pr-5'}>
                <Card className={'block-title'}>
                    <Card.Body>Horse creation</Card.Body>
                </Card>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="passport">
                            <Form.Label>Passport</Form.Label>
                            <Form.Control onChange={this.setValue} type="passport" placeholder="Enter passport"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="moniker">
                            <Form.Label>Moniker</Form.Label>
                            <Form.Control onChange={this.setValue} type="moniker" placeholder="Enter moniker"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control onChange={this.setValue} type="country" placeholder="Enter country"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="lear">
                            <Form.Label>Lear</Form.Label>
                            <Form.Control onChange={this.setValue} type="lear" placeholder="Enter lear"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="breed">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control onChange={this.setValue} type="breed" placeholder="Enter breed"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="login">
                            <Form.Label>Owner login</Form.Label>
                            <Form.Control onChange={this.setValue} type="login" placeholder="Enter login"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="sex">
                            <Form.Label>Choose sex</Form.Label>
                            <Form.Control
                                onChange={this.setValue}
                                as="select"
                                custom
                            >
                                <option value="true">Female</option>
                                <option value="false">Male</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="birth">
                            <Form.Label>Birth</Form.Label>
                            <input onChange={this.setValue} className={'birth-input'} type="date" name="trip-start"
                                   value="2018-07-22"
                                   min="1900-01-01" max="2020-01-01"/>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
                {this.state.error && errorToast(this.state.errorText)}
                {this.state.created && !this.state.error && errorToast(this.state.errorText, 'Success')}
            </div>
        )
    }
}
