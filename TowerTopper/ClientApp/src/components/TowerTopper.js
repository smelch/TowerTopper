import React, { Component } from 'react';
import { Route, useParams } from 'react-router';
import { Container } from 'reactstrap';
import GameConnection from './GameConnection';
import GameJoiner from './GameJoiner';
import GameScreen from './GameScreen';

class TowerTopper extends Component {
    constructor(props) {
        super(props);
        this.state = { inRoom: false };
    }

    roomJoined = (msg) => {
        this.setState({ inRoom: true, roomCode: msg.roomCode, roomId: msg.roomId, playerId: msg.hostPlayerId });
    }

    render() {
        return (
            <GameConnection>
                {connection => {
                    if (this.state.inRoom) {
                        return (<GameScreen connection={connection} roomCode={this.state.roomCode} roomId={this.state.roomId} playerId={this.state.playerId} />);
                    }
                    return (<GameJoiner connection={connection} onJoin={this.roomJoined} />);
                }}
            </GameConnection>
        );
    }
}

function GameRoute(props) {
    //let { id } = useParams();
    return null;
    //return (<Game {...props} gameId={id} />);
}

export default TowerTopper;