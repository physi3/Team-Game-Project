let scale = 1;
let last = 100;
let square;
let back = [];
let darker = false;
let colorU;
var xOffset = 0.0; 
var yOffset = 0.0;
var locked = false;
var bx = 100;
var by = 100;

class Square {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.originalColor = color;
  }
  XAppearance() {
    return ((this.x*scale)+bx);
  }
  YAppearance() {
    return ((this.y*scale)+by);
  }
  sizeAppearance() {
    return (100 * scale)
  }  
  show() {
    fill(this.color)
    rect(this.XAppearance(), this.YAppearance(),this.sizeAppearance(),this.sizeAppearance())
  }
  hovering() {
    return mouseX > this.XAppearance() && mouseX < this.XAppearance() + this.sizeAppearance() && mouseY > this.YAppearance() && mouseY < this.YAppearance() + this.sizeAppearance();
  }
}

function setup() {
  createCanvas(600, 400);
  noStroke();
  for (let i = 0; i <= 60; i++) {
    back[i] = []
    for (let j = 0; j <= 40; j++) {
      darker = !darker
      if (darker == true) {
        colorU = color(3,3,3)
      } else {
        colorU = color(15,15,15)
      }
      back[i][j] = new Square(i*100, j*100, colorU);
    }
  }
}

function draw() {
  scale = last/1000;
  background(100)
  for (let i = 0; i < back.length; i++) {
    for (let j = 0; j < back[i].length; j++) {	
      back[i][j].color = back[i][j].originalColor;
      if (back[i][j].hovering() == true) {
        back[i][j].color = 150;
      }
    }
  }
  back[10][10].color = color(250,250,0)
  for (let i = 0; i < back.length; i++) {
    for (let j = 0; j < back[i].length; j++) {
      back[i][j].show();
    }
  }
}

function mouseWheel(event) {
  last = event.delta*-1+last
  if (last <= 0){
  	last = 100
  }
}

function mousePressed() { 
  locked = true; 
  xOffset = mouseX-bx; 
  yOffset = mouseY-by; 

}
function mouseDragged() {
  if(locked) {
    bx = mouseX-xOffset; 
    by = mouseY-yOffset; 
  }
}

function mouseReleased() {
  locked = false;
}