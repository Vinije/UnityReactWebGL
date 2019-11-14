var XY = function(x,y){
    this.x = x || 0;
    this.y = y || 0;
}

XY.prototype.add = function(other){
    return new XY(this.x + other.x, this.y + other.y);
}

XY.prototype.multiply = function(other){
    return new XY(this.x * other.x, this.y * other.y);
}

XY.prototype.divide = function(other){
    return new XY(Math.floor(this.x / other.x), Math.floor(this.y / other.y));
}

XY.prototype.equals = function(other){
    return (this.x == other.x && this.y == other.y);
}

XY.prototype.toString = function(other){
    return this.x + " " + this.y;
}

XY.prototype.getNeighbours = function(){
    var result = [];
    if (this.x - 1 >= 0) { result.push(new XY(this.x - 1, this.y));}

    if (this.x + 1 < Game.SIZE) { result.push(new XY(this.x + 1, this.y));}

    if (this.y - 1 >= 0) { result.push(new XY(this.x, this.y -1));}

    if (this.y + 1 < Game.SIZE) { result.push(new XY(this.x, this.y + 1));}

    return result;
}