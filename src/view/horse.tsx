import React from 'react';
import {useQuery} from "../App";
import {
    Link
} from 'react-router-dom';

interface HorseProps {
    location: any;
}

export default class HorseView extends React.Component<HorseProps, object> {
    private id: any;
    constructor(props) {
        super(props);
        this.id = useQuery(this.props.location?.search).get('id');
    }

    render() {
        console.log(this.id);
        return <div> Horse </div>
    }
}
