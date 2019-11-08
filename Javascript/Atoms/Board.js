var Board = {
    _data: []
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

    var cell = this._data[x][y];

    cell.atoms +=1;

    if (cell.atoms > cell.limit) {
        var neighbours = this._getNeighbours(x,y);

        cell.atoms -= neighbours.length;

        neighbours.forEach(element => {
            this.addAtom(element[0], element[1]);
        });
    }
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
