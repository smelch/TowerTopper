import React, { Component } from 'react';

class GameJoiner extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            userName: "",
            roomCode: ""
        };
    }

    createRoom = () => {
        this.props.connection
            .send('CreateRoom', this.state.userName)
            .catch(err => console.error(err));
    }

    joinRoom = (gameId) => {
        this.props.connection
            .send('JoinGame', gameId)
            .catch(err => console.error(err));
    }

    roomCreated = (roomCreatedEvent) => {
        if (this.props.onJoin) {
            this.props.onJoin({ userName: this.state.userName, roomCode: roomCreatedEvent.roomCode });
        }
    };

    componentDidMount = () => {
        this.props.connection.on('RoomCreated', this.roomCreated);
    }

    componentWillUnmount = () => {
        this.props.connection.off('RoomCreated', this.roomCreated);
    }

    render() {
        return (
            <div>
                <span>User Name</span>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={e => this.setState({ userName: e.target.value })}
                />
                <span>Room Code</span>
                <input
                    type="text"
                    value={this.state.gameCode}
                    onChange={e => this.setState({ gameCode: e.target.value })}
                />
                {
                    this.state.gameCode && this.state.gameCode.length > 0
                        ? <button className="btn btn-primary" onClick={this.joinRoom}>Join Game</button>
                        : <button className="btn btn-primary" onClick={this.createRoom}>Create Game</button>
                }
            </div>
        );
    }
}

export default GameJoiner;