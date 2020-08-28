export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    offsetByPoint = (point) => {
        return new Rectangle(this.x + point.x, this.y + point.y, this.width, this.height);
    }

    doesOverlap = (rectangle) => {
        return (this.x < (rectangle.x + rectangle.width) && (this.x + this.width) > rectangle.x &&
            this.y > (rectangle.y + rectangle.height) && (this.y + this.height) < rectangle.y);
    }

    areEqual = (rectangle) => {
        return rectangle != null && this.x == rectangle.x && this.y == rectangle.y && this.width == rectangle.width && this.height == rectangle.height;
    }
}

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    offset(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}
