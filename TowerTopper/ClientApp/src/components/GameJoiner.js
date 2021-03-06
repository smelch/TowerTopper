﻿import React, { Component } from 'react';
import title from '../assets/title.png'
import CharacterPicker from './CharacterPicker';

class GameJoiner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            roomCode: "",
            selectedCharacter: "ernie"
        };
    }

    createRoom = () => {
        this.props.connection
            .send('CreateRoom', this.state.userName, this.state.selectedCharacter)
            .catch(err => console.error(err));
    }

    joinRoom = () => {
        this.props.connection
            .send('JoinRoom', this.state.userName, this.state.roomCode, this.state.selectedCharacter)
            .catch(err => console.error(err));
    }

    roomCreated = (roomCreatedEvent) => {
        if (this.props.onJoin) {
            this.props.onJoin({ userName: this.state.userName, roomCode: roomCreatedEvent.roomCode, roomId: roomCreatedEvent.roomId, playerId: roomCreatedEvent.playerId });
        }
    };

    guestJoined = (guestJoined) => {
        if (this.props.onJoin) {
            this.props.onJoin({ userName: this.state.userName, roomCode: this.state.roomCode, roomId: guestJoined.roomId, playerId: guestJoined.playerId });
        }
    };

    componentDidMount = () => {
        this.props.connection.on('RoomCreated', this.roomCreated);
        this.props.connection.on("GuestJoinedRoom", this.guestJoined);
    }

    componentWillUnmount = () => {
        this.props.connection.off('RoomCreated', this.roomCreated);
        this.props.connection.off('GuestJoinedRoom', this.guestJoined);
    }

    render() {
        return (
            <div id="login-wrapper">
                <img id="titleImg" src={title}></img>
                <div id="login">
                    <div id="player-selection">
                        <input
                            type="text"
                            placeholder="User Name"
                            value={this.state.userName}
                            onChange={e => this.setState({ userName: e.target.value })}
                        />
                    </div>
                    <CharacterPicker selectedValue={this.state.selectedCharacter} onChange={c => this.setState({ selectedCharacter: c })} />
                    <div>
                        <button className="btn btn-primary" onClick={this.createRoom}>Create Game</button>
                    </div>
                    <div>
                        <span><strong> - OR - </strong></span>
                    </div>
                    <div>
                        <input id="roomCode"
                            type="text"
                            placeholder="Room Code"
                            value={this.state.roomCode}
                            onChange={e => this.setState({ roomCode: e.target.value.toUpperCase() })}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={this.joinRoom}>Join Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameJoiner;