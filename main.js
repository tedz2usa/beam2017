var log = console.log.bind(console);

window.onload = init;

var canvas, ctx, xMin, xMax, xScale, yMin, yMax, yScale;
var gridSpacing, canvasWidth, canvasHeight;
var originXOffset, originYOffset, tickLength;


function init() {
  canvas = getDom("myCanvas");
  ctx = canvas.getContext("2d");

  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  originXOffset = 100;
  originYOffset = 300;
  tickLength = 4;

  xMin = -10;
  xMax = 10;
  yMin = -10;
  yMax = 10;

  xScale = canvasWidth / (xMax-xMin);
  yScale = canvasHeight / (yMax-yMin);
  
  xGridSpace = 0.5;
  yGridSpace = 0.5;

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  print_x_axis();
  print_y_axis();

  for (var x = -20; x < 20; x+=0.01) {
    var y = x * x;
    print_dot( tx(x), ty(y) );
  }


  window.requestAnimationFrame(draw);
}

function getDom(id) {
  return document.getElementById(id);
}

function print_dot(x, y) {
  ctx.fillRect(x, y, 1, 1);
}

function print_line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function tx(x) {
  return (x - xMin) * xScale;
}

function ty(y) {
  return canvasHeight - (y-yMin)*yScale;
}

function print_x_axis() {
  print_line(tx(xMin), ty(0), tx(xMax), ty(0));
  for (var x = 0; x > xMin; x -= xGridSpace ) {
    print_x_tick(x);
  }
  for (var x = 0; x < xMax; x += xGridSpace) {
    print_x_tick(x);
  }
}

function print_x_tick(x) {
  if (x != 0) {
    print_line(tx(x), ty(0)-tickLength, tx(x), ty(0)+tickLength);
  }
}

function print_y_axis() {
  print_line(tx(0), ty(yMin), tx(0), ty(yMax));
  for (var y = 0; y < yMax; y += yGridSpace) {
    print_y_tick(y);
  }
  for (var y = 0; y > yMin; y -= yGridSpace) {
    print_y_tick(y);
  }
}

function print_y_tick(y) {
  if (y != 0) {
    print_line(tx(0) + tickLength, ty(y), tx(0)-tickLength, ty(y));
  }
}
















