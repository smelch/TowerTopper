import React, { Component } from 'react';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

class GameConnection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            isConnected: false
        };
    }

    componentDidMount = () => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl("https://towertopper.azurewebsites.net/gameHub")
            .configureLogging(LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .then(() => this.setState({ isConnected: true }))
                .catch(err => console.log('Error while establishing connection :('));
        });
    }

    render() {
        return this.state.isConnected ? this.props.children(this.state.hubConnection) : <div><em>Connecting...</em></div>;
    }
}

export default GameConnection;