//displays and handles clicks on the playback button

function PlaybackButton(sound) {
  // Initialize button properties
  this.sound = sound; // The sound associated with the button
  this.x = 30; // X-coordinate of the button
  this.y = 30; // Y-coordinate of the button
  this.width = 40; // Width of the button
  this.height = 40; // Height of the button

  //flag to determine whether to play or pause after button click and to determine which icon to draw
  this.playing = false;

  // Function to draw the playback button
  this.draw = function () {
    // Check if the sound is playing and draw the appropriate icon
    if (this.playing) {
      // Draw the pause button
      rect(this.x, this.y, this.width / 2 - 2, this.height);
      rect(
        this.x + (this.width / 2 + 2),
        this.y,
        this.width / 2 - 2,
        this.height
      );
    } else {
      // Draw the play button
      triangle(
        this.x,
        this.y,
        this.x + this.width,
        this.y + this.height / 2,
        this.x,
        this.y + this.height
      );
    }

    // Display a label for the button
    text("Select a Sound :", 500, 50);
  };

  //checks for clicks on the button, starts or pauses playabck.
  //@returns true if clicked false otherwise.
  this.hitCheck = function () {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      if (this.sound.isPlaying()) {
        // Pause the sound if it's playing
        this.sound.pause();
      } else {
        // Start playing the sound if it's paused
        this.sound.loop();
      }
      // Update the playing state based on whether the sound is playing
      this.playing = this.sound.isPlaying();
      return true; // Button was clicked
    }
    return false; // Button was not clicked
  };
}
