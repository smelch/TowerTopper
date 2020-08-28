import AnimateObject from './AnimateObject'
import Collider from './Collider';
import Car from './CarObject';
import { Rectangle } from './Coordinates';

class CharacterObject extends AnimateObject {
    constructor(game, playerId, idle, toss, hit, walk, position, facing) {
        super(game, 6, true, position, facing);
        this.game = game;
        this.addSpriteState('idle', 200, 300, 8, 0.5, idle, 'idle');
        this.addSpriteState('toss', 200, 300, 14, 0.5, toss, 'idle');
        this.addSpriteState('hit', 200, 300, 4, 0.5, hit, 'idle');
        this.addSpriteState('walk', 200, 300, 4, 0.5, walk, 'walk');
        this.playerId = playerId;
        this.drawOrder = 98;

        super.addTag("character");
        super.addBehavior(new Collider({
            onCollision: (collider) => this.onCollision(collider),
            bounds: new Rectangle(25,40,60,75)
        }));

        this.isTossing = false

        this.game.props.connection.on("CarThrown", (message) => this.remote_toss(message));
        this.game.props.connection.on("WalkStarted", (message) => this.remote_walk(message));
        this.game.props.connection.on("WalkStopped", (message) => this.remote_stop(message));
    }

    toss() {
        this.isTossing = true;
        this.isWalking = false;
        this.changeState('toss');
        CharacterObject.sounds.ernie.throws[0].play();

        console.log("tossing");
        console.log(this.game.props.connection);
        this.game.props.connection.send("ThrowCar", this.game.props.roomId, Date.now()).catch(err => console.error(err));
    }

    walk(facing) {
        if (!this.isTossing && facing != this.facing || !this.isWalking) {
            this.changeState('walk');
            this.facing = facing;
            this.isWalking = true;
            this.game.props.connection.send("StartWalk", this.game.props.roomId, this.facing, Date.now()).catch(err => console.error(err));
        }
    }

    remote_walk(message) {
        if (message.playerId === this.playerId) {
            this.changeState('walk');
            this.facing = message.facing;
            this.isWalking = true;
        }
    }

    stopWalking() {
        this.changeState('idle');
        this.isWalking = false;
        this.game.props.connection.send("StopWalk", this.game.props.roomId, Date.now()).catch(err => console.error(err));
    }

    remote_stop(message) {
        if (message.playerId === this.playerId) {
            this.changeState('idle');
            this.isWalking = false;
        }
    }

    remote_toss(message) {
        console.log(message);
        if (message.playerId === this.playerId) {
            this.isTossing = true;
            this.changeState('toss');
            CharacterObject.sounds.ernie.throws[0].play();
        }
    }

    update(elapsedTime) {
        if (this.isTossing && this.frameSteps == 7) {
            Car.GenerateCar(this.game, this);
            this.isTossing = false
        }

        if (this.isWalking) {
            this.position.x = this.position.x + elapsedTime * 0.1 * this.facing;
        }
    }

    onCollision(otherCollider) {
        const gameObject = otherCollider.gameObject;
        if (gameObject.hasTag('car') && gameObject.thrower != this) {
            this.changeState('hit');
            CharacterObject.sounds.ernie.hits[0].play();
        }
    }

    destroy() {
        this.props.connection.off("CarThrown", this.carThrown);
        this.props.connection.off()
        super.destroy();
    }
    static SetSoundList(sounds) {
        this.sounds = sounds;
    }
}

export default CharacterObject