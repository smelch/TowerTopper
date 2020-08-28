import GameObject from './GameObject'

class AnimateObject extends GameObject {
    constructor(game, fps, doesUpdate, position, facing) {
        super(game, position, { updateable: doesUpdate, drawable: true });
        this.lastFrameUpdate = Date.now()
        this.tickThresh = 60/fps
        this.frameSteps = 0
        this.states = []
        this.curState = "idle"
        this.onAnimationEnd = null;
        this.facing = (facing == 0) ? 1 : facing;
    };

    setLoc(x, y, flip) {
        this.x = x
        this.y = y
        this.flip = flip
    }

    addSpriteState(name, frameWidth, frameHeight, numFrames, scale, img, post) {
        this.states[name] = {}
        this.states[name].frameWidth = frameWidth
        this.states[name].frameHeight = frameHeight
        this.states[name].numFrames = numFrames
        this.states[name].scale = scale
        this.states[name].img = img
        this.states[name].post = post
    };

    changeState(name) {
        this.curState = name
        this.frameSteps = 0
    }

    draw(elapsedTime, ctx, xs, ys, flip) {
        if ((Date.now() - this.lastFrameUpdate) / 20 > this.tickThresh) {
            this.frameSteps = (this.frameSteps + 1);
            if (this.frameSteps >= this.states[this.curState].numFrames) {
                this.frameSteps = this.frameSteps % this.states[this.curState].numFrames;
                if (this.onAnimationEnd) {
                    this.onAnimationEnd();
                }
            }
            this.lastFrameUpdate = Date.now();
        }

        ctx.save();
        ctx.scale(this.facing, 1);
        ctx.drawImage(this.states[this.curState].img, 
            (this.states[this.curState].frameWidth * this.frameSteps), 
            0, 
            this.states[this.curState].frameWidth, 
            this.states[this.curState].frameHeight, 
            this.position.x * this.facing + ((this.facing == -1) ? -0.5 * this.states[this.curState].frameWidth : 0), 
            this.position.y, 
            (this.states[this.curState].frameWidth * 0.5), 
            (this.states[this.curState].frameHeight * 0.5))
        ctx.restore();
        if (this.frameSteps == this.states[this.curState].numFrames - 1) {
            this.curState = this.states[this.curState].post
            this.frameSteps = 0
        }
    };
};

export default AnimateObject