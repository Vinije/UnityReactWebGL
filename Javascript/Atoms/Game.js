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
    
    _isOver(scores) {
        return (Math.max.apply(Math, scores) == Game.SIZE * Game.SIZE);
    }
    _askPlayer() {
        var player = this._players[this._currentPlayer];
        player.play(this._board, this._draw, this._playerDone.bind(this));
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
    _turnDone(scores) {
        for (let i = 0; i < this._players.length; i++) {
            this._players[i].setScore(scores[i]);
        }
        this._currentPlayer = (this._currentPlayer + 1) % this._players.length;
        if (!this._isOver(scores)) {
            this._askPlayer();
        }
    }
}

Game.SIZE = 5;