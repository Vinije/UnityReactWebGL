'use strict';

let gl;

function updateClearColor(...color){
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0,0,0,0);
}

function checkKey(event){

    switch(event.keyCode){

        case 49: {
            updateClearColor(0.2,0.2,0.2,1.0);
            break;
        }

        case 50: {
            updateClearColor(1.0,0.2,0.2,1.0);
            break;
        }

        case 51: {
            const color = gl.getParameter(gl.COLOR_CLEAR_VALUE);
            
            alert(`Clear color = (
                ${color[0].toFixed(1)},
                ${color[1].toFixed(1)},
                ${color[2].toFixed(1)}
            )`);

            window.focus();
            break;
        }

    }

}

function init()
{
    const canvas = document.getElementById("webgl-canvas");

    if(!canvas){
        console.error("HTML5 does no exist!!");
        return;
    }

    gl = canvas.getContext('webgl2');

    const message = gl ? "Hooray!" : "Whoops no webgl 2";

    //gl.clearColor(0.0,0.0,0.0,1);
    alert(message);

    window.onkeydown = checkKey;
}

window.onload = init;