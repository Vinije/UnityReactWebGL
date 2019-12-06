class Game {
    constructor(players) {
        this._players = players;
        this._currentPlayer = 0;
        this._draw = new Draw();
        this._draw.init();
        this._board = new Board(this._draw, this._players);
        this._board.onTurnDone = this._turnDone.bind(this);
        this._askPlayer();
    }
    
    _askPlayer() {
        var player = this._players[this._currentPlayer];
        if(player.canPlay(this._board)){
            player.play(this._board, this._draw, this._playerDone.bind(this));
        }
        else{ 
            this._turnDone(this._board._scores);
        }
    }
    _playerDone(xy) {
        var existing = this._board.getPlayer(xy);
        if (existing == null || existing == this._players[this._currentPlayer]) {
            this._board.addAtom(xy, this._players[this._currentPlayer]);
        }
        else {
            this._askPlayer();
        }
    }
    _turnDone() {
        var scores = [];

        for (let i = 0; i < this._players.length; i++) {
            let score = this._board.getScoreFor(this._players[i]);
            this._players[i].setScore(score);
            scores.push(score);
        }

        this._currentPlayer = (this._currentPlayer + 1) % this._players.length;
        if (!Game.isOver(scores)) {
            this._askPlayer();
        }else{
            alert("Game is over!!");
        }
    }
}

Game.SIZE = 6;

Game.isOver = function(scores){
    return (Math.max.apply(Math, scores) == Game.SIZE * Game.SIZE);
}