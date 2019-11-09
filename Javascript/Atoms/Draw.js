var Draw = {
    POSITIONS: [
        null,
        [[1/2, 1/2]],
        [[1/4, 1/4],[3/4, 3/4]],
        [[1/4, 1/4],[1/2, 1/2],[3/4, 3/4]],
        [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4]],
        [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4],[1/2, 1/2]],
        [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4],[1/4, 1/2],[3/4,1/2]],
        [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4],[1/4, 1/2],[3/4,1/2],[1/2, 1/4]],
        [[1/4, 1/4],[1/4, 3/4],[3/4, 1/4],[3/4, 3/4],[1/4, 1/2],[3/4,1/2],[1/2, 1/4],[1/2, 3/4]]
    ],
    CELL: 60,
    _context: null,
    LINE: 2,
    ATOM: 7
};

Draw.init = function (){
    var canvas = document.createElement("canvas");
    this.CELL += this.LINE;

    var size = Game.SIZE * this.CELL + this.LINE;

    canvas.width = size;
    canvas.height = size;

    this._context = canvas.getContext("2d");
    this._context.lineWidth = this.LINE;

    this._context.fillStyle = "#000";
    
    //first render black background
    this._context.fillRect(0,0,size, size);

    //then render lines
    this._lines();

    //then render bodies of cells 
    for (let i = 0; i < Game.SIZE; i++) {
        for (let j = 0; j < Game.SIZE; j++) {
            this._cell(i,j);          
        }      
    }

    document.body.appendChild(canvas);
}

// // Draw.all = function(){
//     this._cells();
// };

Draw._lines = function(){
    this._context.beginPath();

    //draw horizontal lines
    for (let index = 0; index < Game.SIZE+1; index++) {
        var y = index * this.CELL + this.LINE/2;
        this._context.moveTo(0, y);
        this._context.lineTo(this._context.canvas.width, y);
    }

    //draw vertical lines
    for (let index = 0; index < Game.SIZE+1; index++) {
        var x = index * this.CELL + this.LINE/2;
        this._context.moveTo(x, 0);
        this._context.lineTo(x, this._context.canvas.height);
    }

    this._context.stroke();

}

// Draw._cells = function(){

//     for (let r = 0; r < Game.SIZE; r++) {
//         for (let c = 0; c < Game.SIZE; c++) {
//             this._cell(r,c, Board.getAtoms(r,c));          
//         }      
//     }
// }

Draw._cell = function(x, y){

    this._context.fillStyle = "#fff";
    var size = this.CELL - this.LINE;
    
    var left = x * this.CELL + this.LINE;
    var top = y * this.CELL + this.LINE;

    this._context.fillRect(left,top,size, size);

    var count = Board.getAtoms(x,y);
    if (!count) {
        return;
    }

    var player = Board.getPlayer(x,y);
    var color = Score.getColor(player);

    var positions = this.POSITIONS[count];

    if (count >= this.POSITIONS.length) {
        debugger;
    }

    if (positions) {
        for (let i = 0; i < positions.length; i++) {
            var position = positions[i];
            var atomX = (x + position[0])*this.CELL;
            var atomY = (y + position[1])*this.CELL;
            this._atom(atomX, atomY, color);      
        }    
    }
}

Draw._atom = function(x, y, color){

    this._context.beginPath();

    this._context.moveTo(x + this.ATOM, y);
    this._context.arc(x,y, this.ATOM, 0, 2*Math.PI, false);

    this._context.fillStyle = color;
    this._context.fill();
    this._context.stroke();

}

Draw.getPosition = function(cursorX, cursorY){
    
    var rectangle = this._context.canvas.getBoundingClientRect();

    cursorX -= rectangle.left;
    cursorY -= rectangle.top;

    if (cursorX < 0 || cursorX > rectangle.width) {
        return null;
    }

    if (cursorY < 0 || cursorY > rectangle.height) {
        return null;
    }

    var cellX = Math.floor(cursorX / this.CELL);
    var cellY = Math.floor(cursorY / this.CELL);

    return [cellX, cellY];
}