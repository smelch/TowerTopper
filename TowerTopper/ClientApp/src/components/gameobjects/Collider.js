import Behavior from './Behavior';

class Collider extends Behavior {
    constructor(props) {
        super("Collider");
        this.props = props;
        this.lastBounds = null;
    }

    mount(gameObject) {
        console.log("behavior mounted");
        console.log(this);
        this.gameObject = gameObject;
        CollisionSystem.registerCollider(this);
    }

    unmount() {
        this.gameObject = null;
        CollisionSystem.unregisterCollider(this);
    }

    update(elapsedTime) {

    }

    trigger(otherCollider) {
        this.props.onCollision(otherCollider);
    }

    CalculateBounds() {
        const position = this.gameObject.position;
        return this.props.bounds.offset(position);
    }
}

export class CollisionSystem {
    static colliders = [];
    static registerCollider(collider) {
        this.colliders.push(collider);
    }

    static unregisterCollider(collider) {
        const index = this.colliders.indexOf(collider);
        if (index != -1) {
            // this.colliders = this.colliders.splice(index, 1);
            this.colliders.splice(index, 1);
        }
    }

    static checkCollisions() {
        for (let i = 0; i < this.colliders.length - 1; i++) {
            const colliderA = this.colliders[i];
            const boundsA = colliderA.CalculateBounds();

            for (let j = 1; j < this.colliders.length; j++) {
                const colliderB = this.colliders[j];
                const boundsB = colliderB.CalculateBounds();
                if (boundsA.doesOverlap(boundsB)) {
                    colliderA.trigger(colliderB);
                    colliderB.trigger(colliderA);
                }
            }
        }
    }
}

export default Collider;