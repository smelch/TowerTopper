import Behavior from './Behavior';

class Collider extends Behavior {
    constructor(gameObject, props) {
        super(gameObject, "Collider");
        this.props = props;
        this.lastBounds = null;
    }

    update(elapsedTime) {
        const newBounds = this.CalculateBounds();
    }

    CalculateBounds() {
        const position = this.gameObject.getPosition();
    }
}

export default Collider