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

			{ v1: 0, v2: 1, v3: 2, r: 0, g: 255, b: 0, a: 0, zbuffer: 1}, 
			{ v1: 0, v2: 2, v3: 3, r: 0, g: 255, b: 0, a: 0, zbuffer: 1}, 

			{ v1: 6, v2: 5, v3: 4, r: 0, g: 255, b: 0, a: 0, zbuffer: 1}, 
			{ v1: 7, v2: 6, v3: 4, r: 0, g: 255, b: 0, a: 0, zbuffer: 1}, 

			{ v1: 3, v2: 2, v3: 6, r: 0, g: 000, b: 255, a: 0, zbuffer: 1}, 
			{ v1: 3, v2: 6, v3: 7, r: 0, g: 000, b: 255, a: 0, zbuffer: 1}, 

			{ v1: 5, v2: 1, v3: 0, r: 0, g: 000, b: 255, a: 0, zbuffer: 1}, 
			{ v1: 4, v2: 5, v3: 0, r: 0, g: 000, b: 255, a: 0, zbuffer: 1}, 

			{ v1: 3, v2: 7, v3: 4, r: 255, g: 000, b: 000, a: 0, zbuffer: 1}, 
			{ v1: 3, v2: 4, v3: 0, r: 255, g: 000, b: 000, a: 0, zbuffer: 1}, 

			{ v1: 6, v2: 2, v3: 5, r: 255, g: 000, b: 000, a: 0, zbuffer: 1}, 
			{ v1: 2, v2: 1, v3: 5, r: 255, g: 000, b: 000, a: 0, zbuffer: 1}, 



		]

		init = false;

	};
//------------------------------------------------------------------------------
// Function definitions
//------------------------------------------------------------------------------


function remap(x, oMin, oMax, nMin, nMax) {
	//range check
	if (oMin == oMax) {
		console.log("Warning: Zero input range");
		return None;
	};

	if (nMin == nMax) {
		console.log("Warning: Zero output range");
		return None
	}

	//check reversed input range
	var reverseInput = false;
	oldMin = Math.min(oMin, oMax);
	oldMax = Math.max(oMin, oMax);
	if (oldMin != oMin) {
		reverseInput = true;
	}

	//check reversed output range
	var reverseOutput = false;
	newMin = Math.min(nMin, nMax)
	newMax = Math.max(nMin, nMax)
	if (newMin != nMin) {
		reverseOutput = true;
	};

	var portion = (x - oldMin) * (newMax - newMin) / (oldMax - oldMin)
	if (reverseInput) {
		portion = (oldMax - x) * (newMax - newMin) / (oldMax - oldMin);
	};

	var result = portion + newMin
	if (reverseOutput) {
		result = newMax - portion;
	}
};


