import React, { Component } from 'react';
var Background = require('../assets/background.png');

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { imagesLoaded: false };
        this.loaded = false;
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
        this.loadImages();
        this.animationFrame = window.requestAnimationFrame(this.draw);
    }

    loadImages = () => {
        this.loadedImages = 0;
        this.images = {
            background: this.loadImage(Background)
        };
    }

    loadImage = () => {
        const img = new Image();
        img.onload = this.imageLoaded;
        img.src = Background;
        return img;
    }

    imageLoaded = () => {
        this.loadedImages++;
        if (this.loadedImages == Object.keys(this.images).length) {
            this.loaded = true;
        }
    }

    componentWillUnmount = () => {
        this.props.connection.off('RoomCreated', this.roomCreated);
        window.cancelAnimationFrame(this.animationFrame);
    }

    draw = () => {
        var ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 800, 480);
        ctx.imageSmoothingEnabled = false;
        if (this.loaded) {
            ctx.drawImage(this.images.background, 0, 0, 800, 480);
        } else {
            ctx.fillText("Loading images: " + this.loadedImages + "/" + Object.keys(this.images).length, 10, 10);
        }

        this.animationFrame = window.requestAnimationFrame(this.draw);
    }

    render() {
        return (
            <canvas ref="canvas" width={800} height={480} />
        );
    }
}

export default GameScreen;