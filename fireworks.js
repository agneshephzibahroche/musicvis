function Fireworks() {
  var fireworks = []; // Array to store individual fireworks

  // Function to add a new firework to the array
  this.addFirework = function () {
    var f_colour = null; // Colour for the firework

    // Set the colour mode to HSB (Hue, Saturation, Brightness)
    colorMode(HSB, 360);
    // Calculate colour components based on frameCount
    var r = frameCount % 360;
    var g = 360;
    var b = 360;

    // Create a colour object with the calculated values
    f_colour = color(r, g, b);

    // Generate random position within a specified range
    var f_x = random(width * 0.2, width * 0.8);
    var f_y = random(height * 0.2, width * 0.8);

    // Create a new Firework object with the generated colour and position
    var firework = new Firework(f_colour, f_x, f_y);
    // Add the new firework to the fireworks array
    fireworks.push(firework);
  };

  // Function to update and draw all fireworks
  this.update = function () {
    for (var i = 0; i < fireworks.length; i++) {
      fireworks[i].draw(); // Draw the firework

      // Check if the firework has depleted (exploded)
      if (fireworks[i].depleted) {
        fireworks.splice(i, 1); // Remove depleted firework from the array
      }
    }
  };
}
