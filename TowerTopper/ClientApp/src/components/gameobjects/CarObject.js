import { Point } from './Coordinates';
import Bug from '../../assets/cars/car_bug_large.png';
import BugCrash from '../../assets/cars/car_bug_crash_large.png';
import AnimateObject from './AnimateObject';

class Car extends AnimateObject {
    constructor(game, thrower, flying, crashed, position) {
        super(game, 1, true, position);
        console.log(flying);
        console.log(crashed);
        this.thrower = thrower;
        this.isCrashed = false;
        this.initialPosition = position;
        console.log(position);
        this.totalElapsedTime = 0;
        this.addSpriteState('flying', 300, 200, 1, 1, flying, 'flying');
        this.addSpriteState('crashed', 300, 200, 1, 1, crashed, 'crashed');
        super.changeState('flying');
    }

    update(elapsedTime) {
        if (this.isCrashed) {
            return;
        }
        this.totalElapsedTime += elapsedTime;

        const newY = 0.001 * this.totalElapsedTime * this.totalElapsedTime - .5 * this.totalElapsedTime + this.initialPosition.y;
        const newX = .5 * this.totalElapsedTime + this.initialPosition.x;

        this.position = new Point(newX, newY);
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