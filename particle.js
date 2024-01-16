function Particle(x, y, colour, angle, speed) {
  // Initialize particle properties
  var x = x; // x-coordinate
  var y = y; // y-coordinate
  var angle = angle; // Initial angle of movement
  this.speed = speed; // Initial speed of the particle
  this.colour = colour; // Color of the particle
  this.age = 255; // Initial age (opacity) of the particle

  // Function to draw the particle
  this.draw = function () {
    // Update particle properties
    this.update();
    noStroke();

    // Calculate the new color based on age
    var r = red(this.colour) - (255 - this.age);
    var g = green(this.colour) - (255 - this.age);
    var b = blue(this.colour) - (255 - this.age);

    // Create a new color with the updated values
    var c = color(r, g, b);
    fill(c);

    // Decrease the age (opacity) of the particle
    this.age -= 1;

    // Draw the particle as an ellipse
    ellipse(x, y, 10, 10);
  };

  // Function to update the particle's position and speed
  this.update = function () {
    // Decrease the speed over time
    this.speed -= 0.1;

    // Update the particle's position based on its angle and speed,
    // with some noise added to create randomness
    x += cos(angle) * speed + noise(frameCount) * 10;
    y += sin(angle) * speed + noise(frameCount) * 10;
  };
}
