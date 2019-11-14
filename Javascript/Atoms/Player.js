var Player = {
    current: 0
};

Player.listen = function(){
    document.body.addEventListener("click", Player);
}

Player.startListening = function(){
    document.body.addEventListener("click", Player);
}

Player.stopListening = function(){
    document.body.removeEventListener("click", Player.click);
}

Player.handleEvent = function(e){
    var cursor = new XY(e.clientX, e.clientY);
    var position = Draw.getPosition(cursor);
    if (!position) {
        return;
    }

    var existing = Board.getPlayer(position[0],position[1]);
    if (existing!=-1 && existing != this.current) {
        return;
    }

    Board.addAtom(position[0], position[1], this.current);

    this.current = (this.current + 1) % Score.getPlayerCount();
}