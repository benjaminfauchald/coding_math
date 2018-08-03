




//------------------------------------------------------------------------------
// Data definitions
//------------------------------------------------------------------------------

var points = [
    // {
    //     x: 100,
    //     y: -100,
    //     z: -100
    // },
    // {x: 100, y:-100, z:-100},
    // {x: 100, y: 100, z:-100},
    // {x: 100, y: 100, z:-100},
    // {x:-100, y: 100, z: 100},
    // {x:-100, y: 100, z: 100},
    // {x:-100, y:-100, z: 100},
    // {x:-100, y:-100, z: 100},
];

var origin = [{
    x: 000,
    y: 000,
    z: 000
}];

x=0;
numObjects=0;

//------------------------------------------------------------------------------
// Initialize
//------------------------------------------------------------------------------



for (i = 0; i < 100; i++) {
    generateSquare(100, {x: 0,y: 0,z: i * 100});
}

//------------------------------------------------------------------------------
// Function definitions
//------------------------------------------------------------------------------



function rotateSquare(points)
{
    t = performance.now()
    a = Math.sin(t) * 306


};

function zoomPoints(){
    points.forEach(p => {
        p.z += 5;
        if (p.z > 500) { p.z = -1000; }
    });
    
};

function perspective_projection(points, screenpoints) {
    points.forEach(p => {
        var c = 500;
        x = p.x / (1 - p.z / c);
        y = p.y / (1 - p.z / c);
        screenpoints.push({
            x: x,
            y: y
        });
    });
}


function generateSquare(radius, origin) {
    t = performance.now()
    origin.x = Math.sin(t) * 36
    origin.y = Math.cos(t) * 360
    var point = {x:0, y:0, z:0,r:0, g:0, b:0, a:0 };
    points.push({x:origin.x-radius, y:origin.y-radius, z: -origin.z, ox: origin.x, oy: origin.y, angle: 0 });
    points.push({x:origin.x-radius, y:origin.y+radius, z: -origin.z, ox: origin.x, oy: origin.y, angle: 0 });
    points.push({x:origin.x+radius, y:origin.y+radius, z: -origin.z, ox: origin.x, oy: origin.y, angle: 0 });
    points.push({x:origin.x+radius, y:origin.y-radius, z: -origin.z, ox: origin.x, oy: origin.y, angle: 0 });
};

