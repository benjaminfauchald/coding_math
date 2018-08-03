// ---------------------------------------------------------------------------------------------------------------------------
// Setup code for WebGL July 2018 Benjamin Fauchald
// ---------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------
// This is the GLSL langauge for our vertex shader
// ---------------------------------------------------------------------------------------------------------------------------
var vertexShaderText = `
precision mediump float;

attribute vec3 vertPosition;
attribute vec4 vertColor;
varying vec4 fragColor;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
  fragColor = vertColor;
  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
`

// ---------------------------------------------------------------------------------------------------------------------------
// This is the GLSL langauge for our fragment shader
// ---------------------------------------------------------------------------------------------------------------------------
var fragmentShaderText = `
precision mediump float;

varying vec4 fragColor;
uniform vec4 u_color;
void main()
{
  gl_FragColor = vec4(fragColor);
  //gl_FragColor = u_color;
}
`


// ---------------------------------------------------------------------------------------------------------------------------
//									I N I T
// ---------------------------------------------------------------------------------------------------------------------------


var InitDemo = function () {



	
// ---------------------------------------------------------------------------------------------------------------------------
//										D A T A
// ---------------------------------------------------------------------------------------------------------------------------

	var progVertices = [100, -100, -50, 50];

	var vertices = [
		// Top
		// 	X,	 Y, 	Z,	  	R, 	G, 	B, 	  A
		-1.0, 1.0, -1.0, 0, 0, 0.5, 0.5,
		1.0, 1.0, -1.0, 0, 0, 0.5, 0.5,
		1.0, -1.0, -1.0, 0, 0, 0.5, 0.5, -1.0, -1.0, -1.0, 0, 0, 0.5, 0.5,

		// Left
		-1.0, 1.0, 1.0, 0.75, 0.25, 0, 0.5,
		1.0, 1.0, 1.0, 0.75, 0.25, 0, 0.5,
		1.0, -1.0, 1.0, 0.75, 0.25, 0, 0.5, -1.0, -1.0, 1.0, 0.75, 0.25, 0, 0.5,

	];

	var indecies = [
		// draws two triangles for each face
		// front (clockwise) & back (anti clockwise from same view, or rotate towards you to see it clockwise)

        3, 0, 1, 1, 2, 3,
		5, 4, 7, 7, 6, 5,

		4, 0, 3, 3, 7, 4,
		1, 5, 6, 6, 2, 1,

		3, 2, 6, 6, 7, 3,
		0, 4, 5, 5, 1, 0,

		// If you want to see the inside faces you need to do a face for them here or disable culling
		// Example for cube
		// // front
		// 1, 0, 3, //anti clockwise
		// 3, 2, 1,

		// // back
		// 4, 5, 6, // clockwise
		// 6, 7, 4,
	];
    
    
    function addTriangle(radius) {
        p = [{x:0 ,y:0, z:0}];
        vertexIndex1 = 0;
        vertexIndex2 = 0;
        vertexIndex3 = 0;

        //point 1
        p.x = 0 * radius;
        p.y = 1 * radius;
        p.z = 20 * radius;
        vertexIndex1 = vertices.push({x:p.x, y:p.y, z:p.z, r:0, g:0, b:0, a:0.5});

        //point 2
        p.x = -2 * radius;
        p.y = -1 * radius;
        p.z = 20 * radius;
        vertexIndex2 = vertices.push({x:p.x, y:p.y, z:p.z, r:0, g:0, b:0, a:0.5});

        //point 3
        p.x = -2 * radius;
        p.y = -1 * radius;
        p.z = 20 * radius;
        vertexIndex3 = vertices.push({x:p.x, y:p.y, z:p.z, r:0, g:0, b:0, a:0.5});

        indecies.push(
            vertices[vertexIndex1],
            vertices[vertexIndex2],
            vertices[vertexIndex3],
            vertices[vertexIndex1],
        );

        console.log('vertexIndex1 = ' + vertexIndex1);
        console.log('vertexIndex2 = ' + vertexIndex2);
        console.log('vertexIndex3 = ' + vertexIndex3);

        console.log('vertices = ' + vertices);
        console.log('indecies = ' + indecies);


    }


	var gl;
	var canvas = document.getElementById('game-surface');
	gl = canvas.getContext('webgl');

	if (!gl) {	
		console.log('WebGL not supported, falling back on experimental-webgl');	// check for ie etc
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	CreateShadersFromFile(gl);



	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// Create shaders
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}


function bindBuffers(){
    //Create and attach buffers and data
	var boxVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indecies), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		4, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);

	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		4, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
};

    bindBuffers();
	// Tell OpenGL state machine which program should be active.+++-
	gl.useProgram(program);

	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	var xRotationMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);
	var identityMatrix = new Float32Array(16);

	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, 0, -10], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
	mat4.identity(identityMatrix);

	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

var angle = 0;


	// ---------------------------------------------------------------------------------------------------------------------------
	// Functions to be moved
	// ---------------------------------------------------------------------------------------------------------------------------


	// ---------------------------------------------------------------------------------------------------------------------------
	// Main render loop
	// ---------------------------------------------------------------------------------------------------------------------------
	

 var origin = [{x:0, y:0, z:0}];
 addTriangle(1);
	generateSquare(10, origin, vertices, indecies);
	
	var loop = function () {

		angle = performance.now() / 1000 / 6 * 2 * Math.PI;
		mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
		mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
		mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, indecies.length, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);

		/* debug information*/
		// Get canvas and context etc
		var canvas = document.getElementById("canvas");
		var currentTime = performance.now() / 1000;

		var width = 640, height = 480;
		context = canvas.getContext("2d");
		context.clearRect(0, 0, width, height);

		currentTime = Math.round(currentTime * 10) / 10;

		context.font = '20pt arial';
		context.strokeStyle = 'blue';
		context.strokeText('Time: ' + [currentTime], 00, 100);
		context.stroke;

	};
	requestAnimationFrame(loop);
};
