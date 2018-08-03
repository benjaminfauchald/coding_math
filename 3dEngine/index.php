<html>
<style>
 body {background-color: powderblue;} h1 {color: blue;} p {color: red;}
 img.fixed { position: fixed; bottom: -600px; right: 0; width: 300px; border: 3px solid: #73AD21; }
</style>
<head>
		<title>WebGL 3d Engine - Rotating Cub11e</title>
	</head>
	<body onload="InitDemo();">
		<h1>TEST</h1>
		<canvas id="game-surface" width="800" height="600">
			Your browser does not support HTML5
		</canvas>
		<br />
		<canvas id="canvas" name="canvas" width="640" height="480">
			Sorry, but it looks like your browser does not support the Canvas tag.
		</canvas>
	
		<script src="./misc.js"></script>
		<script src="./gl-matrix.js"></script>
		<script src="./shaders.js"></script>
		<script src="./app.js"></script>
	</body>

	</html>
