window.onload = function update() {

    // Get canvas and context etc
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),

    //width = canvas.width = 512,
    //height = canvas.height = 0 | height * innerWidth / innerHeight,

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    angle = 0,

    imagedata = context.createImageData(width, height);

    requestAnimationFrame(update);
    //init
    if (!window.time) {
        time = 0;
        frame = 0;
        timeNextFrame = 0;

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


    //render visual
    context.translate(width/2,height/2);
    context.strokeStyle = '#fff';
    context.strokeText([width, height, frame], 0, 0);
    debug_box = document.getElementById("debug_box");





    var points = [
        {x:000,y:000,z:000},
        {x:100,y:000,z:000},
        {x:000,y:100,z:000}
    ];

    var origin = [{
            x: 000,
            y: 000,
            z: 000
        }
    ];


    function rotate2d(x,y,angle){
    //    x = x * cos(angle) - y * sin(angle)
    //    y = x * sin(angle) + y * cos(angle)
        nx = x * Math.cos(angle) - y * Math.sin(angle);
        ny = y * Math.sin(angle) + y * Math.cos(angle);
        return[nx,ny]
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

            debug_box.innerHTML = 'Angle: ' + angle;
            rotated_points = rotate2d(x, y, angle);

            x = rotated_points[0];
            y = rotated_points[1];
            //        p.x = p.x + (width / 2) + (p.x / 2);
            //        p.y = p.y + (height / 2) + (p.y / 2);

            x = (width / 2) + x; //tranlsate points to screen cords
            y = (height / 2) + y; //tranlsate points to screen cords

            // draw ugly circles
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#003300';
            context.stroke();
        });
    };


    // draw ugly circles
    radius = 10;
    context.beginPath();
    context.arc(100, 100, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();

//------------------------------------------------------------------------------

    //context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the image data to the canvas

    angle++;
    if (angle == 360) {
        angle = 0;
    }
    drawPoints(points, angle);

};


//------------------------------------------------------------------------------

    // var time,
    // frame,
    // timeNextFrame,
    // currentTime;

    // // Main loop
    // var angle = 0;



    //     if (!window.time) {
    //         time = 0;
    //         frame = 0;
    //         timeNextFrame = 0;

    //     currentTime = performance.now() / 1000;
    //     while(time < currentTime) {
    //         while(time < timeNextFrame) {
    //             time =+ 1 / 16384;
    //         }
    //     frame++;
    //     timeNextFrame += 1/60;
    //     }


    // function main(tframe) {

    //     // Request animation frames
    //     requestAnimationFrame(main);

    //     if (!window.time) {
    //         time = 0;
    //         frame = 0;
    //         timeNextFrame = 0;
    //     }

    //     currentTime = performance.now() / 1000;
    //     while(time < currentTime) {
    //         while(time < timeNextFrame) {
    //             time =+ 1 / 16384;
    //         }
    //         frame++;
    //     timeNextFrame += 1/60;
    //     }



    //     context.clearRect(0, 0, canvas.width, canvas.height);
    //     // Draw the image data to the canvas
    //     angle++;
    //     if (angle == 360) {
    //         angle = 0;
    //     }
    //     drawPoints(points, angle);

    // }

    // // Call the main loop
    // main(0);

//------------------------------------------------------------------------------


// context.beginPath();
// context.moveTo(cur_x,cur_y);

// context.lineTo(cur_x + tri_width, cur_y + tri_height);
// context.lineTo(cur_x - (tri_width), cur_y + tri_height);
// context.lineTo(cur_x , cur_y);
// context.stroke();

// var xy = [0,0];

// xy = rotate(cur_x, cur_y, cur_x, cur_y, 10);

//console.log(rotate(cur_x, cur_y, cur_x, cur_y, 10));
//console.log(rotate(cur_x, cur_y, cur_x, cur_y, 15));

// cur_x =xy[0];
// cur_y =xy[1];



// context.beginPath();
// context.moveTo(cur_x,cur_y);

// context.lineTo(cur_x + tri_width, cur_y + tri_height);
// context.lineTo(cur_x - (tri_width), cur_y + tri_height);
// context.lineTo(cur_x , cur_y);
// context.stroke();

  //
  // for(var i=0; i < 100; i +=1) {
  //     context.beginPath();
  //     context.moveTo(Math.random() * width, Math.random() * height);
  //     context.lineTo(Math.random() * width, Math.random() * height);
  //     context.stroke();
  // }








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
