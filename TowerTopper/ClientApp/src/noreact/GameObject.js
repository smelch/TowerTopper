class GameObject {
    drawable;
    updateable;

    constructor(props) {
        if (props) {
            this.drawable = props.drawable;
            this.updateable = props.updateable;
            this.updateOrder = props.updateOrder;
            this.drawOrder = props.drawOrder;
        }
    }
}

export default GameObject