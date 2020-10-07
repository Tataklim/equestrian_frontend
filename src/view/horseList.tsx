import React, {useState} from 'react';
import Api from '../lib/api';
import HorseInList from './horseInList';
import {errorToast} from '../lib/errorToast'

export default class HorseListView extends React.Component {
    state: {
        horses: Array<any>,
        error: boolean,
        start: number,
        end: number,
        fetched: boolean,
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            horses: [],
            error: false,
            start: 1,
            end: 20,
            fetched: false,
        }
    }

    getHorses() {
        Api.getHorses(this.state.start, this.state.end)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((horses) => {
                this.setState((state) => {
                    return {horses: horses, error: false, fetched: true};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    generateTemplate(horse) {
        return <HorseInList key={horse.passport} country={horse.country} image={horse.image}
                            lear={horse.lear} moniker={horse.moniker} passport={horse.passport}/>
    }

    render() {
        const {error, horses, fetched} = this.state;
        if (error) {
            return errorToast();
        }

        if (!fetched) {
            this.getHorses();
        }

        if (fetched && horses.length === 0) {
            return <div className={'list-container'}>
                No horses found
            </div>;
        }

        const horseTemplates = horses.map((horse) => {
            return this.generateTemplate(horse);
        })

        return <div className={'list-container'}>
            {horseTemplates}
        </div>;
    }
}

// <HorseInList birth={horse.birth} breed={horse.breed} country={horse.country} image={horse.image}
//              lear={horse.lear} moniker={horse.moniker} passport={horse.passport}
//              passport_image={horse.passport_image} sex={horse.sex} start_owning={horse.start_owning}
//              user_login={horse.user_login}/>
