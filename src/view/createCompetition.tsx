import React from 'react';
import {Form, Card} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {errorToast} from "../lib/errorToast";
import Api from "../lib/api";

const IMAGE = 'https://api.logotip.online/uploads/14ac691bcc514f018c8cff18e5ba48f6.jpg';

export default class CreateCompetitionView extends React.Component<any, any> {
    state: {
        name: string,
        year: string,
        image: string,
        error: boolean,
        errorText: string,
        created: boolean
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            name: '',
            year: '',
            image: IMAGE,
            error: false,
            errorText: '',
            created: false
        }
        this.setValue = this.setValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hasEmptyFields(): boolean {
        return this.state.name === '' || this.state.year === '';
    }

    handleSubmit(event) {
        if (this.hasEmptyFields()) {
            this.setState((state) => {
                return {error: true, errorText: 'Fill all fields'};
            });
        } else {
            let {name, image, year} = this.state;
            Api.createCompetition(name, year, image).then((res) => {
                // @ts-ignore
                if (res.status === 404) {
                    this.setState((state) => {
                        return {error: true, errorText: 'Name duplication'};
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
                    <Card.Body>Competition creation</Card.Body>
                </Card>
                <Form>
                    <Form.Row>

                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.setValue} type="name" placeholder="Enter competition name"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control onChange={this.setValue} type="year" placeholder="Enter year"/>
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
