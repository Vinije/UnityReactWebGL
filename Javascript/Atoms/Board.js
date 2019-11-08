var Board = [];

var N = 6;

//dvourozmerne pole vyplnene nulami 
for (let r = 0; r < N; r++) {
    Board.push([]);
    for (let c = 0; c < N; c++) {
        Board[r].push(0);
    }  
}