window.onload = function update() {

    // Get canvas and context etc
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),

    //width = canvas.width = 512,
    //height = canvas.height = 0 | height * innerWidth / innerHeight,

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    imagedata = context.createImageData(width, height);

    requestAnimationFrame(update);
    //init
    if (!window.time) {
        time = 0;
        frame = 0;
        timeNextFrame = 0;
        angle = 0;

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
// Function definitions
//------------------------------------------------------------------------------


    function drawLines(screenpoints){


        context.beginPath();
        context.moveTo(screenpoints[0].x, screenpoints[0].y);

        points.forEach(p => {

            context.lineTo(p.x, p.y);
            context.stroke();

        });
//        context.lineTo(screenpoints[0].x, screenpoints[0].y);

    };

    function rotate2d(x,y,radian){
        nx = x * Math.cos(radian) - y * Math.sin(radian);
        ny = y * Math.cos(radian) + x * Math.sin(radian);
        return[nx,ny];
    };

    function rotate2d_b(point, angle) {
        radian = angle * Math.PI / 180;
        y=point.y;
        x=point.x;
        nx = x * Math.cos(radian) - y * Math.sin(radian);
        ny = y * Math.cos(radian) + x * Math.sin(radian);
        point.x = nx;
        point.y = ny;
        return point;
    };
  


    function drawPoints(screenpoints, angle) {
        radius = 20;

        p=screenpoints;




        i=0;
        while (i < (screenpoints.length-1) * 4)
        {
//            console.log(i);

            context.beginPath();
            context.lineTo(screenpoints[i + 1].x, screenpoints[i + 1].y);
            context.lineTo(screenpoints[i + 2].x, screenpoints[i + 2].y);
            context.lineTo(screenpoints[i + 3].x, screenpoints[i + 3].y);
            context.lineTo(screenpoints[i + 4].x, screenpoints[i + 4].y);
            context.lineTo(screenpoints[i + 1].x, screenpoints[i + 1].y);
            context.strokeStyle = "#FFAACC";
            context.lineWidth = 1;
            context.stroke();
            i++;
            i++;
            i++;
            i++;
        };







        context.beginPath();
        screenpoints.forEach(p => {

        //     //        p.x = p.x + (width / 2) + (p.x / 2);
        //     //        p.y = p.y + (height / 2) + (p.y / 2);
        //     //        drawPixel(p.x, p.y, 0, 0, 0);

        //     //        angle = performance.now() / 1000 / 6 * 2 * Math.PI;
        //     // draw ugly circles


            context.beginPath();
            context.fillRect(p.x, p.y, 8, 8);
            context.fill
            context.closePath();
            context.fill();


        });

    };


function translateToOrigin(point){
        point.x = point.x - point.ox;
        point.y= point.y - point.oy;
        return point;
    }

function translateFromOrigin(point) {
        point.x = point.x + point.ox;
        point.y = point.y + point.oy;
        return point;
}



function rotatePoints(points,angle){
    points.forEach(p=>{
        rotated_points = rotate2d(p.x, p.y, angle);
        p.x = rotated_points[0];
        p.y = rotated_points[1];
    });
};

function rotatePoints3d(points, angle) {
    points.forEach(p => {
        rotated_points = rotate3d(p.x, p.y, 0,0,angle);
        p.x = rotated_points[0];
        p.y = rotated_points[1];
    });
};


/*
 CX @ Origin X
 CY @ Origin Y
 X  @ Point X to be rotated
 Y  @ Point Y to be rotated
*/
// function rotate3d(X, Y, CX, CY, angle) {
//     var rad = angle * Math.PI / 180.0;
//     var nx = Math.cos(rad) * (X - CX) - Math.sin(rad) * (Y - CY) + CX;
//     var ny = Math.sin(rad) * (X - CX) + Math.cos(rad) * (Y - CY) + CY;

//     return [nx, ny];
// }

//------------------------------------------------------------------------------
//  Render visual
//------------------------------------------------------------------------------

    //remeber that this is calculated in radians (optimize this!)
    angle = 2.5;
    var radian = angle * Math.PI / 180.0;


    context.translate(width / 2, height / 2);
    context.strokeStyle = '#fff';
    context.strokeText([width, height, frame], 0, 0);
    context.stroke();
    context.strokeText([angle], 0, 100);
    context.strokeText("NUMBER OF POINTS: " + points.length, 0, 100);
    context.stroke();




    var screenpoints = [{x:0 , y:0, z:0}];

    //draw a circle

    zoomPoints();
//    generateSquares();
    rotatePoints(points, radian);
    perspective_projection(points, screenpoints);

//    drawLines(screenpoints);
    drawPoints(screenpoints);


//------------------------------------------------------------------------------

};
 


//------------------------------------------------------------------------------




  // Create the image
// function createImage(offset) {
//     // Loop over all of the pixels
//     for (var x = 0; x < width; x++) {
//         for (var y = 0; y < height; y++) {
//             // Get the pixel index
//             var pixelindex = (y * width + x) * 4;

//             // Generate a xor pattern with some random noise
//             var red = ((x + offset) % 256) ^ ((y + offset) % 256);
//             var green = ((2 * x + offset) % 256) ^ ((2 * y + offset) % 256);
//             var blue = 50 + Math.floor(Math.random() * 100);

//             // Rotate the colors
//             blue = (blue + offset) % 256;

//             // Set the pixel data
//             imagedata.data[pixelindex] = red; // Red
//             imagedata.data[pixelindex + 1] = green; // Green
//             imagedata.data[pixelindex + 2] = blue; // Blue
//             imagedata.data[pixelindex + 3] = 255; // Alpha
//         }
//     }
// }

// function drawPixel(x, y, r, g, b) {
//     var pixelindex = (y * width + x) * 4;
//     var radius = 10;
//     // Set the pixel data
//     imagedata.data[pixelindex] = r; // Red
//     imagedata.data[pixelindex + 1] = g; // Green
//     imagedata.data[pixelindex + 2] = b; // Blue
//     imagedata.data[pixelindex + 3] = 255; // Alpha
// }

// /*
//  CX @ Origin X
//  CY @ Origin Y
//  X  @ Point X to be rotated
//  Y  @ Point Y to be rotated
// */
// function rotate(X, Y, CX, CY, angle) {
//     var rad = angle * Math.PI / 180.0;
//     var nx = Math.cos(rad) * (X - CX) - Math.sin(rad) * (Y - CY) + CX;
//     var ny = Math.sin(rad) * (X - CX) + Math.cos(rad) * (Y - CY) + CY;

//     return [nx, ny];
// }
