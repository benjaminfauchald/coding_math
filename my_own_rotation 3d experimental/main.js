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
        zoom = 0.2;

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
            {x: 100, y:-100, z:-100},
            {x: 100, y: 100, z:-100},
            {x: 100, y: 100, z:-100},
            {x:-100, y: 100, z: 100},
            {x:-100, y: 100, z: 100},
            {x:-100, y:-100, z: 100},
            {x:-100, y:-100, z: 100},
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

    function rotateZ(x,y,radian)
    // Z - Axis Rotation
    // Z - axis rotation is identical to the 2D case:

    // x' = x*cos q - y*sin q
    // y' = x*sin q + y*cos q 
    // z' = z

    //     (cos q  sin q  0  0)
    // Rz(q) = (-sin q  cos q  0  0)
    // (0        0    1  0)
    // (0        0    0  1)

    {
        nx = x * Math.cos(radian) - y * Math.sin(radian);
        ny = y * Math.cos(radian) + x * Math.sin(radian);
        return[nx,ny];
    };

  


    


    // Just multiply the 
    // normalised coordinates by the image dimensions, and round the 
    // number off to the nearest integer value (pixel coordinates are 
    // always round numbers, or integers if you prefer). The range P' coordinates
    // are originally in, depends on the size of the canvas in screen space.
    // or the sake of simplicity, we will just assume that the canvas is two 
    // units long in each of the two dimensions(width and height), 
    // which means that P' coordinates in screen space, are in the range 
    // [-1, 1]. Here is the pseudo code to convert P's coordinates from 
    // screen space to raster space:


    // // finally, convert to raster space
    // Vec2i P_proj_raster;
    // P_proj_raster.x = (int)(P_proj_nor.x * width);
    // P_proj_raster.y = (int)(P_proj_nor.y * height);
    // if (P_proj_raster.x == width) P_proj_raster.x = width - 1;
    // if (P_proj_raster.y == height) P_proj_raster.y = height - 1;

    function project(points) {

        points.forEach( p => {

            // Converting points from screen space to raster space it actually 
            // really simple.Because the coordinates P' expressed in raster space 
            // can only be positive, we first need to normalise P's original 
            // coordinates.In other words, convert them from whatever range they 
            // are in originally, to the range 0, 1(when points are defined that way, 
            // we say they are defined in NDC space.NDC stands for Normalized 
            // Device Coordinates).Once converted to NDC space, converting the 
            // point's coordinates to raster space is trivial:

            var len = Math.sqrt(p.x * p.x + p.y * p.y)
            p.x /= len;
            p.y /= len;

            p.x *= zoom;
            p.y *= zoom;

            //to screen cords

            // Just multiply the 
            // normalised coordinates by the image dimensions, and round the 
            // number off to the nearest integer value (pixel coordinates are 
            // always round numbers, or integers if you prefer). The range P' coordinates
            // are originally in, depends on the size of the canvas in screen space.
            // or the sake of simplicity, we will just assume that the canvas is two 
            // units long in each of the two dimensions(width and height), 
            // which means that P' coordinates in screen space, are in the range 
            // [-1, 1]. Here is the pseudo code to convert P's coordinates from 
            // screen space to raster space:
            
            p.x = p.x * width;
            p.y = p.y * height;

            if (p.x == width) { p.x = width - 1 };
            if (p.y == height) { p.y = height - 1 };

        });

    }

    // int width = 64, height = 64; // dimension of the image in pixels 
    // Vec3f P = Vec3f(-1, 2, 10);
    // Vec2f P_proj;
    // P_proj.x = P.x / P.z; // -0.1 
    // P_proj.y = P.y / P.z; // 0.2 
    // // convert from screen space coordinates to normalized coordinates
    // Vec2f P_proj_nor;
    // P_proj_nor.x = (P_proj.x + 1) / 2; // (-0.1 + 1) / 2 = 0.45 
    // P_proj_nor.y = (1 - P_proj.y) / 2; // (1 - 0.2) / 2 = 0.4 
    // // finally, convert to raster space
    // Vec2i P_proj_raster;
    // P_proj_raster.x = (int)(P_proj_nor.x * width);
    // P_proj_raster.y = (int)(P_proj_nor.y * height);
    // if (P_proj_raster.x == width) P_proj_raster.x = width - 1;
    // if (P_proj_raster.y == height) P_proj_raster.y = height - 1; 


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

function rotate2d(x, y, radian) 
// x′ = xcosθ− ysinθ
// y′ = ycosθ + xsinθ
{
    nx = x * Math.cos(radian) - y * Math.sin(radian);
    ny = y * Math.cos(radian) + x * Math.sin(radian);
    return [nx, ny];
};

//not done
function rotatePoints3d(points, angle) {
    points.forEach(p => {
        rotated_points = rotate2d(p.x, p.y, 0,0,angle);
        p.x = rotated_points[0];
        p.y = rotated_points[1];
    });
};


function rotatePoints3d(points, angle) {
    points.forEach(p => {
        rotated_points = rotate3d(p.x, p.y, 0, 0, angle);
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

    var ty=50;
    // Show original points 
    points.forEach(p=>{
        ty = ty + 15 ;
        context.strokeText([p.x, p.y, p.z], 0, ty);
    });



    // rotatePoints(points, radian);
    // ty = ty + 100;
    // points.forEach(p => {
    //     ty = ty + 15;
    //     context.strokeText([p.x, p.y, p.z], 0, ty);
    // });

    project(points);
    ty=ty+100;
    points.forEach(p => {
        ty = ty + 15;
        context.strokeText([p.x, p.y, p.z], 0, ty);
    });

    context.strokeText([angle], 0, 800);

    context.stroke();


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
