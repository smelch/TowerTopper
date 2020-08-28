import React, { Component } from 'react';
import ImageLoader from './ImageLoader';
import Background from '../assets/background.png';

import CharacterObject from './gameobjects/CharacterObject';

import SpriteErnieIdle from '../assets/sprite_ernie_idle.png';
import SpriteErnieToss from '../assets/sprite_ernie_toss.png';
import SpriteErnieHit from '../assets/sprite_ernie_hit.png';

import SpriteDanIdle from '../assets/sprite_dan_idle.png';
import SpriteDanToss from '../assets/sprite_dan_toss.png';
import SpriteDanHit from '../assets/sprite_dan_hit.png';

import BackgroundMusic from '../assets/music/mus_ingame.ogg';

import ErnieThrow2 from '../assets/sounds/eff_ernie_throw_2.ogg';

import GameHeader from './gameobjects/GameHeader';
import Car from './gameobjects/CarObject';
import { Point } from './gameobjects/Coordinates';
import { CollisionSystem } from './gameobjects/Collider';

class GameScreen extends Component {
    imagesToLoad = {
        ...{
            background: Background,
            spriteDanIdle: SpriteDanIdle,
            spriteDanToss: SpriteDanToss,
            spriteDanHit: SpriteDanHit,
            spriteErnieIdle: SpriteErnieIdle,
            spriteErnieToss: SpriteErnieToss,
            spriteErnieHit: SpriteErnieHit
        }, ...Car.GetImagesList()
    };

    audioToLoad = {
        ernie: {
            taunts: [],
            throws: [ErnieThrow2]
        }
    };

    musicToLoad = {
        background: BackgroundMusic
    };

    gameObjects = [];

    constructor(props) {
        super(props);
        this.state = { imagesLoaded: false };
    }

    assetsLoaded = (images, sounds, music) => {
        this.images = images;
        this.music = music;

        this.music.background.volume = 0.1;
        this.music.background.loop = true;
        this.music.background.play();
        Car.SetImagesList(images);
        CharacterObject.SetSoundList(sounds);
        this.setState({ imagesLoaded: true });
        this.lastTickStart = Date.now();
        this.animationFrame = window.requestAnimationFrame(this.tick);
        
        // sprite placement variables
        this.left_sprite_x = 30;
        this.right_sprite_x = 490;
        this.sprite_y = 205;

        this.p1 = new CharacterObject(this, this.images.spriteErnieIdle, this.images.spriteErnieToss, this.images.spriteErnieHit, new Point(30, 205));
        this.p2 = new CharacterObject(this, this.images.spriteDanIdle, this.images.spriteDanToss, this.images.spriteDanHit, new Point(490, 205));
    }

    guestJoined = (message) => {
        console.log(message);
        this.roomState.guest = message;
    }

    roomStateGenerated = (message) => {
        console.log(message);
        this.roomState = message;
    }

    getRoomState = () => {
        return this.roomState;
    }

    addGameObject = (object) => {
        this.gameObjects.push(object);
    }

    removeGameObject = (object) => {
        const index = this.gameObjects.indexOf(object);
        if (index != -1) {
            //this.gameObjects = this.gameObjects.splice(index, 1);
            this.gameObjects.splice(index, 1);
        }
        object.destroy()
    }

    componentDidMount = () => {
        this.gameObjects.push(new GameHeader({ position: { x: 0, y: 0 }, stateSource: this }));

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
        this.p1.toss();
    }

    tick = () => {
        const tickStartTime = Date.now();
        const elapsedTime = tickStartTime - this.lastTickStart;
        this.gameObjects = this.gameObjects.sort((a, b) => a.updateOrder === b.updateOrder ? 0 : (a.updateOrder > b.updateOrder ? 1 : -1));
        for (const i in this.gameObjects) {
            const gameObject = this.gameObjects[i];
            if (gameObject.updateable) {
                gameObject.update(elapsedTime);
            }
        }

        CollisionSystem.checkCollisions();

        this.gameObjects = this.gameObjects.sort((a, b) => a.drawOrder === b.drawOrder ? 0 : (a.drawOrder > b.drawOrder ? 1 : -1))
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 640, 360);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.images.background, 0, 0, 640, 360);

        for (const i in this.gameObjects) {
            const gameObject = this.gameObjects[i];
            if (gameObject.drawable) {
                gameObject.draw(elapsedTime, ctx);
            }
        }
        this.lastTickStart = tickStartTime;

        this.draw(ctx);
    }

    draw = (ctx) => {
        
        this.animationFrame = window.requestAnimationFrame(this.tick);
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
            <ImageLoader images={this.imagesToLoad} sounds={this.audioToLoad} music={this.musicToLoad} onLoad = { this.assetsLoaded } />
        );
    }
}

export default GameScreen;