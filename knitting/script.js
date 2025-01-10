//draft - needs to be knitted to test
let stitches = [knit];
let increases = [m1l, m1r, yo];
let decreases = [ssk, k2tog];
let doubleDec = [s2kp2]
let stitchArray;
let patternArray;
let row2

function setup() {
  cnv = createCanvas(800, 800);
  d = 13;
  stitchArray = [];
  patternArray = [];
  noLoop();
  rectMode(CENTER);
  textSize(9);
  textAlign(CENTER);
  nPairs = random([3, 4, 5, 6]);
  cnt = 0;
  for (let i = 0; i < nPairs; i++) {
    stitchArray[cnt] = random(increases);
    cnt++
    stitchArray[cnt] = random(decreases);
    cnt++
  }
  for (let i = cnt; i < 20; i++) {
    stitchArray[cnt] = random(stitches);
    cnt++
  }
  nPatternRows = random([3,4,5,6,7])
  for (let i = 0; i < nPatternRows; i++) {
    tmp = shuffle(stitchArray);
    patternArray[i] = tmp; // Create a new copy of the shuffled array
  }
  
}

function draw() {
  
  background(255);
  translate(d, 0);
  push()
  textSize(20)
  fill(0)
  noStroke()
  text("Generative Texture Hat", width/2-50,40)
  pop()
  strokeWeight(1.5);
  //ribbing
  ribbing();
  row2 = 11;
  stroke(0);
  noFill();
  nR = 30 / (nPatternRows*2)
  for (let rep = 0; rep < nR; rep++) {
    push()
    translate(0,-((nPatternRows*2))*d*rep)
    for (let i = 0; i < patternArray.length; i++) {
      for (let j = 0; j < patternArray[i].length; j++) {
        let x = j * d + d / 2;
        let y = height - i * d * 2 - 11 * d - d / 2;
        if(row2 < 41){
          patternArray[i][j](x, y - d);
          knit(x,y)
        }
      }
      row2+=2
    }
    pop()
  }
  push()
  translate(d,0)
  closing()
  pop()
// }
  row1 = 1;
  for (let i = 0; i < 53; i++) {
    markRow();
  }
  legend()
  instructions()
}

function ribbing() {
  y = 0;
  for (let i = 1; i <= 10; i++) {
    for (j = 0; j < 20; j++) {
      let x = j * d + d / 2;
      let y = height - i * d - d / 2;
      noFill();
      if (j % 2 === 0) {
        knit(x, y);
      } else {
        purl(x, y);
      }
    }
  }
  noFill();
}
function closing(){
  push()
  nStitches = 20
  
  for(let i = 0;i<18;i++){
    
    if (i%2===0){
      for(j = 0;j<nStitches;j++){
        
        knit(j*d+d/2+(i-1)*d,20*d - i*d )
      }
    }else{
      sA = []
      nStitches -= 2
      if(nStitches>10){
        sA[0] =  random(increases);
      sA[1] =  random(decreases);
        sA[2] = random(doubleDec)
        for( j = 3;j<nStitches;j++){
          sA[j] = random(stitches)
        }
      }else{
        nStitches -= 2
        if(nStitches>=4){
          sA[0] = random(doubleDec)
          sA[1] = random(doubleDec)
        for( j = 2;j<nStitches;j++){
          sA[j] = random(stitches)
        }
        }else{
          
        for( j = 1;j<nStitches;j++){
          sA[j] = random(stitches)
        }
        }
        
      }
      sA = shuffle(sA)
      for(let j = 0;j<sA.length;j++){
        sA[j](j*d+d/2+(i)*d,20*d - i*d);
        if(sA[j]===s2kp2){
          
        }
      }
      
    }
    
  }
  pop()
  
}
function legend(){
  push()
  stroke(0)

  x = width - width/3
  y = height - 200
  rect(x-80,y-10,200,100)
  noFill()
  knit(x - 140,y-40)
  purl(x - 140,y-20)
  ssk(x - 140,y-0)
  k2tog(x - 140,y+20)
  yo(x-40 ,y-40)
  m1r(x-40 ,y-20)
  m1l(x-40 ,y-0)
  s2kp2(x-40,y+20)
  noStroke()
  fill(0)
  textAlign(LEFT)
  text("Legend",x-100 ,y-50)
  text("knit",x - 130,y-36)
  text("purl",x - 130,y-16)
  text("ssk",x - 130,y+4)
  text("k2tog",x - 130,y+24)
  text("yo",x - 30,y-36)
  text("m1r",x - 30,y-16)
  text("m1l",x - 30,y+4)
  text("s2kp2",x - 30,y+24)
  pop()
}
function instructions(){
  push()
  noStroke()
  fill(0)
  textAlign(LEFT)
  textSize(14)
  text("1.) Cast on 100 stitches to a size 3.5mm circular or dpn.",320,100)
  text("2.) Create ribbing to desired length or rows 1-10 repeated 5x",320,120);
  text("3.) Change to larger needles (4mm)",320,140);
  text("4.) Follow pattern from row 11 to 53 (repeat 5x per row).",320,160);
  text("5.) Close last 4 stitches by sewing thread through and finishing.",320,180);
  pop()
  
}
function markRow() {
  push();
  noStroke();
  fill(100);
  text(str(row1), d / 4 + d * 20.5, height - row1 * d - d / 4);
  pop();
  row1++;
}
function knit(x, y) {
  rect(x, y, d, d);
}
function purl(x, y) {
  rect(x, y, d, d);
  fill(0);
  circle(x, y, d / 4);
  noFill();
}

function m1l(x, y) {
  rect(x, y, d, d);
  line(x - d / 3, y - d / 3, x + d / 3, y + d / 3);
  line(x, y, x + d / 3, y - d / 3);
}

function m1r(x, y) {
  rect(x, y, d, d);
  line(x + d / 3, y - d / 3, x - d / 3, y + d / 3);
  line(x, y, x - d / 3, y - d / 3);
}

function k2tog(x, y) {
  rect(x, y, d, d);
  line(x + d / 3, y - d / 3, x - d / 3, y + d / 3);
}

function ssk(x, y) {
  rect(x, y, d, d);
  line(x - d / 3, y - d / 3, x + d / 3, y + d / 3);
}

function s2kp2(x, y) {
  rect(x, y, d, d);
  line(x, y - d / 4, x, y + d / 3);
  line(x, y - d / 4, x + d / 4, y + d / 3);
  line(x, y - d / 4, x - d / 4, y + d / 3);
}

function yo(x, y) {
  rect(x, y, d, d);
  circle(x, y, d / 3);
}

function keyPressed() {
  if (keyCode === 83) {
    save(cnv, "knit", "jpg");
  }
  if (keyCode === 82) {
    setup();
    draw();
  }
}