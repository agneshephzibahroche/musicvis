//global for the controls and input
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sounds = null;
//variable for p5 fast fourier transform
var fourier;
//font
let font;

// Add multiple sounds
// Index of the selected sound
var selectedSoundIndex = 0;
var soundFiles = [
  ["assets/stomper_reggae_bit.mp3", "Fast Pace"],
  ["assets/medium.mp3", "Medium Pace"],
  ["assets/relaxing.mp3", "Slow Pace"],
  ["assets/A_Thousand_Miles.mp3", "Song"],
];

// Preload function to load assets
function preload() {
  // Load sound files and font
  sounds = [
    loadSound("assets/stomper_reggae_bit.mp3"),
    loadSound("assets/medium.mp3"),
    loadSound("assets/relaxing.mp3"),
    loadSound("assets/A_Thousand_Miles.mp3"),
  ];
  font = loadFont(
    "assets/ZCOOL_QingKe_HuangYou/ZCOOLQingKeHuangYou-Regular.ttf"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textFont(font);

  // Instantiate the fft object
  fourier = new p5.FFT();

  // Create a new visualisation container and add visualisations
  vis = new Visualisations();
  vis.add(new Spectrum());
  vis.add(new WavePattern());
  vis.add(new Needles());
  vis.add(new RidgePlots());
  vis.add(new MusicBars());
  vis.add(new CircularWavePattern());

  // Store the selected sound object
  var selectedSound = sounds[selectedSoundIndex];

  // Initialize the controls and input with the sounds array
  controls = new ControlsAndInput(sounds, selectedSound);

  // Create a dropdown menu for selecting sounds
  dropdown = createSelect();
  dropdown.position(500, 60);
  dropdown.style("width", "195px");
  dropdown.style("height", "40px");
  dropdown.style("border-radius", "3px");
  dropdown.style("padding-left", "10px");
  dropdown.style("font-size", "25px");
  dropdown.style("font-family", "'ZCOOL QingKe HuangYou', sans-serif");

  // Populate the dropdown
  for (var i = 0; i < soundFiles.length; i++) {
    dropdown.option(soundFiles[i][1]);
  }

  // Handle change event of the dropdown
  dropdown.changed(() => {
    var selectedOption = dropdown.value();
    for (var i = 0; i < soundFiles.length; i++) {
      if (selectedOption == soundFiles[i][1]) {
        if (controls.selectedSound.isPlaying()) {
          controls.selectedSound.stop();
        }
        // Update the selected sound reference in ControlsAndInput
        controls.selectedSound = sounds[i];

        // Update the sound for the playback button
        controls.playbackButton.sound = sounds[i];
        break;
      }
    }

    if (controls.playbackButton.playing) {
      if (controls.selectedSound.isPlaying()) {
        controls.selectedSound.stop();
      } else {
        for (let i = 0; i < sounds.length; i++) {
          if (sounds[i].isPlaying()) {
            sounds[i].stop();
          }
        }
        controls.selectedSound.play();
      }
    }
  });
}

function draw() {
  background(0);
  // Draw the selected visualization
  vis.selectedVisual.draw();
  // Draw the controls
  controls.draw();
}

function mouseClicked() {
  // Handle mouse clicks in the controls
  controls.mousePressed();
}

function keyPressed() {
  // Handle key presses in the control
  controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (vis.selectedVisual.hasOwnProperty("onResize")) {
    vis.selectedVisual.onResize();
  }
}
