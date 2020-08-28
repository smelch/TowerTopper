import { Point, Rectangle } from './Coordinates';
import Bug from '../../assets/cars/car_bug_large.png';
import BugCrash from '../../assets/cars/car_bug_crash_large.png';
import Van from '../../assets/cars/car_minivan_large.png';
import VanCrash from '../../assets/cars/car_minivan_crash_large.png';
import Mustang from '../../assets/cars/car_mustang_large.png';
import MustangCrash from '../../assets/cars/car_mustang_crash_large.png';
import Tesla from '../../assets/cars/car_tesla_large.png';
import TeslaCrash from '../../assets/cars/car_tesla_crash_large.png';
import Truck from '../../assets/cars/car_truck_large.png';
import TruckCrash from '../../assets/cars/car_truck_crash_large.png';
import AnimateObject from './AnimateObject';
import Collider from './Collider';

class Car extends AnimateObject {
    constructor(game, thrower, flying, crashed, position) {
        super(game, 1, true, position, thrower.facing);
        this.thrower = thrower;
        console.log("CAR!");
        console.log(thrower);
        this.drawOrder = 10;
        this.isCrashed = false;
        this.initialPosition = position;
        this.totalElapsedTime = 0;
        this.addTag("car");

        super.addSpriteState('flying', 300, 200, 1, 1, flying, 'flying');
        super.addSpriteState('crashed', 300, 200, 1, 1, crashed, 'crashed');
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
            this.collider.enabled = false;
        }
    }

    update(elapsedTime) {
        if (this.isCrashed) {
            return;
        }
        this.totalElapsedTime += elapsedTime;

        console.log(this.facing);
        const newY = 0.0012 * this.totalElapsedTime * this.totalElapsedTime - 1.0 * this.totalElapsedTime + this.initialPosition.y;
        const newX = .3 * this.totalElapsedTime * this.facing + this.initialPosition.x;

        this.position = new Point(newX, newY);
        if(this.collider.CalculateBounds().bottom > 330) {
            console.log(newY);
            this.isCrashed = true;
            super.changeState('crashed');
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
        { flying: Bug, crashed: BugCrash },
        { flying: Van, crashed: VanCrash },
        { flying: Mustang, crashed: MustangCrash },
        { flying: Tesla, crashed: TeslaCrash },
        { flying: Truck, crashed: TruckCrash }
    ];

    static Images = {};
}

export default Car;