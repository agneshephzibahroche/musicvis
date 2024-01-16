function Firework(colour, x, y) {
  // Initialize properties
  var colour = colour; // Colour of the firework
  var x = x; // X-coordinate of the firework
  var y = y; // Y-coordinate of the firework

  // Array to store particles of the firework
  var particles = [];

  // Flag to indicate if the firework is depleted
  this.depleted = false;

  // Create particles for the firework explosion
  for (var i = 0; i < 360; i += 18) {
    // Create a new particle and add it to the particles array
    // Parameters: x, y, color, angle, speed
    particles.push(new Particle(x, y, colour, i, 10));
  }

  // Function to draw the firework
  this.draw = function () {
    // Loop through all particles and draw them
    for (var i = 0; i < particles.length; i++) {
      particles[i].draw();
    }

    // Check if the first particle's speed has reached zero, indicating the firework has depleted
    if (particles[0].speed <= 0) {
      this.depleted = true;
    }
  };
}
