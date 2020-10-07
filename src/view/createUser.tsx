import React from 'react';
import {Form, Card} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {errorToast} from "../lib/errorToast";
import Api from "../lib/api";

const MALE_IMAGE = 'https://previews.123rf.com/images/rrraven/rrraven1603/rrraven160300074/54088453-vector-black-chef-with-hat-and-hot-plate-on-white-background.jpg';
const FEMALE_IMAGE = 'https://previews.123rf.com/images/sparkstudio/sparkstudio1208/sparkstudio120802073/14918385-uma-vers%C3%A3o-preto-e-branca-de-um-desenho-animado-vintage-de-uma-mulher-segurando-uma-torta-quente.jpg';

export default class CreateUserView extends React.Component<any, any> {
    state: {
        login: string,
        name: string,
        country: string,
        sex: string,
        birth: string,
        image: string,
        error: boolean,
        errorText: string,
        created: boolean
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            login: '',
            name: '',
            country: '',
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
        return this.state.login === '' || this.state.name === '' || this.state.country === '';
    }

    handleSubmit(event) {
        if (this.hasEmptyFields()) {
            this.setState((state) => {
                return {error: true, errorText: 'Fill all fields'};
            });
        } else {
            let {login, name, country, birth, sex, image} = this.state;
            if (sex === 'false') {
                image = MALE_IMAGE;
            }
            Api.signUp(login, name, country, sex, birth, image).then((res) => {
                // @ts-ignore
                if (res.status === 409) {
                    this.setState((state) => {
                        return {error: true, errorText: 'Login duplication'};
                    });
                } else {
                    this.setState((state) => {
                        return {error: false, errorText: 'Success creation', created: true};
                    });
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
                    <Card.Body>User creation</Card.Body>
                </Card>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="login">
                            <Form.Label>Login</Form.Label>
                            <Form.Control onChange={this.setValue} type="login" placeholder="Enter login"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.setValue} type="name" placeholder="Enter name"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control onChange={this.setValue} type="country" placeholder="Enter country"/>
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
                            <input onChange={this.setValue}  className={'birth-input'} type="date" name="trip-start"
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
