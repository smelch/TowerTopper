import React, { Component } from "react";
import Dan from '../assets/icon_dan.png';
import Ernie from '../assets/icon_ernie.png';
import Mark from '../assets/icon_mark.png';

class CharacterPicker extends Component {
    constructor(props) {
        super(props);
    }

    select(value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <div>
                <CharacterOption icon={Ernie} value="ernie" picker={this} />
                <CharacterOption icon={Dan} value="dan" picker={this} />
                <CharacterOption icon={Mark} value="mark" picker={this} />
            </div>
        );
    }
}

class CharacterOption extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <img src={this.props.icon} style={{ filter: (this.props.picker.props.selectedValue === this.props.value ? "grayscale(0%)" : "grayscale(100%)") }} onClick={() => this.props.picker.select(this.props.value)} />
    }
}

export default CharacterPicker;