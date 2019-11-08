var Player = {};


Player.listen = function(){
    document.body.addEventListener("click", Player.click);
}

Player.click = function(e){
    var position = Draw.getPosition(e.target);
    if (!position) {
        return;
    }

    console.log(position[0]+" "+position[1]);

    Board[position[0]][position[1]]++;
    Draw.all();
}