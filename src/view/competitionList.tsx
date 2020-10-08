import React, {useState} from 'react';
import Api from '../lib/api';
import {errorToast} from '../lib/errorToast'
import CompetitionInList from "./competitionInList";

export default class CompetitionListView extends React.Component {
    state: {
        competitions: Array<any>,
        error: boolean,
        start: number,
        end: number,
        fetched: boolean,
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            competitions: [],
            error: false,
            start: 1,
            end: 20,
            fetched: false,
        }
    }

    getCompetitions() {
        Api.getCompetitionList(this.state.start, this.state.end)
            .then((response) => {
                // @ts-ignore
                return response.json();
            })
            .then((competitions) => {
                this.setState((state) => {
                    return {competitions: competitions, error: false, fetched: true};
                });
            })
            .catch((error) => {
                this.setState((state) => {
                    return {error: true};
                });
                console.error(error);
            });
    }

    generateTemplate(competition) {
        return <CompetitionInList key={competition.name} name={competition.name} image={competition.image}
                            year={competition.year}/>
    }

    render() {
        const {error, competitions, fetched} = this.state;
        if (error) {
            return errorToast();
        }

        if (!fetched) {
            this.getCompetitions();
        }

        if (fetched && competitions.length === 0) {
            return <div className={'list-container'}>
                No horses found
            </div>;
        }

        const competitionsTemplates = competitions.map((horse) => {
            return this.generateTemplate(horse);
        })

        return <div className={'list-container'}>
            {competitionsTemplates}
        </div>;
    }
}

// <HorseInList birth={horse.birth} breed={horse.breed} country={horse.country} image={horse.image}
//              lear={horse.lear} moniker={horse.moniker} passport={horse.passport}
//              passport_image={horse.passport_image} sex={horse.sex} start_owning={horse.start_owning}
//              user_login={horse.user_login}/>
