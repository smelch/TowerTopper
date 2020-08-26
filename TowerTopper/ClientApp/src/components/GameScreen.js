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

    componentDidMount = () => {
        this.props.connection.on('RoomCreated', this.roomCreated);
    }

    componentWillUnmount = () => {
        this.props.connection.off('RoomCreated', this.roomCreated);
        window.cancelAnimationFrame(this.animationFrame);
    }

    draw = () => {
        var ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 800, 480);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.images.background, 0, 0, 800, 480);

        this.animationFrame = window.requestAnimationFrame(this.draw);
    }

    render() {
        if (this.state.imagesLoaded) {
            return (
                <canvas ref="canvas" width={800} height={480} />
            );
        } else {
            return (
                <ImageLoader images={this.imagesToLoad} onLoad={this.onImagesLoaded} />
            );
        }
    }
}

export default GameScreen;