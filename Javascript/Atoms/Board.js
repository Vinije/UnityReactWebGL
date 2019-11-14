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
                limit: limit,
                player: -1
            }
            this._data[r].push(cell);
        }  
    }
}

Board.getPlayer = function(x,y){
    return this._data[x][y].player;
}

Board.getAtoms = function(x,y){
    return this._data[x][y].atoms;
}

Board.addAtom = function(x,y,player){
    this._addAndCheck(x,y,player);
    
    if(Score.isGameOver()){
        return;
    }
    else if (this._criticals.length > 0) {
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

    if (cell.atoms < 0) {
        debugger;
    }

    Draw._cell(x,y);

    neighbours.forEach(element => {
        this._addAndCheck(element[0], element[1], cell.player);
    });

    if(Score.isGameOver()){
        return;
    }
    else if (this._criticals.length > 0) {
        setTimeout(() => {
           Board._explode(); 
        }, this.DELAY);
    }
    else{
        Player.startListening();
    }
}

Board._addAndCheck = function(x,y, player){
    var cell = this._data[x][y];   

    Score.removePoint(cell.player);
    Score.addPoint(player);

    cell.atoms += 1;
    cell.player = player;

    Draw._cell(x,y);

    if (cell.atoms > cell.limit) {
        for (let i = 0; i < this._criticals.length; i++) {
            var critX = this._criticals[i][0];
            var critY = this._criticals[i][1];
            if(critX==x && critY==y) return;          
        }
        this._criticals.push([x,y]);
    }
}

Board._getLimit = function(x,y){

    var limit = 4;
    if (x==0 || x == Game.SIZE-1) {limit--;}
    if (y==0 || y == Game.SIZE-1) {limit--;}

    return limit;
}
