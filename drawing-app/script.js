// var canvas,
//     ctx,
//     dragging = false,
//     dragStartPoint,
//     imgData;
//  var triangleCount = 0;
//  var triangles;
 
// function getCanvasCoordinates(event) {
//     var x = event.clientX - canvas.getBoundingClientRect().left,
//         y = event.clientY - canvas.getBoundingClientRect().top;

//     return {x: x, y: y};
// }

// // Using getImageData function get the previous data and store in imgData variable.
// function copy() {
//     imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// }

// // Put previous data using putImageData function.
// function paste() {
//     ctx.putImageData(imgData, 0, 0);
// }


//  function drawTriangle(position)
//  {   
//  	var coordinates = [],
//         angle = 100,
//         sides = 3,

//         radius = Math.sqrt(Math.pow((dragStartPoint.x - position.x), 2) + Math.pow((dragStartPoint.x - position.x), 2)),
//         index = 0;

//     for (index = 0; index < sides; index++) {
//         coordinates.push({x: dragStartPoint.x + radius * Math.cos(angle), y: dragStartPoint.y - radius * Math.sin(angle)});
//         angle += (2 * Math.PI) / sides;
//     } 

//          ctx.beginPath();
//     ctx.moveTo(coordinates[0].x, coordinates[0].y);
//     for (index = 1; index < sides; index++) {
//         ctx.lineTo(coordinates[index].x, coordinates[index].y);
//     }

//     ctx.closePath();
//      ctx.fill();
//  }


//  function randomColor( )
//   {  
//     var r = Math.round(Math.random( )*256);
//     var g = Math.round(Math.random( )*256);
//     var b = Math.round(Math.random( )*256);

//     return 'rgb( ' + r + ',' + g + ',' + b + ')';

//   }

// function dragStart(event) {
//     dragging = true;
//     dragStartPoint = getCanvasCoordinates(event);
//     copy();
// }

//   function drag(event) {
//     var position;
//     if (dragging === true) {
//         paste();
//         position = getCanvasCoordinates(event);
//         ctx.fillStyle = randomColor();
//         drawTriangle(position);
//     }
// }

// function dragStop(event) {
//     triangles = [];
//     dragging = false;
//     paste();
//     ctx.fillStyle = randomColor( );
//     var position = getCanvasCoordinates(event);
//     triangleCount = triangleCount + 1;
//     drawTriangle(position);
// }  

// function init() {
//     canvas = document.getElementById("canvas");
//     ctx = canvas.getContext('2d');
   
//     canvas.addEventListener('mousedown', dragStart, false);
//     canvas.addEventListener('mousemove', drag, false);
//     canvas.addEventListener('mouseup', dragStop, false);
//     canvas.addEventListener('dblclick',deleteTriangle,false);
//     document.getElementById("clear").addEventListener('mousedown',function(){
//     ctx.clearRect(0,0,canvas.width, canvas.height); 
// });  

// }


// /* Deleting triangle on double click */

// //Check whether triangle is clicked or not

// function isTriangleClicked(shape,mx,my)
// {
// 		var dx;
// 		var dy;
// 		dx = mx - shape.mx;
// 		dy = my - shape.my;
// 		return (dx*dx + dy*dy < shape.rad*shape.rad)
// }

// function deleteTriangle(event) 
// {
// 		var i;
// 		var bTriangle = canvas.getBoundingClientRect();
// 		dragIndexDelete=-1;
		
// 		mouseX = (event.clientX - bTriangle.left)*(canvas.width/bTriangle.width);
// 		mouseY = (event.clientY - bTriangle.top)*(canvas.width/bTriangle.width);


// 		for (i=0; i < triangleCount; i++) {
// 			if	(isTriangleClicked(triangles[i], mouseX, mouseY)) {
// 				dragIndexDelete = i;		
// 			}
// 		}
		
