import React from 'react';
import Api from '../lib/api';
import HorseInList from './horseInList';

export default class HorseListView extends React.Component {
    state: {
        horses: Array<any>
    }

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            horses: [],
        }
    }

    getHorses() {
        Api.getUserHorses('dimochka')
            .then((response) => {
                // @ts-ignore
                return response.json();
            }).then((horses) => {
            // @ts-ignore
            const horseItems = horses.map((horse, index) =>
                <HorseInList key={index} country={horse.country} image={horse.image}
                             lear={horse.lear} moniker={horse.moniker}/>
            );
            this.setState((state) => {
                return {horses: horseItems};
            });
        })
    }

    render() {
        if (this.state.horses.length === 0) {
            this.getHorses();
        }
        return <div>
            {this.state.horses}
        </div>;
    }
}

// <HorseInList birth={horse.birth} breed={horse.breed} country={horse.country} image={horse.image}
//              lear={horse.lear} moniker={horse.moniker} passport={horse.passport}
//              passport_image={horse.passport_image} sex={horse.sex} start_owning={horse.start_owning}
//              user_login={horse.user_login}/>
