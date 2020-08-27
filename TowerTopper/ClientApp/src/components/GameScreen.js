import React, { Component } from 'react';
import ImageLoader from './ImageLoader';
import Background from '../assets/background.png';
import SpriteDan from '../assets/sprite_dan.png';
import SpriteErnie from '../assets/sprite_ernie_idle.png';

class GameScreen extends Component {
    imagesToLoad = {
        background: Background,
        spritedan: SpriteDan,
        spriteernie: SpriteErnie
    };

    constructor(props) {
        super(props);
        this.state = { imagesLoaded: false };
    }

    onImagesLoaded = (images) => {
        this.images = images;
        this.setState({ imagesLoaded: true });
        this.animationFrame = window.requestAnimationFrame(this.draw);
        
        this.left_sprite_x = 30;
        this.right_sprite_x = 490;
        this.sprite_y = 205;
        this.frame_tick = 0;
        this.frame_tick_small = 0;
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
        ctx.clearRect(0, 0, 640, 360);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.images.background, 0, 0, 640, 360);

        ctx.font = "16pt sans-serif"
        ctx.fillText("ROOM CODE: " + this.props.roomCode, 20, 20);
        
        if (this.guest != null)
        {
            ctx.save();
            ctx.fillStyle = (this.guest.playerId == this.props.playerId) ? "#00DD00" : "#AA6600";
            ctx.fillText(this.guest.userName, 500, 40);
            ctx.restore();
        }
        
        ctx.drawImage(this.images.spritedan, (200 * this.frame_tick), 0, 200, 300, this.left_sprite_x, this.sprite_y, 100, 150);

        ctx.drawImage(this.images.spriteernie, (200 * this.frame_tick), 0, 200, 300, this.right_sprite_x, this.sprite_y, 100, 150);

        // sets the fps
        this.frame_tick_small = (this.frame_tick_small + 1) % 10;

        // update on fps tick
        if (this.frame_tick_small == 9) {
            this.frame_tick = (this.frame_tick + 1) % 8;
        };

        this.animationFrame = window.requestAnimationFrame(this.draw);
    }

    render() {
        if (this.state.imagesLoaded) {
            return (
                <div>
                    <h2>Room Code: {this.props.roomCode}</h2>
                    <canvas ref="canvas" width={640} height={360} />
                </div>
            );
        }

        return (
            <ImageLoader images={this.imagesToLoad} onLoad={this.onImagesLoaded} />
        );
    }
}

export default GameScreen;