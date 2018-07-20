window.onload = function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;



    /*
     CX @ Origin X
     CY @ Origin Y
     X  @ Point X to be rotated
     Y  @ Point Y to be rotated
    */
        function rotate(CX, CY, X, Y, angle) {
            var rad = angle * Math.PI / 180.0;
            var nx = Math.cos(rad) * (X-CX) - Math.sin(rad) * (Y-CY) + CX;
            var ny = Math.sin(rad) * (X-CX) + Math.cos(rad) * (Y-CY) + CY;
            return [nx,ny];
        }


        // That's how you define the value of a pixel //
        function drawPixel (x, y, r, g, b, a) {
            var index = (x + y * canvasWidth) * 4;

            canvasData.data[index + 0] = r;
            canvasData.data[index + 1] = g;
            canvasData.data[index + 2] = b;
            canvasData.data[index + 3] = a;
        }

cur_x = width/2;
cur_y = height/2;


tri_width = 100;
tri_height = 100;


var txy_1 = [0,0];







context.beginPath();
context.moveTo(cur_x,cur_y);

context.lineTo(cur_x + tri_width, cur_y + tri_height);
context.lineTo(cur_x - (tri_width), cur_y + tri_height);
context.lineTo(cur_x , cur_y);
context.stroke();

var xy = [0,0];

xy = rotate(cur_x, cur_y, cur_x, cur_y, 10);

console.log(rotate(cur_x, cur_y, cur_x, cur_y, 10));
console.log(rotate(cur_x, cur_y, cur_x, cur_y, 15));

cur_x =xy[0];
cur_y =xy[1];

context.beginPath();
context.moveTo(cur_x,cur_y);

context.lineTo(cur_x + tri_width, cur_y + tri_height);
context.lineTo(cur_x - (tri_width), cur_y + tri_height);
context.lineTo(cur_x , cur_y);
context.stroke();

  //
  // for(var i=0; i < 100; i +=1) {
  //     context.beginPath();
  //     context.moveTo(Math.random() * width, Math.random() * height);
  //     context.lineTo(Math.random() * width, Math.random() * height);
  //     context.stroke();
  // }
};
