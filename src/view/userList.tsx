import React from 'react';
import Api from '../lib/api';
import UserInList from './userInList';
import {errorToast} from '../lib/errorToast'

export default class UserListView extends React.Component {
    state: {
        users: Array<any>,
        error: boolean,
        start: number,
        end: number,
        fetched: boolean,
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            users: [],
            error: false,
            start: 1,
            end: 20,
            fetched: false,
        }
    }

    getUsers() {
        Api.getUsers(this.state.start, this.state.end)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((users) => {
                this.setState((state) => {
                    return {users: users, error: false, fetched: true};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    generateTemplate(users) {
        return <UserInList key={users.login} country={users.country} login={users.login} image={users.image}
                            name={users.name} sex={users.sex}/>
    }

    render() {
        const {error, users, fetched} = this.state;
        if (error) {
            return errorToast();
        }

        if (!fetched) {
            this.getUsers();
        }

        if (fetched && users.length === 0) {
            return <div className={'list-container'}>
                No users found
            </div>;
        }

        const userTemplates = users.map((user) => {
            return this.generateTemplate(user);
        })

        return <div className={'list-container'}>
            {userTemplates}
        </div>;
    }
}
