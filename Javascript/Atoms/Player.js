var Player = function(name, color){

    this._color = color;
    this._name = name;

    this._score = document.createElement("span");

    var node = document.createElement("p");
    node.style.color = color;
    node.appendChild(document.createTextNode(name.toString()+": ")); 
    node.appendChild(this._score);
    
    document.body.appendChild(node);
}

Player.prototype.getColor = function(){
    return this._color;
}

Player.prototype.setScore = function(score){
    this._score.innerHTML = score;
}

Player.prototype.play = function(board, draw, callback){
}


/**Human player */
Player.Human = function(name, color){
    Player.call(this, name, color);
}

Player.Human.prototype = Object.create(Player.prototype);

Player.Human.prototype.play = function(board, draw, callback){
    this._draw = draw;
    this._callback = callback;

    document.body.addEventListener("click", this);
}

Player.Human.prototype.handleEvent = function(e){
    var xy = new XY(e.clientX, e.clientY);

    var position = this._draw.getPosition(xy);
    if (!position) {
        return;
    }

    document.body.removeEventListener("click", this);

    this._callback(position);
}


/**AI player */

Player.AI = function(name, color){
    Player.call(this, name, color);
}

Player.AI.prototype = Object.create(Player.prototype);

Player.AI.prototype.play = function(board, draw, callback){
    this._draw = draw;
    this._callback = callback;

    var available = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
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