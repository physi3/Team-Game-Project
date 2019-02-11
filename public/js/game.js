let last = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(3);
  back(70,40,last/1000);
}

function back(x,y,scale) {
	for (let i = 0; i <= 100; i++) {
  	for (let j = 0; j <= 200; j++) {
    	fill(6)
      x1 = x-4000+i*56-1+(27*j)
      y1 = y-4000+55+j*55
      x2 = x-4000+28+i*56+(27*j)
      y2 = y-4000+j*55
      x3 = x-4000+56+i*56+(27*j)
      y3 = y-4000+55+j*55
      triangle(x1*scale,y1*scale,x2*scale,y2*scale,x3*scale,y3*scale);
      fill(256)
    }
  }
}

function mouseWheel(event) {
  print(event.delta*-1+last);
  last = event.delta*-1+last
  if (last <= 0){
  	last = 100
  }
}