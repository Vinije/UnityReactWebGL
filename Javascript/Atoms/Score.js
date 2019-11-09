var Score = {
    _players: [
        {
            color: "blue",
            name: "Blue player",
            node: null,
            score: 0
        },
        {
            color: "red",
            name: "Red player",
            node: null,
            score: 0
        }
    ],
    _gameOver: false
}

Score.init = function(){
    for (let i = 0; i < this._players.length; i++) {
        var obj = this._players[i];
        obj.node = document.createElement('span');
        obj.node.innerHTML = obj.score;
        
        var p = document.createElement("p");
        p.style.color = obj.color;
        p.appendChild(document.createTextNode(obj.name+ ": "));
        p.appendChild(obj.node);

        document.body.appendChild(p);
    }
}


Score.getColor = function(player){
    return this._players[player].color;
}

Score.isGameOver = function(){
    return this._gameOver;
}

Score.getScore = function(player){
    return this._players[player].score;
}

Score.getPlayerCount = function(){
    return this._players.length;
}

Score.removePoint = function(player){
    if (player == -1) {
        return;
    }

    var obj = this._players[player];
    obj.score--;
    obj.node.innerHTML = obj.score;
}

Score.addPoint = function(player){
    var obj = this._players[player];

    obj.score++;

    obj.node.innerHTML = obj.score;

    if (obj.score == Game.SIZE * Game.SIZE) {
        this._gameOver = true;
        alert("GameOver, Bitch!!!");
    }
}