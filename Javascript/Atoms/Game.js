var Game = {
    SIZE: 3
};

Game.start = function(){
    Board.init();
    Draw.init();
    Player.startListening();
}