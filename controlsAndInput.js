function ControlsAndInput(sounds, selectedSound) {
  // Reference to the selected sound
  this.selectedSound = selectedSound;
  // Create a playback button and initialize it with the selected sound
  this.playbackButton = new PlaybackButton(this.selectedSound);

  // Dropdown menu for visualizations
  let dropdown;

  // Function to handle mouse click events
  this.mousePressed = function () {
    // Check if the playback button has been clicked
    var isButtonClicked = this.playbackButton.hitCheck();
  };

  // Function for setup tasks
  this.setup = function () {
    // Create a dropdown menu for visualizations
    dropdown = createSelect();
    dropdown.position(100, 60);
    dropdown.style("width", "280px");
    dropdown.style("height", "40px");
    dropdown.style("border-radius", "3px");
    dropdown.style("padding-left", "10px");
    dropdown.style("font-size", "25px");
    dropdown.style("font-family", "'ZCOOL QingKe HuangYou', sans-serif");

    // Populate the dropdown with visualization names
    for (var i = 0; i < vis.visuals.length; i++) {
      dropdown.option(vis.visuals[i].name);
    }

    // Set a callback for when the dropdown selection changes
    dropdown.changed(() => this.selection());
  };

  // Call the setup function to initialize
  this.setup();

  // Function to draw the playback button and menu
  this.draw = function () {
    push();
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(34);

    // Playback button
    this.playbackButton.draw();

    // Display text for selecting a visualization
    text("Select a Visualisation :", 100, 50);
    pop();
  };

  // Function to handle dropdown selection changes
  this.selection = function () {
    var selectedOption = dropdown.value();
    // Find the corresponding sound based on the selected visualization
    for (var i = 0; i < soundFiles.length; i++) {
      if (selectedOption == soundFiles[i][1]) {
        // Update the selected sound reference
        this.selectedSound = sounds[i];
        // Update the sound for the playback button
        this.playbackButton.sound = sounds[i];
        break;
      }
    }
    // Select the chosen visualization
    vis.selectVisual(selectedOption);
  };
}
