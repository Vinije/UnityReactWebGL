var Game = {
    SIZE: 5
};

Game.start = function(){
    Board.init();
    Draw.init();
    Score.init();
    Player.startListening();
}