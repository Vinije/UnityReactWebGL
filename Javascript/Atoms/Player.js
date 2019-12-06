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

    simulateTurn(tmpBoard, xy){

        tmpBoard.addAtom(xy);

    }


    play(board, draw, callback){
        this._draw = draw;
        this._callback = callback;

        let bestScore = 0;
        let bestScores = [];
        let bestPositions = [];
    
        var available = [];
        for (let i = 0; i < Game.SIZE; i++) {
            for (let j = 0; j < Game.SIZE; j++) {
                let xy = new XY(i,j);
                let score;
                let player = board.getPlayer(xy);
                if (player == null || player == this) {
                    var boardClone = board.clone();
                    boardClone.addAtom(xy, this);
                    score = boardClone.getScoreFor(this);
                    if (score >= bestScore) {
                        bestScore = score;
                        bestScores.push(bestScore);
                        bestPositions.push(xy);
                    }
                }
            }      
        }
        
        var bestPosition = this._pickBestPosition(bestScores, bestPositions);

        this._callback(bestPosition);
    }

    _pickBestPosition(scores, positions){
        var bestPositions = [];
        var bestScore = Math.max.apply(Math, scores);
        
        for (let i = 0; i < positions.length; i++) {
            var score = scores[i];
            var pos = positions[i];
            
            if (score == bestScore) {
                bestPositions.push(pos);
            }
        }

        return bestPositions[Math.floor(Math.random()*bestPositions.length)];
    }
}
