// ml5.js: Classifying Drawings with DoodleNet (Mouse)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/9.1-doodlenet.html
// https://youtu.be/ABN_DWnM5GQ

// Template: https://editor.p5js.org/codingtrain/sketches/AHgkwgPdc
// Mouse: https://editor.p5js.org/codingtrain/sketches/6LLnGY1VY
// Video: https://editor.p5js.org/codingtrain/sketches/fxFKOn3il

let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

function setup() {
  canvas = createCanvas(200, 200);
  clearButton = createButton('Limpiar la pizarra');
  clearButton.mousePressed(clearCanvas);
  background(255);
  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  resultsDiv = createDiv('Cargando...');
}

function modelReady() {
  console.log('pizarra Cargada');
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(results);
  let content = `<div class="result"><p><strong><center>${results[0].label} 
                 ${nf(100 * results[0].confidence, 2, 1)}%<br/>
                 ${results[1].label} 
                 ${nf(100 * results[1].confidence, 2, 1)}% </center><strong></p></div>`;

  resultsDiv.html(content);
  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
