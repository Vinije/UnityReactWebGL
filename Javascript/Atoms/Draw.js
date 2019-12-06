class Draw {
    constructor(board) {
        this._board = board;
        this._context = null;
        this.LINE = 2;
        this.ATOM = 7;
        this.CELL = 60;
    }
    init() {
        var canvas = document.createElement("canvas");
        this.CELL += this.LINE;
        var size = Game.SIZE * this.CELL + this.LINE;
        canvas.width = size;
        canvas.height = size;
        this._context = canvas.getContext("2d");
        this._context.lineWidth = this.LINE;
        this._context.fillStyle = "#000";
        //first render black background
        this._context.fillRect(0, 0, size, size);
        //then render lines
        this._lines();
        //then render bodies of cells 
        for (let i = 0; i < Game.SIZE; i++) {
            for (let j = 0; j < Game.SIZE; j++) {
                var xy = new XY(i, j);
                this._cell(xy, 0, null);
            }
        }
        document.body.appendChild(canvas);
    }

    disableCanvas(){
        this._context.canvas.globalAlpha = 0.5;
    }

    // // Draw.all = function(){
    //     this._cells();
    // };
    _lines() {
        this._context.beginPath();
        //draw horizontal lines
        for (let index = 0; index < Game.SIZE + 1; index++) {
            var y = index * this.CELL + this.LINE / 2;
            this._context.moveTo(0, y);
            this._context.lineTo(this._context.canvas.width, y);
        }
        //draw vertical lines
        for (let index = 0; index < Game.SIZE + 1; index++) {
            var x = index * this.CELL + this.LINE / 2;
            this._context.moveTo(x, 0);
            this._context.lineTo(x, this._context.canvas.height);
        }
        this._context.stroke();
    }
    
    _cell(xy, atoms, player) {
        this._context.fillStyle = "#fff";
        var size = this.CELL - this.LINE;
        var left = xy.x * this.CELL + this.LINE;
        var top = xy.y * this.CELL + this.LINE;
        this._context.fillRect(left, top, size, size);
        var color;
        if (player)
            color = player.getColor();
        var positions = Draw.POSITIONS[atoms];
        if (atoms >= Draw.POSITIONS.length) {
            debugger;
        }
        if (positions) {
            for (let i = 0; i < positions.length; i++) {
                var position = positions[i];
                var atomX = (xy.x + position[0]) * this.CELL;
                var atomY = (xy.y + position[1]) * this.CELL;
                this._atom(atomX, atomY, color);
            }
        }
    }
    _atom(x, y, color) {
        this._context.beginPath();
        this._context.moveTo(x + this.ATOM, y);
        this._context.arc(x, y, this.ATOM, 0, 2 * Math.PI, false);
        this._context.fillStyle = color;
        this._context.fill();
        this._context.stroke();
    }
    getPosition(cursor) {
        var rectangle = this._context.canvas.getBoundingClientRect();
        cursor = cursor.add(new XY(-rectangle.left, -rectangle.top));
        if (cursor.x < 0 || cursor.x > rectangle.width) {
            return null;
        }
        if (cursor.y < 0 || cursor.y > rectangle.height) {
            return null;
        }
        var cellXY = new XY(this.CELL, this.CELL);
        cursor = cursor.divide(cellXY);
        return cursor;
    }
}

Draw.POSITIONS = [
    null,
    [[1/2, 1/2]],
    [[1/4, 1/4],[3/4, 3/4]],
    [[1/4, 1/4],[1/2, 1/2],[3/4, 3/4]],
    [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4]],
    [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4],[1/2, 1/2]],
    [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4],[1/4, 1/2],[3/4,1/2]],
    [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4],[1/4, 1/2],[3/4,1/2],[1/2, 1/4]],
    [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4],[1/4, 1/2],[3/4,1/2],[1/2, 1/4],[1/2, 3/4]]
];





