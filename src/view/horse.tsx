import React from 'react';
import {useQuery} from "../App";
import {errorToast} from '../lib/errorToast'
import Api from "../lib/api";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import UserInList from "./userInList";
import HorseInList from "./horseInList";
import {Button, Form} from "react-bootstrap";

const RELOAD_TIMEOUT = 1500;

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

interface iUser {
    user_login: string,
    start_owning: string,
    end_owning?: string,
    name: string,
    country: string,
    image: string,
    sex?: string
}

interface HorseProps {
    location: any;
}

export default class HorseView extends React.Component<HorseProps, object> {
    state: {
        passport: string | null,
        horse: IHorse,
        error: boolean,
        owner: iUser,
        pastOwners: Array<iUser>,
        training: Array<iUser>,
        created: boolean,
        errorText: string
        emptyPastOwners: boolean,
        newOwner: string,
        newTraining: string,
        emptyTraining: boolean
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
                sex: ''
            },
            error: false,
            errorText: '',
            owner: {
                user_login: '',
                start_owning: '',
                name: '',
                country: '',
                image: '',
                sex: '',
            },
            pastOwners: [],
            training: [],
            created: false,
            emptyPastOwners: false,
            newOwner: '',
            newTraining: '',
            emptyTraining: false
        }
        this.setValue = this.setValue.bind(this);
        this.handleSubmitOwning = this.handleSubmitOwning.bind(this);
        this.handleSubmitTraining = this.handleSubmitTraining.bind(this);
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

    getOwner() {
        Api.getOwner(this.state.passport)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((owner) => {
                this.setState((state) => {
                    return {owner: owner};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    getPastOwners() {
        Api.getPastOwners(this.state.passport)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((owners) => {
                if (owners.length === 0) {
                    this.setState((state) => {
                        return {emptyPastOwners: true};
                    });
                }
                this.setState((state) => {
                    return {pastOwners: owners};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    getTraining() {
        Api.getTrainingForHorse(this.state.passport)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((users) => {
                if (users.length === 0) {
                    this.setState((state) => {
                        return {emptyTraining: true};
                    });
                }
                this.setState((state) => {
                    return {training: users};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    generateOwnersTemplate(owners) {
        return owners.map((owner) => {
            return <UserInList key={owner.user_login + Math.random()} country={owner.country} image={owner.image}
                               login={owner.user_login} name={owner.name} startOwning={owner.start_owning}
                               endOwning={owner.end_owning}/>
        });
    }

    generateTrainsTemplate(trains) {
        return trains.map((user) => {
            return <UserInList key={user.user_login + Math.random()} country={user.country} image={user.image}
                               login={user.user_login} name={user.name}/>
        });
    }

    setValue(event) {
        const value = event.currentTarget.value;
        const obj = {};
        obj[event.currentTarget.id] = value;
        this.setState((state) => {
            return obj;
        });
    };

    handleSubmitOwning(event) {
        Api.setOwning(this.state.newOwner, this.state.passport).then((res) => {
            // @ts-ignore
            if (res.status === 409) {
                this.setState((state) => {
                    return {error: true, errorText: 'Server error'};
                });
            } else {
                setTimeout(() => window.location.reload(false), RELOAD_TIMEOUT);
                this.setState((state) => {
                    return {
                        error: false,
                        errorText: 'Success creation',
                        created: true,
                        owner: {
                            user_login: '',
                            start_owning: '',
                            name: '',
                            country: '',
                            image: '',
                            sex: '',
                        },
                        emptyPastOwners: false,
                        pastOwners: []
                    };
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

    handleSubmitTraining(event) {
        Api.setTraining(this.state.newTraining, this.state.passport).then((res) => {
            // @ts-ignore
            if (res.status === 409) {
                this.setState((state) => {
                    return {error: true, errorText: 'Already trains'};
                });
            } else {
                setTimeout(() => window.location.reload(false), RELOAD_TIMEOUT);
                this.setState((state) => {
                    return {
                        error: false,
                        errorText: 'Success creation',
                        created: true,
                        owner: {
                            user_login: '',
                            start_owning: '',
                            name: '',
                            country: '',
                            image: '',
                            sex: '',
                        },
                        emptyPastOwners: false,
                        pastOwners: []
                    };
                });
            }
        })
    }

    render() {
        const {horse, owner} = this.state;

        if (horse?.country === '') {
            this.getHorse();
        }

        if (owner?.country === '') {
            this.getOwner()
        }

        if (!this.state.emptyPastOwners && this.state.pastOwners.length === 0) {
            this.getPastOwners();
        }

        if (!this.state.emptyTraining && this.state.training.length === 0) {
            this.getTraining();
        }

        const {country, image, lear, moniker, birth, sex} = this.state.horse;

        return <div>
            <Card className="m-3 horse-item">
                <Card.Header> {moniker}</Card.Header>
                <Card.Body>
                    <Card.Img className={'horse-avatar-big'} variant="top" src={image}/>
                    <Card.Text> Lear: {lear} </Card.Text>
                    <Card.Text> Country: {country} </Card.Text>
                    <Card.Text> Birth: {birth} </Card.Text>
                    <Card.Text> Sex: {sex ? 'female' : 'male'} </Card.Text>

                    <Accordion>
                        <Card className={'no-border'}>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                Current owner
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <UserInList key={owner.user_login + Math.random()} login={owner.user_login}
                                                name={owner.name}
                                                country={owner.country} image={owner.image} sex={owner.sex}
                                                startOwning={owner.start_owning}/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        <Card className={'no-border'}>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                                Past owners
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Card.Body>
                                        {this.state.emptyPastOwners && (
                                            <div> Empty </div>
                                        )}
                                        {!this.state.emptyPastOwners && this.generateOwnersTemplate(this.state.pastOwners)}
                                    </Card.Body>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        <Card className={'no-border'}>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                                Add owning
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="newOwner">
                                            <Form.Label>Login</Form.Label>
                                            <Form.Control onChange={this.setValue} type="login"
                                                          placeholder="Enter login"/>
                                        </Form.Group>
                                        <Button variant="primary" onClick={this.handleSubmitOwning}>
                                            Add
                                        </Button>
                                    </Form>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        <Card className={'no-border'}>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                                Trainings
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <Card.Body>
                                        {this.state.emptyTraining && (
                                            <div> Empty </div>
                                        )}
                                        {!this.state.emptyTraining && this.generateTrainsTemplate(this.state.training)}
                                    </Card.Body>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        <Card className={'no-border'}>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
                                Add training
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="newTraining">
                                            <Form.Label>Login</Form.Label>
                                            <Form.Control onChange={this.setValue} type="login"
                                                          placeholder="Enter login"/>
                                        </Form.Group>
                                        <Button variant="primary" onClick={this.handleSubmitTraining}>
                                            Add
                                        </Button>
                                    </Form>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>




                    </Accordion>
                </Card.Body>

            </Card>
            {this.state.error && errorToast(this.state.errorText)}
            {this.state.created && errorToast(this.state.errorText, 'Success')}
        </div>
    }
}
