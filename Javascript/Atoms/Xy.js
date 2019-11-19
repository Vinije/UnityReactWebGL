class XY {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    add(other) {
        return new XY(this.x + other.x, this.y + other.y);
    }
    multiply(other) {
        return new XY(this.x * other.x, this.y * other.y);
    }
    divide(other) {
        return new XY(Math.floor(this.x / other.x), Math.floor(this.y / other.y));
    }
    equals(other) {
        return (this.x == other.x && this.y == other.y);
    }
    toString(other) {
        return this.x + " " + this.y;
    }
    _getNeighbours() {
        var result = [];
        if (this.x - 1 >= 0) {
            result.push(new XY(this.x - 1, this.y));
        }
        if (this.x + 1 < Game.SIZE) {
            result.push(new XY(this.x + 1, this.y));
        }
        if (this.y - 1 >= 0) {
            result.push(new XY(this.x, this.y - 1));
        }
        if (this.y + 1 < Game.SIZE) {
            result.push(new XY(this.x, this.y + 1));
        }
        return result;
    }
}






