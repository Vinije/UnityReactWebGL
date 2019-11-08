var Draw = {};


Draw.all = function(){
    var htmlTable = "<table>";
    for (let r = 0; r < Board.length; r++) {
        htmlTable += "<tr>";                      
        for (let c = 0; c < Board.length; c++) {
            htmlTable += "<td>";
            htmlTable += Draw.atoms(Board[r][c]);                      
            htmlTable += "</td>";
        }
        htmlTable += "</tr>";    
    }
    htmlTable += "</table>";

    document.body.innerHTML = htmlTable;
};

Draw.getPosition = function(node){
    if (node.nodeName != "TD") {
        return null;
    }

    var x = 0;
    while(node.previousSibling){
        x++;
        node = node.previousSibling;
    }

    var row = node.parentNode;

    var y = 0;
    
    while(row.previousSibling){
        y++;
        row = row.previousSibling;
    }

    return [y,x];
}

Draw.atoms = function(count){
    var result = "";
    for (let index = 0; index < count; index++) {
        result+="o";
    }

    return result;
}