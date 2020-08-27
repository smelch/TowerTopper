import GameObject from './GameObject'

class AnimateObject extends GameObject {
    constructor(fps) {
        super({ drawable: true });
        this.lastFrameUpdate = Date.now()
        this.tickThresh = 60/fps
        this.frameSteps = 0
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

    draw(ctx, x, y, xs, ys) {
        //console.log((Date.now() - this.lastFrameUpdate))
        if ((Date.now() - this.lastFrameUpdate) / 20 > this.tickThresh) {
            this.frameSteps = (this.frameSteps + 1) % this.states[this.curState].numFrames
            this.lastFrameUpdate = Date.now()
        }

        ctx.drawImage(this.states[this.curState].img, 
            (this.states[this.curState].frameWidth * this.frameSteps), 
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