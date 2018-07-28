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
// Data definitions
//------------------------------------------------------------------------------

    var points = [
            {x: 100, y:-100, z:-100},
            // {x: 100, y:-100, z:-100},
            // {x: 100, y: 100, z:-100},
            // {x: 100, y: 100, z:-100},
            // {x:-100, y: 100, z: 100},
            // {x:-100, y: 100, z: 100},
            // {x:-100, y:-100, z: 100},
            // {x:-100, y:-100, z: 100},
    ];

    var origin = [
        {
            x: 000,y: 000, z: 000
        }
    ];

//------------------------------------------------------------------------------
// Function definitions
//------------------------------------------------------------------------------


    function drawLines(points){

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        points.forEach(p => {
            context.lineTo(p.x, p.y);
        });
        context.lineTo(points[0].x, points[0].y);
        context.stroke();

    };

    function rotate2d(x,y,radian){
        nx = x * Math.cos(radian) - y * Math.sin(radian);
        ny = y * Math.cos(radian) + x * Math.sin(radian);
        return[nx,ny];
    };

  


    function drawPoints(points, angle) {
        radius = 20;
        points.forEach(p => {

            //        p.x = p.x + (width / 2) + (p.x / 2);
            //        p.y = p.y + (height / 2) + (p.y / 2);
            //        drawPixel(p.x, p.y, 0, 0, 0);

            //        angle = performance.now() / 1000 / 6 * 2 * Math.PI;
            x=p.x;
            y=p.y;


            // draw ugly circles
            context.beginPath();
            context.fillStyle = '#fff';
            context.arc(x, y, 10, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        });
    };

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
    angle = angle + 2.5;
    if (angle > 360) {
        angle = 0;
    }
    var radian = angle * Math.PI / 180.0;


    context.translate(width / 2, height / 2);

    context.strokeStyle = '#fff';
    context.strokeText([width, height, frame], 0, 0);
    context.stroke();

    context.strokeText([angle], 0, 100);

    context.stroke();

    //draw a circle
    rotatePoints(points, radian);
    drawPoints(points);
    drawLines(points);


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
