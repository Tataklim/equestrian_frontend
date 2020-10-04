import React from "react";

interface props {
    country: string,
    image: string,
    lear: string,
    moniker: string,
}

export default class HorseInList extends React.Component<props, any> {
    render() {
        const {country, image, lear, moniker} = this.props;
        return <div>
            <div> {country}</div>
            <div> {image}</div>
            <div> {lear}</div>
            <div> {moniker}</div>
        </div>;
    }
}
