import React from 'react';
import {useQuery} from "../App";
import {errorToast} from '../lib/errorToast'
import Api from "../lib/api";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import HorseInList from "./horseInList";

interface IUser {
    country: string,
    image: string,
    name: string,
    login: string,
    sex: string,
    birth: string
}

interface IHorse {
    country: string,
    image: string,
    lear: string,
    moniker: string,
    passport: string,
    start_owning: string,
    end_owning?: string,
}

interface UserProps {
    location: any;
}

export default class UserView extends React.Component<UserProps, object> {
    state: {
        login: string | null,
        user: IUser,
        error: boolean,
        errorText: string,
        curHorses: Array<IHorse>,
        pastHorses: Array<IHorse>,
        emptyPastHorses: boolean
        emptyCurHorses: boolean
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            login: useQuery(this.props.location?.search).get('login'),
            user: {
                country: '',
                image: '',
                name: '',
                login: '',
                sex: '',
                birth: ''
            },
            error: false,
            errorText: '',
            curHorses: [],
            pastHorses: [],
            emptyCurHorses: false,
            emptyPastHorses: false
        }
    }

    getUser() {
        Api.getUser(this.state.login)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((user) => {
                if (user === {}) {
                    this.setState((state) => {
                        return {error: true};
                    });
                } else {
                    this.setState((state) => {
                        return {user: user};
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

    getCurrentHorses() {
        // @ts-ignore
        Api.getUserHorses(this.state.login)
            .then((response) => { // добавить обработку статусов
                // @ts-ignore
                return response.json();
            })
            .then((horses) => {
                if (horses.length === 0) {
                    this.setState((state) => {
                        return {emptyCurHorses: true};
                    });
                }
                this.setState((state) => {
                    return {curHorses: horses};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    getPastHorses() {
        // @ts-ignore
        Api.getUserHorsesPast(this.state.login)
            .then((response) => { // добавить обработку статусов
                // @ts-ignore
                return response.json();
            })
            .then((horses) => {
                if (horses.length === 0) {
                    this.setState((state) => {
                        return {emptyPastHorses: true};
                    });
                }
                this.setState((state) => {
                    return {pastHorses: horses};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    generateHorseTemplate(horses) {
        return horses.map((horse) => {
            if (horse.end_owning) {
                return <HorseInList key={horse.passport + Math.random()} country={horse.country} image={horse.image} endOwning={horse.end_owning}
                                    lear={horse.lear} moniker={horse.moniker} passport={horse.passport} startOwning={horse.start_owning}/>
            }
            return <HorseInList key={horse.passport + Math.random()} country={horse.country} image={horse.image}
                                lear={horse.lear} moniker={horse.moniker} passport={horse.passport} startOwning={horse.start_owning}/>
        });
    }

    render() {

        const {user, error} = this.state;
        if (error) {
            return errorToast();
        }

        if (user?.country === '') {
            this.getUser();
        }

        if (!this.state.emptyCurHorses && this.state.curHorses.length === 0) {
            this.getCurrentHorses();
        }

        if (!this.state.emptyPastHorses && this.state.pastHorses.length === 0) {
            this.getPastHorses();
        }
        const {login} = this.state;
        const {country, image, name, birth, sex} = this.state.user;

        return <Card className="m-3 horse-item">
            <Card.Header> {login}</Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={image}/>
                <Card.Text> Name: {name} </Card.Text>
                <Card.Text> Country: {country} </Card.Text>
                <Card.Text> Birth: {birth} </Card.Text>
                <Card.Text> Sex: {sex ? 'female' : 'male'} </Card.Text>
                <Accordion>
                    <Card className={'no-border'}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                            Current horses
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {this.state.emptyCurHorses && (
                                    <div> Empty </div>
                                )}
                                {!this.state.emptyCurHorses && this.generateHorseTemplate(this.state.curHorses)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card className={'no-border'}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                            Past horses
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {this.state.emptyPastHorses && (
                                    <div> Empty </div>
                                )}
                                {!this.state.emptyPastHorses && this.generateHorseTemplate(this.state.pastHorses)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                {/*{this.state.emptyCurHorses && errorToast('')}*/}
            </Card.Body>
        </Card>
    }
}
