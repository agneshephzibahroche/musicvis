let barWidth = 10; // width of each bar in the visualizer
let barGap = 10; // gap between bars in the visualizer
let targetHeights = []; // Array to store target heights for animation

function MusicBars() {
  // Visualization name
  this.name = "Music Bars";

  // Setup function to initialize targetHeights array
  this.setup = function () {
    let numBars = Math.floor(width / (barWidth + barGap));
    targetHeights = new Array(numBars).fill(0);
  };
  this.setup();

  // Draw the wave form to the screen
  this.draw = function () {
    push();
    noFill();
    noStroke();

    var spectrum = fourier.analyze();

    for (let i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var targetHeight = map(amp, 0, 255, 0, height);

      // Smooth animation using linear interpolation
      targetHeights[i] = lerp(targetHeights[i], targetHeight, 0.1);
      let x = i * (barWidth + barGap) + barGap / 2;
      let y = height - targetHeights[i];

      // Map colors based on position and amplitude
      var r = map(x, 0, width, 0, 255);
      var g = map(y, 0, height, 0, 255);
      var b = map(amp, 0, 100, 60, 255);

      fill(r, g, b);

      translate(x + barWidth / 2, y + targetHeights[i] / 2);
      rect(-barWidth / 2, -targetHeights[i] / 2, barWidth, targetHeights[i]);
      translate(-(x + barWidth / 2), -(y + targetHeights[i] / 2));
    }

    pop();
  };
}
