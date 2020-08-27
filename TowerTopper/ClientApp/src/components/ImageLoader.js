import React, { Component } from 'react';
var Background = require('../assets/sprite_dan.png');

class ImageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = { imagesLoaded: 0 };
    }

    componentDidMount = () => {
        this.loadImages();
    }

    loadImages = () => {
        this.images = {};
        for (const property in this.props.images) {
            this.images[property] = this.loadImage(this.props.images[property]);
        };
        console.log(this.images);
    }

    loadImage = (src) => {
        const img = new Image();
        img.onload = this.imageLoaded;
        img.src = src;
        return img;
    }

    imageLoaded = () => {
        console.log(this.state.imagesLoaded);
        const imagesLoaded = this.state.imagesLoaded + 1;
        this.setState({ imagesLoaded: imagesLoaded });
        if (imagesLoaded === Object.keys(this.props.images).length) {
            this.props.onLoad(this.images);
        }
    }

    render() {
        return (
            <span>Loading... {Math.round(this.state.imagesLoaded / Object.keys(this.props.images).length * 100)}%</span>
        );
    }
}

export default ImageLoader;