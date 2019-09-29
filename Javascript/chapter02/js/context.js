'use strict';

let gl, program, squareVAO, squareIndexBuffer, indices;
let model, coneVAO, 
modelMatrix = mat4.create(),
projMatrix = mat4.create(),
parts = [];


function updateClearColor(...color){
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0,0,0,0);
    drawParts();
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


    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Could not initialize shaders');
    }

    // Use this program instance
    gl.useProgram(program);

    program.uProjMatrix = gl.getUniformLocation(program, 'uProjMatrix');
    program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.uModelColor = gl.getUniformLocation(program, 'uModelColor');

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

function loadMoreParts(filePath){

    for (let i = 1; i < 179; i++) {
        console.log(`${filePath}/part${i}.json`);
        fetch(`${filePath}/part${i}.json`)
        .then(res => res.json())
        .then(data => {

          // Create a VAO
          const vao = gl.createVertexArray();

          // Bind VAO
          gl.bindVertexArray(vao);

          // VBO
          const vertexBufferObject = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertices), gl.STATIC_DRAW);

          // Configure instructions
          gl.enableVertexAttribArray(program.aVertexPosition);
          gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

          // IBO
          const indexBufferObject = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.indices), gl.STATIC_DRAW);

          // Attach them for later access
          data.vao = vao;
          data.ibo = indexBufferObject;

          // Push data onto parts array
          parts.push(data);

          // Clean
          gl.bindVertexArray(null);
          gl.bindBuffer(gl.ARRAY_BUFFER, null);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        })
        .catch(error => {console.error(error)});
    }
}

function load(filePath){

    return fetch(filePath)
    .then(res => res.json())
    .then(data =>{

        //load data from server
        //assign data for later reference
        model = data;

        console.log(data);

        coneVAO = gl.createVertexArray();
        gl.bindVertexArray(coneVAO);

        //set color uniform 
        gl.uniform3fv(program.uModelColor, model.color);

        const modelVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);

        //configure instructions for VAO
        
        gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0,0);
        gl.enableVertexAttribArray(program.aVertexPosition);

        squareIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    })
    .catch(error => {console.error(error)}) ;
}


function draw(){

    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    //set matrices
    mat4.perspective(projMatrix, 45.0, gl.canvas.width / gl.canvas.height, 0.1, 10000);
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [0,0,-5.0]);

    gl.uniformMatrix4fv(program.uProjMatrix, false, projMatrix);
    gl.uniformMatrix4fv(program.uMVMatrix, false, modelMatrix);

    //bind buffers
    gl.bindVertexArray(coneVAO);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);

    //draw
    gl.drawElements(gl.LINES, model.indices.length, gl.UNSIGNED_SHORT, 0);

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function drawParts(){

    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    //set matrices
    mat4.perspective(projMatrix, 45, gl.canvas.width / gl.canvas.height, 10, 10000);
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [-10, 0, -100]);
    mat4.rotate(modelMatrix, modelMatrix, 30 * Math.PI / 180, [1, 0, 0]);
    mat4.rotate(modelMatrix, modelMatrix, 30 * Math.PI / 180, [0, 1, 0]);

    gl.uniformMatrix4fv(program.uProjMatrix, false, projMatrix);
    gl.uniformMatrix4fv(program.uMVMatrix, false, modelMatrix);

    // Iterate over every part inside of the `parts` array
    parts.forEach(part => {
        // Bind
        gl.bindVertexArray(part.vao);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, part.ibo);

        // Draw
        gl.drawElements(gl.LINES, part.indices.length, gl.UNSIGNED_SHORT, 0);

        // Clean
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    });
}

function render(){
    requestAnimationFrame(render);
    drawParts();
}

function init()
{
    const canvas = utils.getCanvas('webgl-canvas');
    
    utils.autoResizeCanvas(canvas);

    if(!canvas){
        console.error("HTML5 does no exist!!");
        return;
    }

    gl = utils.getGLContext(canvas);
    gl.clearColor(0,0,0,1);
    gl.enable(gl.DEPTH_TEST);

    initProgram();
    loadMoreParts('common/models/nissan-gtr');
    render();
    
    

    window.onkeydown = checkKey;
}

window.onload = init;