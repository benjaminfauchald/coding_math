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
		angleY = 30;
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

			{ v1: 0, v2: 1, v3: 2, color: "#006", zbuffer: 0}, 
			// { v1: 2, v2: 0, v3: 3, color: "#060", zbuffer: 0}, 

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

	var offset_y = 0; 


		triangles.forEach(triangle => {
    		context.strokeStyle = '#fff';
			context.strokeText('Zbuffer', -220, -550 + offset_y);
			context.strokeText([offset_y/20+1,triangle.zbuffer], -250, -550 + offset_y);
			offset_y = offset_y + 20;

			if (triangle.zbuffer >= 0) {
				context.fillStyle = triangle.color;
				context.strokeStyle = triangle.color;

				context.moveTo(screenpoints[triangle.v1].x, screenpoints[triangle.v1].y); // pick up "pen," reposition
				context.lineTo(screenpoints[triangle.v2].x, screenpoints[triangle.v2].y); // draw straight across to right
				context.lineTo(screenpoints[triangle.v3].x, screenpoints[triangle.v3].y); // draw straight across to right
				context.closePath(); // connect end to start
				context.fill(); // connect and fill
				context.stroke(); // outline the shape that's been described
			}

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

	x1 = screenpoints[triangle[1]].x;
	y1 = screenpoints[triangle[1]].y;
	z1 = screenpoints[triangle[1]].z;

	x2 = screenpoints[triangle[2]].x;
	y2 = screenpoints[triangle[2]].y;
	z2 = screenpoints[triangle[2]].z;


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

function checkBehind(triangle, screenpoints) {

	//get two sides of the triangle
	x1 = screenpoints[triangle.v1].x;
	y1 = screenpoints[triangle.v1].y;
	z1 = screenpoints[triangle.v1].z;

	x2 = screenpoints[triangle.v2].x;
	y2 = screenpoints[triangle.v2].y;
	z2 = screenpoints[triangle.v2].z;


	//cross product of these sides
	Nx = (y1 * z2) - (z1 * y2);
	Ny = z1 * x2 - x1 * z2;
	Nz = (x1 * y2) - (y1 * x2);

	//normalize the cross product (im not sure about these sqr and div's?)
	n = normalize(Nx, Ny, Nz);
	Nx = n[0];
	Ny = n[1];
	Nz = n[2];

	Nx = Math.round(Nx * 10) / 10;
	Ny = Math.round(Ny * 10) / 10;
	Nz = Math.round(Nz * 10) / 10;


	context.strokeText([Nx, Ny, Nz], -200, -500);


	return [Nz*-1];
}


function backfaceCulling(triangles) {
	triangles.forEach(triangle => {
			triangle.zbuffer = checkBehind(triangle, screenpoints);

	})

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
	rotateY(points, 45 * Math.PI / 180.0);
	rotateZ(points, 45 * Math.PI / 180.0);

    ortographic_projection(points,screenpoints);

     
	backfaceCulling(triangles, points);
	// drawLines(screenpoints);
	drawTriangles(triangles, screenpoints);
	drawPoints(screenpoints);

    context.stroke();


//------------------------------------------------------------------------------

};
 
