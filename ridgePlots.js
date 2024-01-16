function RidgePlots() {
  // Name of the visualization
  this.name = "Ridge Plots";

  // Variables for defining plot parameters
  var startX;
  var startY;
  var endY;
  var spectrumWidth;
  var speed = 1.5;
  var output = [];
  var perspective = 0.01;
  var vanishingPoint = createVector(width / 2, height / 2);

  // Add a counter to track frame updates
  var frameCounter = 0;

  // Add a new wave every 10 frames
  var framesBetweenWaves = 10;

  // Function to adjust plot parameters when the window is resized
  this.onResize = function () {
    startX = width / 5;
    endY = height / 5;
    startY = height - endY;
    spectrumWidth = (width / 5) * 3;
    output = [];
    vanishingPoint = createVector(width / 2, height / 2);
  };

  // Call onResize to set initial values when the object is created
  this.onResize();

  // Function to draw the Ridge Plots
  this.draw = function () {
    stroke(255);
    strokeWeight(2);
    var pointSize = 1;

    // Add a new wave every framesBetweenWaves frames
    if (frameCounter % framesBetweenWaves === 0) {
      addWave();
    }
    frameCounter++;

    // Loop through the output waves and draw them
    for (var i = output.length - 1; i >= 0; i--) {
      var wave = output[i];
      colorMode(HSB, 360);
      stroke(frameCount % 360, 360, 360);
      beginShape(POINTS);
      for (var j = 0; j < wave.length; j++) {
        wave[j].y -= speed;
        var z = map(wave[j].y, startY, endY, -100, 100);

        // Perspective transformation
        var perspectiveFactor = 1 / (1 + z * perspective);
        var x =
          vanishingPoint.x + (wave[j].x - vanishingPoint.x) * perspectiveFactor;
        var y =
          vanishingPoint.y + (wave[j].y - vanishingPoint.y) * perspectiveFactor;

        // Apply shading based on the z-coordinate
        var brightnessValue = map(z, -100, 100, 100, 255);
        fill(frameCount % 360, 360, brightnessValue);

        ellipse(x, y, pointSize, pointSize);
      }
      endShape();

      // Remove the wave if it goes beyond the endY
      if (wave[0].y < endY) {
        output.splice(i, 1);
      }
    }

    // Reset color mode to RGB
    colorMode(RGB);
  };

  // Function to add a new wave to the output
  function addWave() {
    var w = fourier.waveform();
    var outputWave = [];
    var smallScale = 10;
    var bigScale = 100;

    // Loop through the waveform data and create the wave
    for (var i = 0; i < w.length; i++) {
      if (i % 20 == 0) {
        var x = map(i, 0, 1024, startX, startX + spectrumWidth);

        if (i < 1024 * 0.25 || i > 1024 * 0.75) {
          var y = map(w[i], -1, 1, -smallScale, smallScale);
          var o = { x: x, y: startY + y };
          outputWave.push(o);
        } else {
          var y = map(w[i], -1, 1, -bigScale, bigScale);
          var o = { x: x, y: startY + y };
          outputWave.push(o);
        }
      }
    }
    output.push(outputWave);

    // Remove old waves if they go beyond endY
    if (outputWave[0].y < endY) {
      output.shift();
    }
  }
}
