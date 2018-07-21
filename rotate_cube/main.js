window.onload = function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight
    fl = 300,
    points = [],
    needsUpdate=true;

  context.translate(width / 2, height / 2);




  points[0] = { x: -500, y: -500, z: 1000};
  points[1] = { x:  500, y: -500, z: 1000};
  points[2] = { x:  500, y: -500, z:  500};
  points[3] = { x: -500, y: -500, z:  500};
  points[4] = { x: -500, y:  500, z: 1000};
  points[5] = { x:  500, y:  500, z: 1000};
  points[6] = { x:  500, y:  500, z:  500};
  points[7] = { x: -500, y:  500, z:  500};



  function project() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				scale = fl / (fl + p.z);

			p.sx = p.x * scale;
			p.sy = p.y * scale;
		}
	}

  console.log('test');




  function drawLine() {
      // INDEX TO ELEMENT IN POITN ARRAY
      var p = points[arguments[0]];
      context.moveTo(p.sx, p.sy);
        for(var i = 1; i < arguments.length; i++) {
          p = points[arguments[i]];
          context.lineTo(p.sx,p.sy);
        }
    }

    document.body.addEventListener("keydown", function(event) {
  		switch(event.keyCode) {
  			case 37: // left
  				translateModel(-20, 0, 0);
  				break;
  			case 39: // right
  				translateModel(20, 0, 0);
  				break;
  			case 38: // up
  				if(event.shiftKey) {
  					translateModel(0, 0, 20);
  				}
  				else {
  					translateModel(0, -20, 0);
  				}
  				break;
  			case 40: // down
  				if(event.shiftKey) {
  					translateModel(0, 0, -20);
  				}
  				else {
  					translateModel(0, 20, 0);
  				}
  				break;
  		}
  	});


    update();

    function update() {
      project();
      if (needsUpdate)
      {
        context.clearRect( width / 2, height / 2, width, height);
        context.beginPath;
        drawLine(0,1,2,3,0);
        drawLine(4,5,6,7,4);
        drawLine(4,0);
        drawLine(7,3);
        drawLine(6,2);
        drawLine(5,1);
      }
      requestAnimationFrame(update);
      context.stroke();
    }
};