// 		if ( dragIndexDelete > -1 ){
// 			coordinates.splice(dragIndexDelete,1)[0];
// 			triangleCount=triangleCount-1;
// 		}
		
// 		if (event.preventDefault) {
// 			event.preventDefault();
// 		} 
// 		else if (event.returnValue) {
// 			event.returnValue = false;
// 		} 
// 		drawTriangle();				
// 		return false;
// }

// window.addEventListener('load', init, false);




window.onload = function () {

    var canvas = document.getElementById("canvas");
    var clearButton = document.getElementById("clear");
    var isActive = false;
    var startCoordinates = null;
    var endCoordinates = null;
    var context = canvas.getContext("2d");
    var dataPool = [];
    var flag = false;
    var draggedTriIndex = 0;
    var randomRGB = null;
    var changeDistance = {
        x: 0,
        y: 0
    };


    canvas.addEventListener('dblclick', function (e) {

        var pos = getMousePositions(canvas, e);
        dataPool.forEach(function (value) {
            var Area = findArea(value[0][0], value[0][1], value[1][0], value[1][1], value[2][0], value[2][1]);
            var Area1 = findArea(value[0][0], value[0][1], pos.x, pos.y, value[2][0], value[2][1]);
            var Area2 = findArea(value[0][0], value[0][1], value[1][0], value[1][1], pos.x, pos.y);
            var Area3 = findArea(pos.x, pos.y, value[1][0], value[1][1], value[2][0], value[2][1]);
            if (Math.round(Area) === Math.round(Area1 + Area2 + Area3)) {
                var newList = [];
                var item = dataPool[dataPool.indexOf(value)];
                dataPool.forEach(function (value2) {
                    if (value2 !== item) {
                        newList.push(value2);
                    }
                });
                dataPool = newList;
                clearCanvas();
                dataPool.forEach(function (value2) {
                    reDrawTriangles(value2[0][0], value2[0][1], value2[4], value2[3]);
                });
                return true;
            }
        });
        isActive = false;

    });


    canvas.addEventListener('mousedown', function (e) {
        canvas.style.cursor = 'move';
        e.preventDefault();
        var mousePos = getMousePositions(canvas, e);
        startCoordinates = mousePos;
        endCoordinates = mousePos;
        isActive = true;
        flag = checkIfInside(mousePos);
        startCoordinates = mousePos;
        endCoordinates = mousePos;
        randomRGB = getRandomRgb();
        if (dataPool.length > 0) {
            changeDistance.x = dataPool[draggedTriIndex][0][0] - mousePos.x;
            changeDistance.y = dataPool[draggedTriIndex][0][1] - mousePos.y
        }
        console.log(changeDistance);
    });


    canvas.addEventListener('mousemove', function (e) {

        endCoordinates = getMousePositions(canvas, e);

        if (isActive && flag) {
            clearCanvas();
            canvas.style.cursor = 'ne-resize';
            reDrawTriangles(startCoordinates.x, startCoordinates.y, calculateLineDistance(startCoordinates.x, startCoordinates.y, endCoordinates.x, endCoordinates.y), randomRGB);
            dataPool.forEach(function (value) {
                reDrawTriangles(value[0][0], value[0][1], value[4], value[3]);
            });
        } else if (isActive) {
            canvas.style.cursor = 'crosshair';
            clearCanvas();
            // doDragTranslationAtMove(endCoordinates.x, endCoordinates.y);
            var item = dataPool[draggedTriIndex];
            var difX = endCoordinates.x - item[0][0] + changeDistance.x;
            var difY = endCoordinates.y - item[0][1] + changeDistance.y;
            item[0][0] += difX;
            item[0][1] += difY;
            item[1][0] += difX;
            item[1][1] += difY;
            item[2][0] += difX;
            item[2][1] += difY;
            reDrawTriangles(item[0][0], item[0][1], item[4], item[3]);
            dataPool.forEach(function (value) {
                if (value[0][0] !== startCoordinates.x && value[0][1] !== startCoordinates.y) {
                    reDrawTriangles(value[0][0], value[0][1], value[4], value[3]);
                }
            });
        }

    }, true);


    canvas.addEventListener('mouseup', function (e) {
        canvas.style.cursor = 'pointer';
        var mousePos = getMousePositions(canvas, e);
        if (!flag) {
            isActive = false;
            flag = false;
            doDragTranslation(mousePos.x, mousePos.y);
        } else if (isActive && calculateLineDistance(startCoordinates.x, startCoordinates.y, endCoordinates.x, endCoordinates.y) > 2) {
            isActive = false;
            flag = false;
            endCoordinates = mousePos;
            drawTriangle(1, startCoordinates.x, startCoordinates.y, endCoordinates.x, endCoordinates.y);
        }

    });


    clearButton.addEventListener('click', function () {

        dataPool = [];
        clearCanvas();

    });


    function checkIfInside(pos) {

        flag = true;
        dataPool.forEach(function (value) {
            var Area = findArea(value[0][0], value[0][1], value[1][0], value[1][1], value[2][0], value[2][1]);
            var Area1 = findArea(value[0][0], value[0][1], pos.x, pos.y, value[2][0], value[2][1]);
            var Area2 = findArea(value[0][0], value[0][1], value[1][0], value[1][1], pos.x, pos.y);
            var Area3 = findArea(pos.x, pos.y, value[1][0], value[1][1], value[2][0], value[2][1]);
            // if (pos.y >= value[0][1] && pos.x <= value[1][0] && pos.y <= value[1][1] && pos.x >= value[2][0] && pos.y <= value[2][1]) {
            if (Math.round(Area) === Math.round(Area1 + Area2 + Area3)) {
                draggedTriIndex = dataPool.indexOf(value);
                flag = false;
                return true;
            }
        });
        return flag;

    }

    function findArea(x1, y1, x2, y2, x3, y3) {

        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);

    }


    function doDragTranslation(newx, newy) {

        var item = dataPool[draggedTriIndex];
        var difX = newx - item[0][0] + changeDistance.x;
        var difY = newy - item[0][1] + changeDistance.y;
        item[0][0] += difX;
        item[0][1] += difY;
        item[1][0] += difX;
        item[1][1] += difY;
        item[2][0] += difX;
        item[2][1] += difY;
        dataPool.splice(draggedTriIndex, 0, item);
        clearCanvas();
        dataPool.forEach(function (value) {
            reDrawTriangles(value[0][0], value[0][1], value[4], value[3]);
        });

    }

    function clearCanvas() {

        context.clearRect(0, 0, canvas.width, canvas.height);

    }


    function getMousePositions(canvas, event) {

        var bounds = canvas.getBoundingClientRect();
        return {

            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top

        };

    }

    function calculateLineDistance(x1, y1, x2, y2) {

        return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

    }

    function reDrawTriangles(x1, y1, distance, color) {

        
        var height = 1.414 * (distance);
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1 + distance / 2, y1 + height);
        context.lineTo(x1 - distance / 2, y1 + height);
        context.moveTo(x1, y1);
        context.fillStyle = color;
        context.fill();
        

    }

    function drawTriangle(mode, x1, y1, x2, y2) {

        
        var distance = calculateLineDistance(x1, y1, x2, y2);
        var height =(1.4)*(distance) * mode;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1 + distance / 2, y1 + height);
        context.lineTo(x1 - distance / 2, y1 + height);
        context.moveTo(x1, y1);
        context.fillStyle = randomRGB;
        context.fill();
        
        dataPool.push([[x1, y1], [x1 + distance / 2, y1 + height * 1.2], [x1 - distance / 2, y1 + height * 1.2], [context.fillStyle], [distance]]);

    }

    function getRandomRgb() {
        var r = Math.ceil(Math.random() * 256);
        var g = Math.ceil(Math.random() * 256);
        var b = Math.ceil(Math.random() * 256);
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

};
