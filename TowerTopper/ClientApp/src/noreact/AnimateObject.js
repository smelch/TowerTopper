import GameObject from './GameObject'

class AnimateObject extends GameObject {
    constructor(fps) {
        super();
        this.tick_thresh = 60/fps
        this.states = []
        this.curState = "idle"
    };

    addSpriteState(name, frameWidth, frameHeight, numFrames, scale, img) {
        this.states[name] = {}
        this.states[name].frameWidth = frameWidth
        this.states[name].frameHeight = frameHeight
        this.states[name].numFrames = numFrames
        this.states[name].scale = scale
        this.states[name].img = img
    };

    draw(ctx, frame_tick, x, y, xs, ys) {
        ctx.drawImage(this.states[this.curState].img, 
            (this.states[this.curState].frameWidth * frame_tick), 
            0, 
            this.states[this.curState].frameWidth, 
            this.states[this.curState].frameHeight, 
            x, 
            y, 
            (this.states[this.curState].frameWidth * 0.5), 
            (this.states[this.curState].frameHeight * 0.5))
    };
};

export default AnimateObject