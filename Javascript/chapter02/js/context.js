'use strict';

let gl, program, squareVAO, squareIndexBuffer, indices;

function updateClearColor(...color){
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0,0,0,0);
    draw();
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

function getShader(id){

    const shaderScript = document.getElementById(id);

    const shaderString = shaderScript.text.trim();

    let shader;
    if(shaderScript.type == "vertex-shader")
        shader = gl.createShader(gl.VERTEX_SHADER);
    else if(shaderScript.type == "fragment-shader")
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    else alert("Non-recognized shader!!!");

    gl.shaderSource(shader, shaderString);

    gl.compileShader(shader);

    // Ensure the shader is valid
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
    }

    return shader;
}

function initProgram(){
    
    const vertexShader = getShader('vertex-shader');
    const fragShader = getShader('fragment-shader');

    program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);

    gl.linkProgram(program);

    // Use this program instance
    gl.useProgram(program);

    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');

}

function initBuffers(){
    const vertices = [
        -0.5,-0.5,0,
        -0.75,0,0,
        0,0.5,0,
        0.75,0,0,
        0.5,-0.5,0
    ];

    indices = [
        1,0,4,
        1,4,2,
        2,4,3
    ];

    //set up VAO
    squareVAO = gl.createVertexArray();
    gl.bindVertexArray(squareVAO);

    //set up VBO
    const squareVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

    //setup IBO
    squareIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    //clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

}


function draw(){

    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    //bind buffers
    gl.bindVertexArray(squareVAO);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);

    //draw
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function init()
{
    const canvas = utils.getCanvas('webgl-canvas');

    if(!canvas){
        console.error("HTML5 does no exist!!");
        return;
    }

    gl = utils.getGLContext(canvas);
    gl.clearColor(0,0,0,1);

    initProgram();
    initBuffers();
    draw();
    

    window.onkeydown = checkKey;
}

window.onload = init;