import React, { Component } from 'react';

class ImageLoader extends Component {
    constructor(props) {
        super(props);

        this.state = { assetsLoaded: 0, assetsToLoad: 1 };
    }

    componentDidMount = () => {
        const numImg = this.loadImages();
        const numSounds = this.loadSounds();
        const numMusic = this.loadMusic();
        this.setState({ assetsToLoad: numImg + numSounds + numMusic });
    }

    loadImages = () => {
        let count = 0;
        this.images = {};
        for (const property in this.props.images) {
            this.images[property] = this.loadImage(this.props.images[property]);
            count++;
        };
        return count;
    }

    loadSounds() {
        this.sounds = {};
        let numSounds = 0;
        for (let charKey in this.props.sounds) {
            const charSounds = this.props.sounds[charKey];
            this.sounds[charKey] = {};
            for (let action in charSounds) {
                this.sounds[charKey][action] = [];
                for (let sound in charSounds[action]) {
                    this.sounds[charKey][action].push(this.loadSound(charSounds[action][sound]));
                    numSounds++;
                }
            }
        }

        console.log(numSounds);
        return numSounds;
    }

    loadMusic() {
        this.music = {};
        let numMusic = 0;
        for (let musicKey in this.props.music) {
            this.music[musicKey] = this.loadSound(this.props.music[musicKey]);
            numMusic++;
        }

        return numMusic;
    }

    loadImage = (src) => {
        const img = new Image();
        img.onload = this.assetLoaded;
        img.src = src;
        return img;
    }

    loadSound = (src) => {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', this.assetLoaded);
        audio.src = src;
        return audio;
    }

    assetLoaded = () => {
        console.log(this.sounds);
        const assetsLoaded = this.state.assetsLoaded + 1;
        this.setState({ assetsLoaded: assetsLoaded });
        if (assetsLoaded === this.state.assetsToLoad) {
            this.props.onLoad(this.images, this.sounds, this.music);
        }
    }

    render() {
        return (
            <span>Loading... {Math.round(this.state.assetsLoaded / this.state.assetsToLoad * 100)}%</span>
        );
    }
}

export default ImageLoader;