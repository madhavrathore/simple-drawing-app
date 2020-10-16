var canvas,
    ctx,
    dragging = false,
    dragStartPoint,
    imgData;
 var triangleCount = 0;
 var triangles;
 
function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

// Using getImageData function get the previous data and store in imgData variable.
function copy() {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Put previous data using putImageData function.
function paste() {
    ctx.putImageData(imgData, 0, 0);
}


 function drawTriangle(position)
 {   
 	var coordinates = [],
        angle = 100,
        sides = 3,

        radius = Math.sqrt(Math.pow((dragStartPoint.x - position.x), 2) + Math.pow((dragStartPoint.x - position.x), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartPoint.x + radius * Math.cos(angle), y: dragStartPoint.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    } 

         ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        ctx.lineTo(coordinates[index].x, coordinates[index].y);
    }

    ctx.closePath();
     ctx.fill();
 }


 function randomColor( )
  {  
    var r = Math.round(Math.random( )*256);
    var g = Math.round(Math.random( )*256);
    var b = Math.round(Math.random( )*256);

    return 'rgb( ' + r + ',' + g + ',' + b + ')';

  }

function dragStart(event) {
    dragging = true;
    dragStartPoint = getCanvasCoordinates(event);
    copy();
}

  function drag(event) {
    var position;
    if (dragging === true) {
        paste();
        position = getCanvasCoordinates(event);
        ctx.fillStyle = randomColor();
        drawTriangle(position);
    }
}

function dragStop(event) {
    triangles = [];
    dragging = false;
    paste();
    ctx.fillStyle = randomColor( );
    var position = getCanvasCoordinates(event);
    triangleCount = triangleCount + 1;
    drawTriangle(position);
    // console.log(triangleCount);
}  

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
   
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    canvas.addEventListener('dblclick',deleteTriangle,false);
    document.getElementById("clear").addEventListener('mousedown',function(){
    ctx.clearRect(0,0,canvas.width, canvas.height); 
});  

}


/* Deleting triangle on double click */

//Check whether triangle is clicked or not

function isTriangleClicked(shape,mx,my)
{
		var dx;
		var dy;
		dx = mx - shape.mx;
		dy = my - shape.my;
		return (dx*dx + dy*dy < shape.rad*shape.rad)
}

function deleteTriangle(event) 
{
		var i;
		var bTriangle = canvas.getBoundingClientRect();
		dragIndexDelete=-1;
		
		mouseX = (event.clientX - bTriangle.left)*(canvas.width/bTriangle.width);
		mouseY = (event.clientY - bTriangle.top)*(canvas.width/bTriangle.width);


		for (i=0; i < triangleCount; i++) {
			if	(isTriangleClicked(triangles[i], mouseX, mouseY)) {
				dragIndexDelete = i;		
			}
		}
		
		if ( dragIndexDelete > -1 ){
			coordinates.splice(dragIndexDelete,1)[0];
			triangleCount=triangleCount-1;
		}
		
		if (event.preventDefault) {
			event.preventDefault();
		} 
		else if (event.returnValue) {
			event.returnValue = false;
		} 
		drawTriangle();				
		return false;
}

window.addEventListener('load', init, false);


