import { Point, Rectangle } from './Coordinates';
import Bug from '../../assets/cars/car_bug_large.png';
import BugCrash from '../../assets/cars/car_bug_crash_large.png';
import AnimateObject from './AnimateObject';
import Collider from './Collider';

class Car extends AnimateObject {
    constructor(game, thrower, flying, crashed, position) {
        super(game, 1, true, position, thrower.facing);
        this.thrower = thrower;
        console.log("CAR!");
        console.log(thrower);
        this.isCrashed = false;
        this.initialPosition = position;
        this.totalElapsedTime = 0;
        this.addTag("car");

        super.addSpriteState('flying', 300, 200, 1, 1, flying, 'flying');
        super.addSpriteState('crashed', 300, 220, 1, 1, crashed, 'crashed');
        super.changeState('flying');
        this.collider = new Collider({
            onCollision: (collider) => this.onCollision(collider),
            bounds: new Rectangle(20, 35, 120, 50)
        });
        super.addBehavior(this.collider);
    }

    onCollision(collider) {
        const gameObject = collider.gameObject;
        if (gameObject.hasTag("character") && gameObject != this.thrower) {
            this.isCrashed = true;
            super.changeState('crashed');
            super.removeBehavior(this.collider);
        }
    }

    update(elapsedTime) {
        if (this.isCrashed) {
            return;
        }
        this.totalElapsedTime += elapsedTime;

        console.log(this.facing);
        const newY = 0.001 * this.totalElapsedTime * this.totalElapsedTime - .7 * this.totalElapsedTime + this.initialPosition.y;
        const newX = .5 * this.totalElapsedTime * this.facing + this.initialPosition.x;

        this.position = new Point(newX, newY);
        
        if (newY > 400) {
            this.game.removeGameObject(this)

            // TESTING
            // this.isCrashed = true
        };
    }

    static GenerateCar(game, thrower) {
        console.log(thrower);
        const index = Math.floor(Math.random() * CarType.ImageReferences.length);
        console.log("using car " + index);
        const car = new Car(game, thrower, CarType.Images[index + "_flying"], CarType.Images[index + "_crashed"], thrower.position.offset(new Point(10 * thrower.facing, 10)));
        return car;
    }

    static GetImagesList() {
        const images = {};
        for (let i in CarType.ImageReferences) {
            images[i + "_flying"] = CarType.ImageReferences[i].flying;
            images[i + "_crashed"] = CarType.ImageReferences[i].crashed;
        }

        return images;
    }

    static SetImagesList(images) {
        console.log(images);
        CarType.Images = images;
    }
}

class CarType {
    static ImageReferences = [
        { flying: Bug, crashed: BugCrash }
    ];

    static Images = {};
}

export default Car;