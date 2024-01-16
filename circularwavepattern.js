function CircularWavePattern() {
  // Name of the visualization
  this.name = "Circular Wave Pattern";

  // Setup function to initialize variables and objects
  this.setup = function () {
    // Set angle mode, frame rate
    angleMode(DEGREES);
    frameRate(60);
    // Initialize BeatDetect and Fireworks
    beatDetect = new BeatDetect();
    fireworks = new Fireworks();
  };

  // Call the setup function to initialize
  this.setup();

  // Draw function to render the visualization
  this.draw = function () {
    angleMode(DEGREES);
    push();
    strokeWeight(3);
    noFill();

    // Get the waveform and spectrum data from the Fourier transform
    var wave = fourier.waveform();
    var spectrum = fourier.analyze();

    // Add fireworks when a beat is detected in the music
    if (beatDetect.detectBeat(spectrum)) {
      fireworks.addFirework();
    }

    // Update the fireworks animation
    fireworks.update();
    translate(width / 2, height / 2);

    // Change colours using the HSB colour mode
    colorMode(HSB, 360);
    stroke(frameCount % 360, 360, 360);

    // Draw the first circle
    var baseRadius1 = min(width, height) * 0.45;
    for (var t1 = -1; t1 <= 1; t1 += 2) {
      noFill();
      strokeWeight(5);
      beginShape();
      for (var i1 = 0; i1 <= 180; i1++) {
        var index1 = floor(map(i1, 0, 180, 0, wave.length - 1));

        var r1 = map(wave[index1], -1, 1, 0.5, 1.5) * baseRadius1;
        var x1 = r1 * sin(i1) * t1;
        var y1 = r1 * cos(i1);
        vertex(x1, y1);
      }
      endShape();
    }

    // Draw the second circle
    var baseRadius2 = min(width, height) * 0.35;
    for (var t2 = -1; t2 <= 1; t2 += 2) {
      noFill();
      beginShape();
      for (var i2 = 0; i2 <= 180; i2++) {
        var index2 = floor(map(i2, 0, 180, 0, wave.length - 1));

        var r2 = map(wave[index2], -1, 1, 0.5, 1.5) * baseRadius2;

        var x2 = r2 * sin(i2) * t2;
        var y2 = r2 * cos(i2);
        vertex(x2, y2);
      }
      endShape();
    }

    // Draw the third circle
    var baseRadius3 = min(width, height) * 0.25;
    for (var t3 = -1; t3 <= 1; t3 += 2) {
      noFill();
      beginShape();
      for (var i3 = 0; i3 <= 180; i3++) {
        var index3 = floor(map(i3, 0, 180, 0, wave.length - 1));

        var r3 = map(wave[index3], -1, 1, 0.5, 1.5) * baseRadius3;

        var x3 = r3 * sin(i3) * t3;
        var y3 = r3 * cos(i3);
        vertex(x3, y3);
      }
      endShape();
    }

    pop();
  };
}
