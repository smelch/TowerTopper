class GameObject {
    game;
    position;
    drawable;
    updateable;
    behaviors = [];
    tags = [];

    constructor(game, position, props) {
        this.game = game;
        this.position = position;
        if (props) {
            this.drawable = props.drawable;
            this.updateable = props.updateable;
            this.updateOrder = props.updateOrder;
            this.drawOrder = props.drawOrder;
        }
    }

    addBehavior(behavior) {
        const index = this.behaviors.indexOf(behavior);
        if (index == -1) {
            this.behaviors.push(behavior);
            behavior.mount(this);
        }
    }

    removeBehavior(behavior) {
        const index = this.behaviors.indexOf(behavior);
        if (index != -1) {
            this.behaviors = this.behaviors.splice(index, 1);
            behavior.unmount();
        }
    }

    addTag(tag) {
        if (!this.hasTag(tag)) {
            this.tags.push(tag);
        }
    }

    removeTag(tag) {
        const index = this.tags.indexOf(tag);
        if (index != -1) {
            this.tags = this.tags.splice(index, 1);
        }
    }

    hasTag(tag) {
        return this.tags.indexOf(tag) != -1;
    }
}

export default GameObject