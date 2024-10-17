let ratio = 1.3333; //4:3 aspect ratio
let globeScale; // scale factor
let mic;
let vol = 1; // microphone and volume
let normVol; // normalized volume
let volSense = 100; // volume sensitivity
let sliderStep = 10; // slider step
let volSenseSlider; // volume sensitivity slider
let startAudio = false;

// Frequency variables
let fft; // Fast Fourier Transform object
let spectrum; // frequency spectrum
let waveform; // waveform

function setup() {
  createCanvas(window.innerWidth, window.innerWidth / ratio);
  globeScale = min(width, height);
  colorMode(HSB);

  getAudioContext().suspend();

  volSenseSlider = createSlider(0, 200, volSense, sliderStep);
}

function draw() {
  if (startAudio) {
    vol = mic.getLevel(); // get the volume level\
    spectrum = fft.analyze(); // analyze the waveform
    waveform = fft.waveform(); // analyze the waveform
    volSense = volSenseSlider.value(); // get the volume sensitivity
    normVol = vol * volSense; //normalize the volume level
    console.log(vol); // returns value between 0 and 1

    // WAVEFORM VISUALIZATION
    noFill();
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = map([i], -1, 1, 0, height);
      vertex(x, y);
    }
    endShape();
  }
  background(200, 100, 100);
  smileyFace();
}

function mousePressed() {
  if (!startAudio) {
    mic = new p5.AudioIn();
    fft = new p5.FFT();
    mic.start;
    startAudio = true;
  }
}
