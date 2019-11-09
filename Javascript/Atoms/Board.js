var Board = {
    _data: [],
    DELAY: 600,
    _criticals: []
}

Board.init = function(){
    for (let r = 0; r < Game.SIZE; r++) {
        this._data.push([]);
        for (let c = 0; c < Game.SIZE; c++) {
            var limit = this._getLimit(r,c);
            var cell = {
                atoms: 0,
                limit: limit
            }
            this._data[r].push(cell);
        }  
    }
}

Board.getAtoms = function(x,y){
    return this._data[x][y].atoms;
}

Board.addAtom = function(x,y){
    this._addAndCheck(x,y);

    if (this._criticals.length > 0) {
        Player.stopListening();
        this._explode();
        
    }
}


Board._explode = function(){
    var explodingCell = this._criticals.shift();
    
    var x = explodingCell[0];
    var y = explodingCell[1];

    var neighbours = this._getNeighbours(x,y);

    var cell = this._data[x][y];

    cell.atoms -= neighbours.length;

    Draw._cell(x,y);

    neighbours.forEach(element => {
        this._addAndCheck(element[0], element[1]);
    });

    if (this._criticals.length > 0) {
        setTimeout(() => {
           Board._explode(); 
        }, this.DELAY);
    }
    else{
        Player.startListening();
    }
}

Board._addAndCheck = function(x,y){
    var cell = this._data[x][y];    
    cell.atoms += 1;

    if (cell.atoms > cell.limit) {
        this._criticals.push([x,y]);
    }

    Draw._cell(x,y);
}

Board._getNeighbours = function(x,y){
    var neighbours = [];

    if (x>0) { neighbours.push([x-1, y]);}
    if (x<Game.SIZE-1) { neighbours.push([x+1, y]);}
    if (y>0) { neighbours.push([x, y-1]);}
    if (y<Game.SIZE-1) { neighbours.push([x, y+1]);}

    return neighbours;
}

Board._getLimit = function(x,y){

    var limit = 4;
    if (x==0 || x == Game.SIZE-1) {limit--;}
    if (y==0 || y == Game.SIZE-1) {limit--;}

    return limit;
}
