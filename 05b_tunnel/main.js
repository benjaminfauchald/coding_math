




//------------------------------------------------------------------------------
// Data definitions
//------------------------------------------------------------------------------

var objects = [];

var object = [];

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

screenpoints = [];

x=0;
numObjects=12;

//------------------------------------------------------------------------------
// Initialize
//------------------------------------------------------------------------------



for (i = 0; i < numObjects; i++) {
    generateSquare(100, {x: 0,y: 0,z: i * 100});

}

console.log("objects[0][0].x" + objects[0][0].x);
//console.log("points[0].x" + points[0].x);


console.log("objects[0][3].x" + objects[0][0].x);
//console.log("points[3].x" + points[0].x);

console.log("trying");
points = "hubbabubba";


console.log("points[3].x" + points[0].x);

points =  objectsToPoints(objects, points);
  

console.log("objects[0][0].x" + objects[0][0].x);
console.log("points[0].x" + points[0].x);


console.log("objects[0][3].x" + objects[0][0].x);
console.log("points[3].x" + points[0].x);


console.log("px:" + points[0].x + "py: " + points[0].y + "pz: " + points[0].z);

screenpoints = perspective_projection(points, screenpoints);
console.log("sx:" + screenpoints[0].x + "sy: " + screenpoints[0].y);


screenpoints.forEach(p => {
    console.log("ssx:" + p.x + "ssy: " + p.y );
});  

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
        if (p.z > 500) {
            //reset position
            t = performance.now();
            p.x = Math.sin(t) * 100;
            p.y = Math.cos(t) * 100;
            p.z = -1000; 
        }
    });
    
};

function perspective_projection(points) {
    screenpoints = [];
    points.forEach(p => {
        var c = 500;
        x = p.x / (1 - p.z / c);
        y = p.y / (1 - p.z / c);
        screenpoints.push({
            x: x,
            y: y
        });
    });
    return screenpoints;
}


function objectsToPoints(objects,points){
    points = [];
    objects.forEach(object=>{
        object.forEach(p => {
            points.push({x: p.x, y: p.y, z: p.z  });
        })
    });
    return points;

};


function rotateObject(object) {
    
    radian = angle * (Math.PI / 180);
    object.forEach(point => {
        y=point.y;
        x=point.x;
        point.x = x * Math.cos(radian) - y * Math.sin(radian);
        point.y = y * Math.cos(radian) + x * Math.sin(radian);
    })
    return object;
};

function generateSquare(radius, origin) {
    var point = {x:0, y:0, z:0,r:0, g:0, b:0, a:0 };

    object.push({x:origin.x-radius, y:origin.y-radius, z: -origin.z, ox: origin.x, oy: origin.y, angle: 0 });
    object.push({x:origin.x-radius, y:origin.y+radius, z: -origin.z, ox: origin.x, oy: origin.y, angle: 0 });
    object.push({x:origin.x+radius, y:origin.y+radius, z: -origin.z, ox: origin.x, oy: origin.y, angle: 0 });
    object.push({x:origin.x+radius, y:origin.y-radius, z: -origin.z, ox: origin.x, oy: origin.y, angle: 0 });

angle = Math.sin(performance.now()) * 360;
    rotateObject(object,angle);
    objects.push(object);

};

window.onload = function update() {

    // Get canvas and context etc
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),

    // width = canvas.width = 512,
    // height = canvas.height = 0 | height * innerWidth / innerHeight,

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


    function drawLines3(screenpoints){


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
  

function drawPoints(screenpoints) {
    context.fillStyle = "#FF0000";
    screenpoints.forEach(p => {
        context.fillRect(p.x, p.y, 8, 8);
        context.fill
    });
};



function drawLines(screenpoints) {

    p=screenpoints;



    i=0;
    while (i < numObjects * 4)
    {
//            console.log(i);

        context.beginPath();
        context.moveTo(screenpoints[i + 0].x, screenpoints[i + 0].y);
        context.lineTo(screenpoints[i + 1].x, screenpoints[i + 1].y);
        context.lineTo(screenpoints[i + 2].x, screenpoints[i + 2].y);
        context.lineTo(screenpoints[i + 3].x, screenpoints[i + 3].y);
        context.lineTo(screenpoints[i + 0].x, screenpoints[i + 0].y);

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




//------------------------------------------------------------------------------
//  Render visual
//------------------------------------------------------------------------------


    context.translate(width / 2, height / 2);
    drawPoints(screenpoints);
    drawLines(screenpoints);



//     var screenpoints = [{x:0 , y:0, z:0}];

//     //draw a circle

//     zoomPoints();
// //    generateSquares();
//     points = objectsToPoints(objects,points);
//     rotatePoints(points, radian);
//     perspective_projection(points, screenpoints);

// //    drawLines(screenpoints);
//     drawPoints(screenpoints);


//------------------------------------------------------------------------------

};
 
