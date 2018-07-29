window.onload = function update() {

    // Get canvas and context etc
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),

    //width = canvas.width = 512,
    //height = canvas.height = 0 | height * innerWidth / innerHeight,

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    imagedata = context.createImageData(width, height);

						init = true;


    requestAnimationFrame(update);
    //init
    if (!window.time) {
        time = 0;
        frame = 0;
        timeNextFrame = 0;
        angle = 0;
				zoom = 200;

				rotationY = 1;
				angleY = 0;

				rotationX = 1;
				angleX = 0;

				rotationZ = 1;
				angleZ = 0;
				init = true;

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

		var connections = [


			[6, 2, 5, "#00f"], [5, 1, 2, "#00f"],
			[7, 3, 4, "#f0f"], [4, 0, 3, "#f0f"],

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
		screenpoints.push({x: p.x, y: p.y});
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
    radius = 20;
    screenpoints.forEach(p => {
        x=p.x;
        y=p.y;

				// draw ugly circles
        context.beginPath();
        context.fillStyle = '#fff';
        context.arc(x, y, 10, 0, Math.PI * 2, true);
        context.closePath();
//        context.fill();
    });
};

function drawConnections(screenpoints,connections){



		connections.forEach( c => {

			context.fillStyle = c[3];
			context.strokeStyle = c[3];


			context.moveTo(screenpoints[c[0]].x, screenpoints[c[0]].y); // pick up "pen," reposition
			context.lineTo(screenpoints[c[1]].x,  screenpoints[c[1]].y); // draw straight across to right
			context.lineTo(screenpoints[c[2]].x, screenpoints[c[2]].y); // draw straight across to right
			context.closePath(); // connect end to start
//		context.fill(); // connect and fill
			context.stroke(); // outline the shape that's been described
		});
};







//------------------------------------------------------------------------------
//  Render visual
//------------------------------------------------------------------------------

    //remeber that this is calculated in radians (optimize this!)



    context.translate(width / 2, height / 2);

    context.strokeStyle = '#fff';
    context.strokeText([width, height, frame], 0, 0);

    var ty=50;
    // Show original points 
    points.forEach(p=>{
        ty = ty + 15 ;
        context.strokeText([p.x, p.y, p.z], 0, ty);
    });


		// angleZ = angleZ + rotationZ;
		// if (angleZ > 360) { angleZ = 0; }
		// var radian = angleZ * Math.PI / 180.0;
		// rotateZ(points, radian);

		 angleX = angleX + rotationX;
		 if (angleX > 360) { angleX = 0; }
		 var radian = angleX * Math.PI / 180.0;
		  rotateX(points, radian);

		angleY = angleY + rotationY;
		if (angleY > 360) { angleY = 0; }
angleY = 30

		var radian = angleY * Math.PI / 180.0;
		rotateY(points, radian);

		ty = ty - 100;
    points.forEach(p => {
        ty = ty + 15;
        context.strokeText([p.x, p.y, p.z], 600, ty);
    });

    ortographic_projection(points,screenpoints);
    ty=ty+100;
    screenpoints.forEach(p => {
        ty = ty + 15;
        context.strokeText([p.x, p.y, p.z], -400, ty-200);
    });



    context.strokeText([angle], 0, 800);

    context.stroke();


		drawConnections(screenpoints, connections);
//    drawPoints(screenpoints);
 //   drawLines(screenpoints);


//------------------------------------------------------------------------------

};
 
