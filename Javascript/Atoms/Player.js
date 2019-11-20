class Player {
    constructor(name, color) {
        this._color = color;
        this._name = name;
        this._score = document.createElement("span");
        var node = document.createElement("p");
        node.style.color = color;
        node.appendChild(document.createTextNode(name.toString() + ": "));
        node.appendChild(this._score);
        document.body.appendChild(node);
    }
    getColor() {
        return this._color;
    }
    setScore(score) {
        this._score.innerHTML = score;
    }
    canPlay(board) {
        for (let i = 0; i < Game.SIZE; i++) {
            for (let j = 0; j < Game.SIZE; j++) {
                var player = board.getPlayer(new XY(i, j));
                if (player == this || !player) {
                    return true;
                }
            }
        }
        return false;
    }

    play(board, draw, callback) {}
}

class PlayerHuman extends Player{
    constructor(name, color){
        super(name, color);
    }

    play(board, draw, callback){
        this._draw = draw;
        this._callback = callback;

        document.body.addEventListener("click", this);
    }

    handleEvent(e){
        var xy = new XY(e.clientX, e.clientY);

        var position = this._draw.getPosition(xy);
        if (!position) {
            return;
        }
    
        document.body.removeEventListener("click", this);
    
        this._callback(position);
    }
}

class PlayerAI extends Player{

    constructor(name, color){
        super(name, color);
    }

    //simulateTurn(tmpBoard)

    play(board, draw, callback){
        this._draw = draw;
        this._callback = callback;
    
        var available = [];
        for (let i = 0; i < Game.SIZE; i++) {
            for (let j = 0; j < Game.SIZE; j++) {
                var xy = new XY(i,j);
                var player = board.getPlayer(xy);
                if (player == null || player == this) {
                    available.push(xy);
                }
            }      
        }
    
        var index = Math.floor(Math.random()*available.length);
        this._callback(available[index]);
    }
}
