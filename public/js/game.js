let scale = 1;
let last = 100;
let square;
let back = [];
let darker = false;
let colorU;
var xOffset = 0.0; 
var yOffset = 0.0;
var locked = false;
var bx = 300;
var by = 200;
let randSunX; //Saved
let randSunY; //Saved
//Various variable declorations

var sunImg=[];
var planetHumanImg, planetAlienImg, planetLifelessImg;

//Specific Images
function drawSun(centerX,centerY) {
  back[centerX-1][centerY-1].addImage(sunImg[1]);
  back[centerX][centerY-1].addImage(sunImg[2]);
  back[centerX+1][centerY-1].addImage(sunImg[3]);
  back[centerX-1][centerY].addImage(sunImg[4]);
  back[centerX][centerY].addImage(sunImg[5]);
  back[centerX+1][centerY].addImage(sunImg[6]);
  back[centerX-1][centerY+1].addImage(sunImg[7]);
  back[centerX][centerY+1].addImage(sunImg[8]);
  back[centerX+1][centerY+1].addImage(sunImg[9]);
}

class Square {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.originalColor = color;
    this.img = "None";

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
    if (this.img != "None"){
      image(this.img, this.XAppearance(), this.YAppearance(),this.sizeAppearance(), this.sizeAppearance())
    }
  }
  hovering() {
    return mouseX > this.XAppearance() && mouseX < this.XAppearance() + this.sizeAppearance() && mouseY > this.YAppearance() && mouseY < this.YAppearance() + this.sizeAppearance();
  }

  addImage(img) {
    this.img = img
  }
  removeImage() {
    this.img = "None"
  }

} //Sqaure Class

function setup() {
  randSunX = int(random(10,50))
  randSunY = int(random(10,30))

  for (let i = 1; i <= 9; i++) {
    sunImg[i] = loadImage("../images/sun/"+i+".png")
  }
  planetHumanImg = loadImage("../images/planetHuman.png")
  planetAlienImg = loadImage("../images/planetAlien.png")
  planetLifelessImg = loadImage("../images/planetLifeless.png")

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
      back[i][j] = new Square(i*100-3000, j*100-2000, colorU);
    }
  } //Calculate Background Sqaures
}

function draw() {
  scale = last/1000;
  background(100)
  
  for (let i = 0; i < back.length; i++) {
    for (let j = 0; j < back[i].length; j++) {	
      back[i][j].color = back[i][j].originalColor;
      if (back[i][j].hovering() == true) {
        back[i][j].color = back[i][j].originalColor+10;
      }
    }
  } //Highlight Hovering Sqaures

  drawSun(randSunX,randSunY);

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
