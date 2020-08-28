export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.right = x + width;
        this.top = y;
        this.bottom = y + height;
        this.left = x;
    }

    offset = (point) => {
        return new Rectangle(this.x + point.x, this.y + point.y, this.width, this.height);
    }

    doesOverlap = (rectangle) => {
        return (this.left < rectangle.right && this.right > rectangle.left &&
            this.top < rectangle.bottom && this.bottom > rectangle.top);
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
