import React from 'react';
import {useQuery} from "../App";
import {errorToast} from '../lib/errorToast'
import Api from "../lib/api";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import HorseInList from "./horseInList";
import UserInList from "./userInList";

interface IUser {
    country: string,
    image: string,
    name: string,
    login: string
}

interface IHorse {
    country: string,
    image: string,
    lear: string,
    passport: string,
}

interface IMember {
    horse_country: string,
    horse_image: string,
    horse_lear: string,
    horse_passport: string,
    horse_moniker: string

    user_country: string,
    user_image: string,
    user_name: string,
    user_login: string
}

export default class CompetitionView extends React.Component<any, object> {
    state: {
        name: string | null,
        year: string,
        image: string,
        error: boolean,
        errorText: string,
        members: Array<IMember>,
        emptyMembers: boolean,
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            name: useQuery(this.props.location?.search).get('name'),
            year: '',
            image: '',
            error: false,
            errorText: '',
            members: [],
            emptyMembers: false,
        }
    }

    getCompetition() {
        Api.getCompetition(this.state.name)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((competition) => {
                if (competition === {}) {
                    this.setState((state) => {
                        return {error: true};
                    });
                } else {
                    this.setState((state) => {
                        return {image: competition.image, year: competition.year};
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

    getMembers() {
        console.log('getCompetitionMembers')
        Api.getCompetitionMembers(this.state.name)
            .then((response) => { // добавить обработку статусов
                // @ts-ignore
                return response.json();
            })
            .then((members) => {
                if (members.length === 0) {
                    this.setState((state) => {
                        return {emptyMembers: true};
                    });
                }
                this.setState((state) => {
                    return {members: members};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    generateTemplate(members) {
        return members.map((member, i) => {
                return <div key={i}>
                    <UserInList key={member.user_login + Math.random()} country={member.user_country} image={member.user_image}
                                 name={member.user_name} login={member.user_login}/>
                    <HorseInList key={member.horse_passport + Math.random()} country={member.horse_country} image={member.horse_image}
                                    lear={member.horse_lear} moniker={member.horse_moniker} passport={member.horse_passport}/>
                </div>
            }
        );
    }

    render() {
        const {name, year, members, emptyMembers, error, errorText, image} = this.state;
        console.log(members);

        if (error) {
            return errorToast();
        }

        if (year === '') {
            this.getCompetition();
        }

        if (!emptyMembers && members.length === 0) {
            this.getMembers();
        }

        return <Card className="m-3 competition-item">
            <Card.Header> {name}</Card.Header>
            <Card.Body>
                <Card.Img className={'competition-avatar'} variant="top" src={image}/>
                <Card.Text> Year: {year} </Card.Text>
                <Accordion>
                    <Card className={'no-border'}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                            Members
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {emptyMembers && (
                                    <div> Empty </div>
                                )}
                                {!emptyMembers && this.generateTemplate(members)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                {/*{this.state.emptyCurHorses && errorToast('')}*/}
            </Card.Body>
        </Card>
    }
}
