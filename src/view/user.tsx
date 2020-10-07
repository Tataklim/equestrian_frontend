import React from 'react';
import {useQuery} from "../App";
import {errorToast} from '../lib/errorToast'
import Api from "../lib/api";
import Card from "react-bootstrap/Card";

interface IUser {
    country: string,
    image: string,
    name: string,
    login: string,
    sex: string,
    birth: string,
}

interface UserProps {
    location: any;
}

export default class UserView extends React.Component<UserProps, object> {
    state: {
        login: string | null,
        user: IUser,
        error: boolean,
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
                birth: '',
            },
            error: false,
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

    render() {
        const {user, error} = this.state;
        if (error) {
            return errorToast();
        }
        if (user?.country === '') {
            this.getUser();
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
                <Card.Text> Sex: {sex? 'female' : 'male'} </Card.Text>
            </Card.Body>
        </Card>
    }
}
