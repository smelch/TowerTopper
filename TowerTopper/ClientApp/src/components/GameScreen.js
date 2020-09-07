import React, { Component } from 'react';
import ImageLoader from './ImageLoader';
import Background from '../assets/background.png';

import CharacterObject from './gameobjects/CharacterObject';

import SpriteErnieIdle from '../assets/sprite_ernie_idle.png';
import SpriteErnieToss from '../assets/sprite_ernie_toss.png';
import SpriteErnieHit from '../assets/sprite_ernie_hit.png';
import SpriteErnieWalk from '../assets/sprite_ernie_walk.png';
import SpriteErnieLoss from '../assets/sprite_ernie_loss.png';
import SpriteErnieWin from '../assets/sprite_ernie_victory.png';

import SpriteDanIdle from '../assets/sprite_dan_idle.png';
import SpriteDanToss from '../assets/sprite_dan_toss.png';
import SpriteDanHit from '../assets/sprite_dan_hit.png';
import SpriteDanWalk from '../assets/sprite_dan_walk.png';
import SpriteDanLoss from '../assets/sprite_dan_loss.png';
import SpriteDanWin from '../assets/sprite_dan_victory.png';

import SpriteMarkIdle from '../assets/sprite_mark_idle.png';
import SpriteMarkToss from '../assets/sprite_mark_toss.png';
import SpriteMarkHit from '../assets/sprite_mark_hit.png';
import SpriteMarkWalk from '../assets/sprite_mark_walk.png';
import SpriteMarkLoss from '../assets/sprite_mark_loss.png';
import SpriteMarkWin from '../assets/sprite_mark_victory.png';

import BackgroundMusic from '../assets/music/mus_ingame.ogg';

