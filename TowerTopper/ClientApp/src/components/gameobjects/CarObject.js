import { Point, Rectangle } from './Coordinates';
import Bug from '../../assets/cars/car_bug_large.png';
import BugCrash from '../../assets/cars/car_bug_crash_large.png';
import AnimateObject from './AnimateObject';
import Collider from './Collider';

class Car extends AnimateObject {
    constructor(game, thrower, flying, crashed, position) {
        super(game, 1, true, position);
        this.thrower = thrower;
        this.isCrashed = false;
        this.initialPosition = position;
        this.totalElapsedTime = 0;
        this.addTag("car");

        super.addSpriteState('flying', 300, 200, 1, 1, flying, 'flying');
        super.addSpriteState('crashed', 300, 200, 1, 1, crashed, 'crashed');
        super.changeState('flying');
        super.addBehavior(new Collider({
            onCollision: this.onCollision,
            bounds: new Rectangle(20,35,120,50)
        }));
    }

    onCollision(collider) {
        console.log("car crashed");
        const gameObject = collider.gameObject;
        // PROBLEM THIS DOESN'T TRIGGER
        if (gameObject.hasTag("character") && gameObject != this.thrower) {
            this.isCrashed = true
        }
    }

    update(elapsedTime) {
        if (this.isCrashed) {
            return;
        }
        this.totalElapsedTime += elapsedTime;

        const newY = 0.001 * this.totalElapsedTime * this.totalElapsedTime - .7 * this.totalElapsedTime + this.initialPosition.y;
        const newX = .55 * this.totalElapsedTime + this.initialPosition.x;

        this.position = new Point(newX, newY);
        
        if (newY > 400) {
            this.game.removeGameObject(this)

            // TESTING
            // this.isCrashed = true
        };
    }

    static GenerateCar(game, thrower) {
        const index = Math.floor(Math.random() * CarType.ImageReferences.length);
        console.log("using car " + index);
        const car = new Car(game, thrower, CarType.Images[index + "_flying"], CarType.Images[index + "_crashed"], thrower.position.offset(new Point(10, 10)));
        game.addGameObject(car);
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