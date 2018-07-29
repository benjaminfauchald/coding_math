window.onload = function update() {

    // Get canvas and context etc
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),

    //width = canvas.width = 512,
    //height = canvas.height = 0 | height * innerWidth / innerHeight,

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    imagedata = context.createImageData(width, height);

		i=0;
	init = true;

	//Add break point so you can read debug values if you click the mouse
	canvas.addEventListener('mousedown', function (event) {
		breakpoint = true;
	}, false);
	canvas.addEventListener('mouseup', function (event) {
		breakpoint = false;
	}, false);




requestAnimationFrame(update);
    //init
    if (!window.time) {
        time = 0;
        frame = 0;
        timeNextFrame = 0;
        angle = 0;
		zoom = 200;

		angleX = 0;
		angleY = 0;
		angleZ = 0;
		xrot = 0;

		init = true;
		breakpoint = false;

    }

    // Vertical blank - Set frame rate to 60fps
    currentTime = performance.now() / 1000;
    while(time < currentTime) {
        while(time < timeNextFrame) {
            time += 1 / 16384;
        }
    frame++;
    timeNextFrame += 1/60;
		}


//------------------------------------------------------------------------------
// Data definitions
//------------------------------------------------------------------------------

if (init==true){


    var points = [
            {x:  100,  y:  100, z: -100},
            {x:  100,  y: -100, z: -100},
            {x: -100,  y: -100, z: -100},
            {x: -100,  y:  100, z: -100},

			{x:  100,  y:  100, z:  100},
            {x:  100,  y: -100, z:  100},
            {x: -100,  y: -100, z:  100},
            {x: -100,  y:  100, z:  100},

					];
		
		var screenpoints = [
		
		]

		var triangles = [

			[7, 6, 4, "#fff"], 
			// [5, 1, 2, "#fff"],


			// [6, 2, 5, "#00f"], [5, 1, 2, "#00f"],
			// [7, 3, 4, "#f0f"], [4, 0, 3, "#f0f"],

			// [0, 1, 2, "#f00"], [0, 3, 2, "#f00"],
			// [4, 5, 7, "#0f0"], [7, 5, 6, "#0f0"],

			// [6, 7, 3, "#0ff"], [3, 2, 6, "#0ff"],
			// [4, 5, 0, "#ff0"], [5, 1, 0, "#f00"],
		]

		init = false;

	};
//------------------------------------------------------------------------------
// Function definitions
//------------------------------------------------------------------------------





function random_rgba() {
	var o = Math.round,
		r = Math.random,
		s = 255;
	return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}


function ortographic_projection(points,screenpoints) {
	points.forEach( p => {
		screenpoints.push({x: p.x, y: p.y, z: p.z});
	});
}

function drawLines(screenpoints) {

		context.beginPath();
		context.moveTo(screenpoints[0].x, screenpoints[0].y);

		screenpoints.forEach(p => {
				context.lineTo(p.x, p.y);
		});
		context.lineTo(points[0].x, points[0].y);
		context.stroke();

};


// x ' = x*cos q - y*sin q
// y ' = x*sin q + y*cos q 
// z ' = z
function rotateZ(points,radian)
{
	points.forEach(p => {
			x = p.x;
			y = p.y;
			p.x = x * Math.cos(radian) - y * Math.sin(radian);
			p.y = x * Math.sin(radian) + y * Math.cos(radian);
		});
};


// y ' = y*cos q - z*sin q
// z ' = y*sin q + z*cos q
// x ' = x
function rotateX(points, radian) {
	points.forEach(p => {
		y = p.y;
		z = p.z;
		p.y = y * Math.cos(radian) - z * Math.sin(radian);
		p.z = y * Math.sin(radian) + z * Math.cos(radian);
	});
};


// z' = z*cos q - x*sin q
// x ' = z*sin q + x*cos q
// y ' = y
function rotateY(points, radian) {
	points.forEach(p => {
		x = p.x;
		z = p.z;
		p.z = z * Math.cos(radian) - x * Math.sin(radian);
		p.x = z * Math.sin(radian) + x * Math.cos(radian);
	});
};