import ErnieThrow2 from '../assets/sounds/eff_ernie_throw_2.ogg';
import ErnieHit1 from '../assets/sounds/eff_ernie_hit_1.ogg';
import ErnieHit2 from '../assets/sounds/eff_ernie_hit_2.ogg';

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
            spriteDanWalk: SpriteDanWalk,
            spriteDanWin: SpriteDanWin,
            spriteDanLoss: SpriteDanLoss,
            spriteErnieIdle: SpriteErnieIdle,
            spriteErnieToss: SpriteErnieToss,
            spriteErnieHit: SpriteErnieHit,
            spriteErnieWalk: SpriteErnieWalk,
            spriteErnieWin: SpriteErnieWin,
            spriteErnieLoss: SpriteErnieLoss,
            spriteMarkIdle: SpriteMarkIdle,
            spriteMarkToss: SpriteMarkToss,
            spriteMarkHit: SpriteMarkHit,
            spriteMarkWalk: SpriteMarkWalk,
            spriteMarkWin: SpriteMarkWin,
            spriteMarkLoss: SpriteMarkLoss
        }, ...Car.GetImagesList()
    };

    audioToLoad = {
        ernie: {
            taunts: [],
            throws: [ErnieThrow2],
            hits: [ErnieHit1, ErnieHit2]
        }
    };

    musicToLoad = {
        background: BackgroundMusic
    };

    gameObjects = [];

    constructor(props) {
        super(props);
        this.state = {
            imagesLoaded: false
        };
        this.roomCode = props.roomCode
    }

    assetsLoaded = (images, sounds, music) => {
        this.props.connection
            .send("SendRoomState", this.props.roomId)
            .catch(err => console.error(err));

        this.images = images;
        this.music = music;

        this.music.background.volume = 0.1;
        this.music.background.loop = true;
        //this.music.background.play();

        Car.SetImagesList(images);
        CharacterObject.SetSoundList(sounds);
        this.setState({ imagesLoaded: true });
        this.lastTickStart = Date.now();
        this.animationFrame = window.requestAnimationFrame(this.tick);
        
        // sprite placement variables
        this.left_sprite_x = 30;
        this.right_sprite_x = 490;
        this.sprite_y = 205;
    }

    guestJoined = (message) => {
        console.log(message);
        this.roomState.guest = message;
        console.log(message);
        this.p2 = this.getCharacter(this.roomState.guest.playerId, 490, 205, -1, 2, this.roomState.guest.characterKey);
        // this.setState({ guestName: this.roomState.guest.userName });
    }

    getCharacter = (id, x, y, facing, side, character) => {
        switch(character) {
            case "ernie":
                return new CharacterObject(this, id, this.images.spriteErnieIdle, this.images.spriteErnieToss, this.images.spriteErnieHit, this.images.spriteErnieWalk, this.images.spriteErnieLoss, this.images.spriteErnieWin, new Point(x, y), facing, side, character);
            case "dan":
                return new CharacterObject(this, id, this.images.spriteDanIdle, this.images.spriteDanToss, this.images.spriteDanHit, this.images.spriteDanWalk, this.images.spriteDanLoss, this.images.spriteDanWin, new Point(x, y), facing, side, character);
            case "mark":
                return new CharacterObject(this, id, this.images.spriteMarkIdle, this.images.spriteMarkToss, this.images.spriteMarkHit, this.images.spriteMarkWalk, this.images.spriteMarkLoss, this.images.spriteMarkWin, new Point(x, y), facing, side, character);
        }
    }

    roomStateGenerated = (message) => {
        console.log(message);
        this.roomState = message;
        
        this.p1 = this.getCharacter(this.roomState.host.playerId, 30, 205, 1, 1, message.host.characterKey);
        // this.setState({ hostName: this.roomState.host.userName });

        if (this.roomState.guest) {
            this.p2 = this.getCharacter(this.roomState.guest.playerId, 490, 205, -1, 2, message.guest.characterKey);
            if (this.roomState.guest.playerId === this.roomState.guest.myPlayerId) {
                this.props.connection.send("StartGame", this.roomState.roomId)
            }
        }
    }

    getMyCharacter = () => {
        if (!this.roomState) {
            return null;
        }

        if (this.p1 && this.p1.playerId === this.roomState.myPlayerId) {
            return this.p1;
        }

        return (this.p2 && this.p2.playerId === this.roomState.myPlayerId) ? this.p2 : null;
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

    latencyCheck = (event) => {
        this.props.connection.send("LatencyResponse", event.timeStamp);
    }

    latencyResult = (event) => {
        this.roomState.guest.latency = event.guestLatency;
        this.roomState.host.latency = event.hostLatency;
    }

    handleKeyDown = (event) => {
        const c = this.getMyCharacter();
        if (c && this.roomState.status !== "over" && this.roomState.status !== "starting") {
            if (this.getMyCharacter().curState !== "toss") {
                if (event.keyCode === 65) {
                    this.getMyCharacter().walk(-1);
                } else if (event.keyCode === 68) {
                    this.getMyCharacter().walk(1);
                } else if (event.keyCode === 32) {
                    this.getMyCharacter().toss();
                }
            }
        }

        if (c && this.roomState.status === "over") {
            if (event.keyCode === 32) {
                if (this.props.onGameOver) {
                    this.props.onGameOver();
                }
            }
        }
    }

    handleKeyUp = (event) => {
        const c = this.getMyCharacter();
        if (c) {
            if (this.getMyCharacter().curState != "toss") {
                const character = this.getMyCharacter();
                if (event.keyCode == 65 && character.facing == -1) {
                    this.getMyCharacter().stopWalking();
                } else if (event.keyCode == 68 && character.facing == 1) {
                    this.getMyCharacter().stopWalking();
                }
            }
        }
    }

    componentDidMount = () => {
        this.props.connection.on("RoomStateGenerated", this.roomStateGenerated);
        this.props.connection.on("GuestJoinedRoom", this.guestJoined);
        this.props.connection.on("LatencyCheck", this.latencyCheck);

        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
        this.gameObjects.push(new GameHeader(this, { x: 0, y: 0 }, { stateSource: this }));
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);
        this.props.connection.off("RoomStateGenerated", this.roomStateGenerated);
        this.props.connection.off("GuestJoinedRoom", this.guestJoined);
        this.props.connection.off("LatencyCheck", this.latencyCheck);
        window.cancelAnimationFrame(this.animationFrame);
    }

    toss = () => {
        this.getMyCharacter().toss();
    }

    tick = () => {
        const tickStartTime = Date.now();
        const elapsedTime = tickStartTime - this.lastTickStart;

        if (this.roomState && this.roomState.status != "over") {
            if (this.p1 && this.p1.isDead) {
                this.p2.win();
                this.roomState.status = "over";
            } else if (this.p2 && this.p2.isDead) {
                this.p1.win();
                this.roomState.status = "over";
            }
        }

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

        this.animationFrame = window.requestAnimationFrame(this.tick);
    }

    render() {
        if (this.state.imagesLoaded) {
            return (
                <div id="game">
                    <h4>Room Code: {this.roomCode}</h4>
                    <canvas ref="canvas" width={640} height={360} />
                    <br />
                    <h6>Move: [a] and [d]</h6>
                    <h6>Throw: [space]</h6>
                </div>
            );
        }

        return (
            <ImageLoader images={this.imagesToLoad} sounds={this.audioToLoad} music={this.musicToLoad} onLoad = { this.assetsLoaded } />
        );
    }
}

export default GameScreen;