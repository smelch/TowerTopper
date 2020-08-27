import React, { Component } from 'react';
import ImageLoader from './ImageLoader';
import Background from '../assets/background.png';
import SpriteDan from '../assets/sprite_dan.png';
import SpriteMark from '../assets/sprite_mark.png';

class GameScreen extends Component {
    imagesToLoad = {
        background: Background,
        spritedan: SpriteDan,
        spritemark: SpriteMark
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

    gameStateUpdate = (message) => {

    }

    componentDidMount = () => {
        this.props.connection.on("GameStateUpdate", this.gameStateUpdated);
    }

    componentWillUnmount = () => {
        window.cancelAnimationFrame(this.animationFrame);
    }

    draw = () => {
        var ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 640, 360);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.images.background, 0, 0, 640, 360);
        
        ctx.drawImage(this.images.spritedan, (200 * this.frame_tick), 0, 200, 300, this.left_sprite_x, this.sprite_y, 100, 150);
        ctx.drawImage(this.images.spritemark, (208 * this.frame_tick), 0, 208, 300, this.right_sprite_x, this.sprite_y, 104, 150);

        // sets the fps
        this.frame_tick_small = (this.frame_tick_small + 1) % 10;

        // update on fps tick
        if (this.frame_tick_small === 9) {
            this.frame_tick = (this.frame_tick + 1) % 4;
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