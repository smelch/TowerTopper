﻿import React, { Component } from 'react';
import ImageLoader from './ImageLoader';
import Background from '../assets/background.png';

import CharacterObject from './gameobjects/CharacterObject';

import SpriteErnieIdle from '../assets/sprite_ernie_idle.png';
import SpriteErnieToss from '../assets/sprite_ernie_toss.png';
import SpriteErnieHit from '../assets/sprite_ernie_hit.png';

import SpriteDanIdle from '../assets/sprite_dan_idle.png';
import SpriteDanToss from '../assets/sprite_dan_toss.png';
import SpriteDanHit from '../assets/sprite_dan_hit.png';

class GameScreen extends Component {
    imagesToLoad = {
        background: Background,
        spriteDanIdle: SpriteDanIdle,
        spriteDanToss: SpriteDanToss,
        spriteDanHit: SpriteDanHit,
        spriteErnieIdle: SpriteErnieIdle,
        spriteErnieToss: SpriteErnieToss,
        spriteErnieHit: SpriteErnieHit
    };

    gameObjects = [];

    constructor(props) {
        super(props);
        this.state = { imagesLoaded: false };
    }

    onImagesLoaded = (images) => {
        this.images = images;
        this.setState({ imagesLoaded: true });
        this.animationFrame = window.requestAnimationFrame(this.tick);
        
        // sprite placement variables
        this.left_sprite_x = 30;
        this.right_sprite_x = 490;
        this.sprite_y = 205;

        this.p1 = new CharacterObject(this.images.spriteErnieIdle, this.images.spriteErnieToss, this.images.spriteErnieHit)
        this.p2 = new CharacterObject(this.images.spriteDanIdle, this.images.spriteDanToss, this.images.spriteDanHit)
    }

    guestJoined = (message) => {
        this.guest = { playerId: message.playerId, userName: message.userName };
    }

    roomStateGenerated = (message) => {
        this.roomState = message;
    }

    getRoomState = () => {
        return this.roomState;
    }

    componentDidMount = () => {
        this.props.connection.on("RoomStateGenerated", this.roomStateGenerated);
        this.props.connection.on("GuestJoinedRoom", this.guestJoined);
        this.props.connection
            .send("SendRoomState", this.props.roomId)
            .catch(err => console.error(err));
    }

    componentWillUnmount = () => {
        window.cancelAnimationFrame(this.animationFrame);
    }

    toss = () => {
        this.p1.toss()

    tick = () => {
        const tickStartTime = Date.now();
        const elapsedTime = this.lastTickStart - tickStartTime;
        this.gameObjects = this.gameObjects.sort((a, b) => a.updateOrder === b.updateOrder ? 0 : (a.updateOrder > b.updateOrder ? 1 : -1));
        for (const i in this.gameObjects) {
            const gameObject = this.gameObjects[i];
            if (gameObject.updateable) {
                gameObject.update(elapsedTime);
            }
        }

        this.gameObjects = this.gameObjects.sort((a, b) => a.drawOrder === b.drawOrder ? 0 : (a.drawOrder > b.drawOrder ? 1 : -1))

        const ctx = this.refs.canvas.getContext('2d');
        for (const i in this.gameObjects) {
            const gameObject = this.gameObjects[i];
            if (gameObject.drawable) {
                gameObject.draw(elapsedTime, ctx);
            }
        }
        this.lastTickStart = tickStartTime;

        this.draw();
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
        
        this.p1.draw(ctx, this.left_sprite_x, this.sprite_y, 100, 150)
        this.p2.draw(ctx, this.right_sprite_x, this.sprite_y, 100, 150)

        this.animationFrame = window.requestAnimationFrame(this.draw);
    }

    render() {
        if (this.state.imagesLoaded) {
            return (
                <div>
                    <h2>Room Code: {this.props.roomCode}</h2>
                    <canvas ref="canvas" width={640} height={360} />
                    <h2 onClick={this.toss}>Toss it!</h2>
                </div>
            );
        }

        return (
            <ImageLoader images={this.imagesToLoad} onLoad={this.onImagesLoaded} />
        );
    }
}

export default GameScreen;