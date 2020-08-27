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
        
        ctx.drawImage(this.images.spritedan, 0, 0, 200, 300);
        ctx.drawImage(this.images.spritemark, 320, 0, 200, 300);

        this.animationFrame = window.requestAnimationFrame(this.draw);
    }

    render() {
        if (this.state.imagesLoaded) {
            return (
                <canvas ref="canvas" width={640} height={360} />
            );
        }

        return (
            <ImageLoader images={this.imagesToLoad} onLoad={this.onImagesLoaded} />
        );
    }
}

export default GameScreen;