class Board {
    constructor(draw, players) {
        this.DELAY = 600;
        this.onTurnDone = function () { };
        this._data = [];
        this._draw = draw;
        this._players = players;
        this._criticals = [];
        this._scores = [];
        for (let i = 0; i < players.length; i++) {
            this._scores.push(0);
        }
        this._build();
    }
    _build() {
        for (let r = 0; r < Game.SIZE; r++) {
            this._data.push([]);
            for (let c = 0; c < Game.SIZE; c++) {
                var xy = new XY(r, c);
                var limit = this._getLimit(xy);
                var cell = {
                    atoms: 0,
                    limit: limit,
                    player: null
                };
                this._data[r].push(cell);
            }
        }
    }
    getPlayer(xy) {
        return this._data[xy.x][xy.y].player;
    }
    getAtoms(xy) {
        return this._data[xy.x][xy.y].atoms;
    }
    
    addAtom(xy, player) {
        this._addAndCheck(xy, player);

        if (Game.isOver(this._scores)) {
            this.onTurnDone();
        }
        else if (this._criticals.length > 0) {
            this._explode();
        }
        else {
            this.onTurnDone();
        }
    }
    
    _explode() {
        var explodingCell = this._criticals.shift();
        var xy = explodingCell;
        var neighbours = xy._getNeighbours();
        var cell = this._data[xy.x][xy.y];
        cell.atoms -= neighbours.length;
        if (cell.atoms < 0) {
            debugger;
        }

        if (this._draw) {
            this._draw._cell(xy, this.getAtoms(xy), cell.player);    
        }
        
        neighbours.forEach(element => {
            this._addAndCheck(element, cell.player);
        });

        if (Game.isOver(this._scores)) {
            this.onTurnDone();
        }
        else if (this._criticals.length > 0 && this._draw) {
            setTimeout(this._explode.bind(this), this.DELAY);
        }
        else if (this._criticals.length > 0) {
            this._explode();
        }
        else {
            this.onTurnDone();
        }
    }
    _addAndCheck(xy, player) {
        var cell = this._data[xy.x][xy.y];
        if (cell.player) {
            var oldPlayerIndex = this._players.indexOf(cell.player);
            this._scores[oldPlayerIndex]--;
        }
        var playerIndex = this._players.indexOf(player);
        this._scores[playerIndex]++;
        cell.atoms += 1;

        cell.player = player;
        
        if (this._draw) {
            this._draw._cell(xy, this.getAtoms(xy), player);    
        }
        
        if (cell.atoms > cell.limit) {
            for (let i = 0; i < this._criticals.length; i++) {
                var critXY = this._criticals[i];
                
                if (critXY.x == xy.x && critXY.y == xy.y){
                    return;
                }
            }
            this._criticals.push(xy);
        }
    }
    _getLimit(xy) {
        var limit = 4;
        if (xy.x == 0 || xy.x == Game.SIZE - 1) {
            limit--;
        }
        if (xy.y == 0 || xy.y == Game.SIZE - 1) {
            limit--;
        }
        return limit;
    }

    clone(){
        var boardClone = new Board(null, this._players);

        boardClone._scores = this._scores.slice(0);

        for (let i = 0; i < Game.SIZE; i++) {
            for (let j = 0; j < Game.SIZE; j++) {
                var xy = new XY(i,j);
                var cell = this._data[xy.x][xy.y];
                var cellClone = boardClone._data[xy.x][xy.y];

                cellClone.player = cell.player;
                cellClone.atoms = cell.atoms;
            }          
        }

        return boardClone;
    }

    getScoreFor(player){
        var index = this._players.indexOf(player);
        return this._scores[index];
    }
}










