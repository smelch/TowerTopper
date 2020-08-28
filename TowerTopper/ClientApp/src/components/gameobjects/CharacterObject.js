import AnimateObject from './AnimateObject'
import Collider from './Collider';
import Car from './CarObject';

class CharacterObject extends AnimateObject {
    constructor(game, idle, toss, hit, position) {
        super(game, 10, true, position);
        this.game = game;
        this.addSpriteState('idle', 200, 300, 8, 0.5, idle, 'idle');
        this.addSpriteState('toss', 200, 300, 14, 0.5, toss, 'idle');
        this.addSpriteState('hit', 200, 300, 4, 0.5, hit, 'idle');

        super.addTag('character');
        super.addBehavior(new Collider({
            onCollision: this.onCollision
        }));

        this.game.addGameObject(this);
    }

    toss() {
        this.changeState('toss');
        Car.GenerateCar(this.game, this);
    }

    update(elapsedTime) {

    }

    onCollision(otherCollider) {
        const gameObject = otherCollider.gameObject;
        if (gameObject.hasTag('car')) {
            this.changeState('hit');
        }
    }
}

export default CharacterObject