function random_rgba() {
	var o = Math.round,
		r = Math.random,
		s = 255;
	return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

function perspective_projection(points, screenpoints) {
	points.forEach(p => {
		var c = 500;
		x = p.x / (1 - p.z / c) ;
		y = p.y / (1 - p.z / c) ;
		screenpoints.push({
			x: x,
			y: y,
			z: z
		});
	});
}

function ortographic_projection(points,screenpoints) {
	points.forEach( p => {
		screenpoints.push({x: p.x, y: p.y, z: p.z });
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
				// //normalize
				// var len = Math.sqrt(p.x * p.x + p.y * p.y)
				// p.x /= len;
				// p.y /= len;

				// p.x *= zoom;
				// p.y *= zoom;

				// to screen
				
				p.x = p.x * width;
				p.y = p.y * height;

				if (p.x == width) { p.x = width - 1 };
				if (p.y == height) { p.y = height - 1 };
		});
}







function fillTriangle(imageData, v0, v1, v2) {
	var minX = Math.floor(Math.min(v0.x, v1.x, v2.x));
	var maxX = Math.ceil(Math.max(v0.x, v1.x, v2.x));
	var minY = Math.floor(Math.min(v0.y, v1.y, v2.y));
	var maxY = Math.ceil(Math.max(v0.y, v1.y, v2.y));

	var imageData = imageData.data;
	var width = imageData.width;

				for (var i = 0; i < imageData.length; i += 4) {
					imageData[i + 0] = 255;
					imageData[i + 1] = 255;
					imageData[i + 2] = 0;
					imageData[i + 3] = 255;
				}

	// p is our 2D pixel location point
	var p = {};

	for (var y = minY; y < maxY; y++) {
		for (var x = minX; x < maxX; x++) {
			// sample from the center of the pixel, not the top-left corner
			p.x = x + 0.5;
			p.y = y + 0.5;

			// if the point is not inside our polygon, skip fragment
			if (cross(v1, v2, p) < 0 || cross(v2, v0, p) < 0 || cross(v0, v1, p) < 0) {
				continue;
			}

			// set pixel
			var index = (y * width + x) * 4;
			imageData[index] = 255;
			imageData[index + 1] = 255;
			imageData[index + 2] = 255;
			imageData[index + 3] = 255;
		}
	}
	context.putImageData(imageData, width, height);
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

		var gradient = context.createLinearGradient(0, 0, 170, 0);


		triangles.forEach(triangle => {


			context.strokeStyle = 'WHITE';
			context.strokeText('Zbuffer', -220, -550 + offset_y);
			context.strokeText([offset_y/20+1,triangle.zbuffer, triangle.zangle], -100, -550 + offset_y);
			offset_y = offset_y + 20;

			context.fillStyle   = 'rgb(' + triangle.r + ', ' + triangle.g + ', ' + triangle.b + ')';
			context.strokeStyle = 'rgb(' + triangle.r + ', ' + triangle.g + ', ' + triangle.b + ')';
			context.lineWidth = 0;
			context.strokeStyle = 'rgba(0,0,0,1)';

			var imageData = context.createImageData(width, height);




			fillTriangle(imageData, triangle.v1, triangle.v2, triangle.v3);
			context.putImageData(imageData, 10, 10);

// 			if (triangle.zbuffer == true ) {
// 				context.beginPath(); // pick up "pen," reposition
// 				context.moveTo(screenpoints[triangle.v1].x, screenpoints[triangle.v1].y);
// 				context.lineTo(screenpoints[triangle.v2].x, screenpoints[triangle.v2].y); // draw straight across to right
// 				context.lineTo(screenpoints[triangle.v3].x, screenpoints[triangle.v3].y); // draw straight across to right
// 				context.closePath(); // connect end to start
// 				context.fill(); // connect and fill
// //				context.stroke(); // outline the shape that's been described
// 			}
// 			context.moveTo(0,0)
		});
};


function crossProduct(a, b) {
	return {
		x: a.y * b.z - a.z * b.y,
		y: a.z * b.x - a.x * b.z,
		z: a.x * b.y - a.y * b.x
	};
}


function isCcw(v0, v1, v2) {
	return (v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x) >= 0;
}


function backfaceCulling3(triangles, screenpoints) {
	//https://kitsunegames.com/post/development/2016/07/11/canvas3d-3d-rendering-in-javascript/
	triangles.forEach(triangle => {

			context.strokeText('screenpoint', -350, -230);
			context.strokeText([screenpoints[triangle.v1].x], -250, -230);
			
			triangle.zbuffer = isCcw(screenpoints[triangle.v1], screenpoints[triangle.v2], screenpoints[triangle.v3])
	});
}
function calcLight(triangles,screenpoints)
{
	//Cross Product of X = (y1*z2) - (z1-y2)


//	x1 = points[1]
	triangles.forEach(triangle=>{

		// So for a triangle p1, p2, p3,
		p1x = points[triangle.v1].x;
		p1y = points[triangle.v1].y;
		p1z = points[triangle.v1].z;

		p2x = points[triangle.v2].x;
		p2y = points[triangle.v2].y;
		p2z = points[triangle.v2].z;

		p3x = points[triangle.v3].x;
		p3y = points[triangle.v3].y;
		p3z = points[triangle.v3].z;

		// if the vector U = p2 - p1 and the vector V = p3 - p1 
		Ux = p2x - p1x;
		Uy = p2y - p1y;
		Uz = p2z - p1z;
		
		Vx = p3x - p1x;
		Vy = p3y - p1y;
		Vz = p3z - p1z;


		// then the normal N = U x V and can be calculated by:
		Nx = Uy*Vz - Uz*Vy;
		Ny = Uz*Vx - Ux*Vz;
		Nz = Ux*Vy - Uy*Vx;

		//annnnd scale
		Nx /= 300;
		Ny /= 300;
		Nz /= 300;

		context.strokeText('U', -350, -270);
		context.strokeText([Ux, Uy, Uz], -200, -270);

		context.strokeText('V', -350, -290);
		context.strokeText([Vx, Vy, Vz], -200, -290);

		context.strokeText('cross product', -350, -250);
		context.strokeText([Nx, Ny, Nz], -200, -250);


		n = normalize(Nx,Ny,Nz);
		Nx = n[0];
		Ny = n[1];
		Nz = n[2];
		pi=3.1415;
		context.strokeText('normalised cross product', -350, -230);
				context.strokeText([Nx, Ny, Nz], -200, -230);



	triangle.zangle = Nz;
	triangle.r = triangle.r * Nz;
	triangle.g = triangle.g * Nz;
	triangle.b = triangle.b * Nz;



	});

}


function normalize(x, y, z) {
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


function checkBehind(triangle, screenpoints) {

	//get two sides of the triangle
	ax = screenpoints[triangle.v1].x;
	ay = screenpoints[triangle.v1].y;
	az = screenpoints[triangle.v1].z;

	bx = screenpoints[triangle.v2].x;
	by = screenpoints[triangle.v2].y;
	bz = screenpoints[triangle.v2].z;

	cx = screenpoints[triangle.v3].x;
	cy = screenpoints[triangle.v3].y;
	cz = screenpoints[triangle.v3].z;

	n = normalize(ax, ay, az);
	ax = n[0];
	ay = n[1];
	az = n[2];

	n = normalize(bx, by, bz);
	bx = n[0];
	by = n[1];
	bz = n[2];

	n = normalize(cx, cy, cz);
	cx = n[0];
	cy = n[1];
	cz = n[2];

	cax = cx - ax;
	cay = cy - ay;
	bcx = bx -cx;
	bcy = by - cy;

	zbuffer = cax * bcy - cay * bcx
	zbuffer = Math.round(zbuffer * 10) / 10;

	return(zbuffer);

}


function backfaceCulling(triangles) {
	triangles.forEach(triangle => {
			triangle.zbuffer = checkBehind(triangle, screenpoints);
			triangle.color = remap(triangle.zbuffer, -0.9, 0.9, 0, 255 );
			triangle.color = triangle.zbuffer * 255;

		})

};

function renderLight(triangles) {
	triangles.forEach(triangle => {

		// triangle.zbuffer, oMin, oMax, nMin, nMax

	});
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
		rotateY(points, (angle * 225) / 180.0);
		rotateZ(points, (angle * 100) / 180.0);



    perspective_projection(points,screenpoints);
		backfaceCulling3(triangles, screenpoints);

		//backfaceCulling(triangles, points);

//  ortographic_projection(points, screenpoints);
		calcLight(triangles);
		drawTriangles(triangles, screenpoints);
//	drawPoints(screenpoints);

    context.stroke();


//------------------------------------------------------------------------------

};
 
