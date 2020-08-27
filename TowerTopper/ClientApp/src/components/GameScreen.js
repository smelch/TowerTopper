import React, { Component } from 'react';
import ImageLoader from './ImageLoader';
import Background from '../assets/background.png';

class GameScreen extends Component {
    imagesToLoad = {
        background: Background
    };

    constructor(props) {
        super(props);
        this.state = { imagesLoaded: false };
    }

    onImagesLoaded = (images) => {
        this.images = images;
        this.setState({ imagesLoaded: true });
        this.animationFrame = window.requestAnimationFrame(this.draw);
    }

    guestJoined = (message) => {
        this.guest = { playerId: message.playerId, userName: message.userName };
    }

    gameStateUpdate = (message) => {
        this.roomState = message;
    }

    componentDidMount = () => {
        this.props.connection.on("RoomState", this.gameStateUpdated);
        this.props.connection.on("GuestJoinedRoom", this.guestJoined);
        this.props.connection
            .send("SendRoomState", this.props.roomId)
            .catch(err => console.error(err));
    }

    componentWillUnmount = () => {
        window.cancelAnimationFrame(this.animationFrame);
    }

    draw = () => {
        var ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 800, 480);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.images.background, 0, 0, 800, 480);
        ctx.font = "16pt sans-serif"
        ctx.fillText("ROOM CODE: " + this.props.roomCode, 20, 20);

        
        if (this.guest != null)
        {
            ctx.save();
            ctx.fillStyle = (this.guest.playerId == this.props.playerId) ? "#00DD00" : "#AA6600";
            ctx.fillText(this.guest.userName, 700, 40);
            ctx.restore();
        }

        this.animationFrame = window.requestAnimationFrame(this.draw);
    }

    render() {
        if (this.state.imagesLoaded) {
            return (<canvas ref="canvas" width={800} height={480} />);
        }

        return (<ImageLoader images={this.imagesToLoad} onLoad={this.onImagesLoaded} />);
    }
}

export default GameScreen;