function project(points) {

		points.forEach( p => {
				//normalize
				var len = Math.sqrt(p.x * p.x + p.y * p.y)
				p.x /= len;
				p.y /= len;

				p.x *= zoom;
				p.y *= zoom;

				// to screen
				
				p.x = p.x * width;
				p.y = p.y * height;

				if (p.x == width) { p.x = width - 1 };
				if (p.y == height) { p.y = height - 1 };
		});
}


function project2(points) {

	points.forEach(p => {
		z = p.z;
		p.x /= (p.z * zoom);
		p.y /= (p.z * zoom);

	});

}


function drawPoints(screenpoints, angle) {
	var radius = 20;
	var i=0;
    screenpoints.forEach(p => {
        x=p.x;
        y=p.y;

				// draw ugly circles
        context.beginPath();
        context.fillStyle = '#f0f';
        context.arc(x, y, 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

		context.strokeText([i], p.x , p.y);
		i++;
	});
};

function drawTriangles(triangles, screenpoints) {



		triangles.forEach(triangle => {

			context.fillStyle = triangle[3];
			context.strokeStyle = triangle[3];


			context.moveTo(screenpoints[triangle[0]].x, screenpoints[triangle[0]].y); // pick up "pen," reposition
			context.lineTo(screenpoints[triangle[1]].x, screenpoints[triangle[1]].y); // draw straight across to right
			context.lineTo(screenpoints[triangle[2]].x, screenpoints[triangle[2]].y); // draw straight across to right
			context.closePath(); // connect end to start
		context.fill(); // connect and fill
			context.stroke(); // outline the shape that's been described
		});
};

function normalize(x,y,z) {
	//formula to normalize
	Nx = x;
	Ny = y;
	Nz = z;

	len = Math.sqrt(Nx * Nx + Ny * Ny + Nz * Nz);
	Nx /= len;
	Ny /= len;
	Nz /= len;
	return [Nx, Ny, Nz];
}


function crossProduct(triangle,points)
{
	//Cross Product of X = (y1*z2) - (z1-y2)


//	x1 = points[1]

	x1 = points[triangle[0]].x;
	y1 = points[triangle[0]].y;
	z1 = points[triangle[0]].z;

	x2 = points[triangle[1]].x;
	y2 = points[triangle[1]].y;
	z2 = points[triangle[1]].z;

	x1 = screenpoints[0].x;
	y1 = screenpoints[0].y;
	z1 = screenpoints[0].z;

	x2 = screenpoints[1].x;
	y2 = screenpoints[1].y;
	z2 = screenpoints[1].z;

	//cross product
	Nx = (y1 * z2) - (z1 * y2);
	Ny = z1 * x2 - x1 * z2;
	Nz = (x1 * y2) - (y1 * x2);

	n = normalize(Nx,Ny,Nz);

	Nx = n[0];
	Ny = n[1];
	Nz = n[2];

	Nx = Math.round(Nx * 10) / 10;
	Ny = Math.round(Ny * 10) / 10;
	Nz = Math.round(Nz * 10) / 10;


	context.strokeText( [Nx, Ny, Nz], -200, - 500);


	return[Nx,Ny,Nz];
}




function backfaceCulling(triangles,points) {
	crossProduct(triangles[0],points);
};


//------------------------------------------------------------------------------
//  Render visual
//------------------------------------------------------------------------------

    context.translate(width / 2, height / 2);
    context.strokeStyle = '#fff';
//    context.strokeText([width, height, frame], 0, 0);

	// pause rotation?
	if (breakpoint == false) {
		angle = currentTime;
	};

				rotateX(points, (angle * 50) * Math.PI / 180.0);

    ortographic_projection(points,screenpoints);

     
	drawTriangles(triangles, screenpoints);
	drawPoints(screenpoints);
	backfaceCulling(triangles, points);
	// drawLines(screenpoints);

    context.stroke();


//------------------------------------------------------------------------------

};
 
