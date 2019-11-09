var Player = {};

Player.listen = function(){
    document.body.addEventListener("click", Player.click);
}

Player.startListening = function(){
    document.body.addEventListener("click", Player.click);
}

Player.stopListening = function(){
    document.body.removeEventListener("click", Player.click);
}

Player.click = function(e){
    var position = Draw.getPosition(e.clientX, e.clientY);
    if (!position) {
        return;
    }
    Board.addAtom(position[0], position[1]);
}