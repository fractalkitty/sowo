//press r to get another hat
//press s to save off file
let stitches = [knit];
let increases = [m1l, m1r, yo];
let decreases = [ssk, k2tog];
let doubleDec = [s2kp2];
let stitchArray;
let patternArray;
let row2;

function setup() {
  cnv = createCanvas(800, 800);
  d = 13;
  textWrap(WORD);
  stitchArray = [];
  patternArray = [];
  noLoop();
  rectMode(CENTER);
  textSize(9);
  textAlign(CENTER);
  nPairs = random([3, 4, 5, 6, 7]);
  cnt = 0;
  for (let i = 0; i < nPairs; i++) {
    stitchArray[cnt] = random(increases);
    cnt++;
    stitchArray[cnt] = random(decreases);
    cnt++;
  }
  for (let i = cnt; i < 20; i++) {
    stitchArray[cnt] = random(stitches);
    cnt++;
  }
  nPatternRows = random([3, 4]);
  for (let i = 0; i < nPatternRows; i++) {
    tmp = shuffle(stitchArray);
    patternArray[i] = tmp; // Create a new copy of the shuffled array
  }
}

function draw() {
  background(255);
  textSize(20);
  fill(0);
  noStroke();
  text("Generative Texture Hat", width / 2 - 50, 40);
  strokeWeight(1.5);
  row2 = 11;
  stroke(0);
  noFill();
  push();
  translate(100, -310 + nPatternRows * d);
  for (let i = 0; i < patternArray.length; i++) {
    for (let j = 0; j < patternArray[i].length; j++) {
      let x = j * d + d / 2;
      let y = height - i * d * 2 - 11 * d - d / 2;
      if (row2 < 41) {
        patternArray[i][j](x, y - d);
        knit(x, y);
      }
    }
    row2 += 2;
  }

  pop();
  push();
  translate(100 + d, 360);
  closing();
  pop();
  push();
  translate(150, 100);
  legend();
  pop();
  instructions();
}

function closing() {
  push();
  nStitches = 20;

  for (let i = 0; i < 18; i++) {
    if (i % 2 === 0) {
      for (j = 0; j < nStitches; j++) {
        knit(j * d + d / 2 + (i - 1) * d, 20 * d - i * d);
      }
    } else {
      sA = [];
      nStitches -= 2;
      if (nStitches > 10) {
        sA[0] = random(increases);
        sA[1] = random(decreases);
        sA[2] = random(doubleDec);
        for (j = 3; j < nStitches; j++) {
          sA[j] = random(stitches);
        }
      } else {
        nStitches -= 2;
        if (nStitches >= 4) {
          sA[0] = random(doubleDec);
          sA[1] = random(doubleDec);
          for (j = 2; j < nStitches; j++) {
            sA[j] = random(stitches);
          }
        } else {
          for (j = 1; j < nStitches; j++) {
            sA[j] = random(stitches);
          }
        }
      }
      sA = shuffle(sA);
      for (let j = 0; j < sA.length; j++) {
        sA[j](j * d + d / 2 + i * d, 20 * d - i * d);
        if (sA[j] === s2kp2) {
        }
      }
    }
  }
  pop();
}
function legend() {
  push();
  stroke(0);
  textSize(14);
  x = width - width / 3;
  y = height - 200;
  rect(x - 80, y - 10, 200, 120);
  noFill();
  knit(x - 140, y - 40);
  purl(x - 140, y - 20);
  ssk(x - 140, y - 0);
  k2tog(x - 140, y + 20);
  yo(x - 40, y - 40);
  m1r(x - 40, y - 20);
  m1l(x - 40, y - 0);
  s2kp2(x - 40, y + 20);
  noStroke();
  fill(0);
  textAlign(LEFT);
  text("Legend", x - 100, y - 50);
  text("knit", x - 130, y - 36);
  text("purl", x - 130, y - 16);
  text("ssk", x - 130, y + 4);
  text("k2tog", x - 130, y + 24);
  text("yo", x - 30, y - 36);
  text("m1r", x - 30, y - 16);
  text("m1l", x - 30, y + 4);
  text("s2kp2", x - 30, y + 24);
  pop();
}
function instructions() {
  push();
  noStroke();
  fill(0);
  textAlign(LEFT);
  textSize(14);
  text("Chart A", 30, 350);
  text("Chart B", 30, 550);
  text(
    "About 220yds of worsted weight yarn. Pattern is for medium-small hat - increase needle size by 0.5mm to make medium.",
    400,
    70,
    width - 200
  );
  push();
  translate(0, 20);
  text(
    "1.) Cast on 100 stitches to 3.5mm circular or dpn.(Place marker).",
    100,
    120
  );
  text(
    "2.) Create ribbing to desired length by repeating {k,p} for 10-15 rows.",
    100,
    140
  );
  text("3.) Change to larger needles (4mm).", 100, 160);
  text(
    "4.) Follow chart A (from bottom right) 4-6 times (5x per round) so the length of the pattern is 5.5-6in. ",
    100,
    180
  );
  text("5.) Follow Chart B once (from bottom right). ", 100, 200);
  text(
    "7.) When 20sts remain, repeat {ssk,k,k} until 6-8sts remain.",
    100,
    220
  );
  text("8.) Loop last sts through yarn to finish and weave ends in.", 100, 240);
  pop();
  text(
    "Hat is worked with repeated panels of charts. For a large hat, cast on 120sts and repeat 6x instead of 5x and adjust to desired height.",
    600,
    350,
    200
  );
  pop();
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

// function ribbing() {
//   y = 0;
//   for (let i = 1; i <= 10; i++) {
//     for (j = 0; j < 20; j++) {
//       let x = j * d + d / 2;
//       let y = height - i * d - d / 2;
//       noFill();
//       if (j % 2 === 0) {
//         knit(x, y);
//       } else {
//         purl(x, y);
//       }
//     }
//   }
//   noFill();
// }
