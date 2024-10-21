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
  background(200, 100, 100);

  if (startAudio) {

    vol = mic.getLevel(); // get the volume level\
    spectrum = fft.analyze(); // analyze the waveform
    waveform = fft.waveform(); // analyze the waveform
    
    volSense = volSenseSlider.value(); // get the volume sensitivity
    normVol = vol * volSense; //normalize the volume level
    

    waveForm(); // draw the waveform
    spectrumF();

  }

  smileyFace();
}

function mousePressed() {

  getAudioContext().resume();

  if (!startAudio) {
    mic = new p5.AudioIn();
    fft = new p5.FFT();
    fft.setInput(mic);

    mic.start();
    startAudio = true;
  }
}

function waveForm() {
  if(startAudio) {
  // WAVEFORM VISUALIZATION
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    let strokeCol = map(waveform[i], -1, 1, 0, 360);
    let strokeSat = map(waveform[i], -1, 1, 0, 100);

    stroke(strokeCol, strokeSat, 100);
    strokeWeight(globeScale * 0.01);
    vertex(x, y);
  }
  endShape();
}
}

function spectrumF() {
  // SPECTRUM
  if(startAudio) {
    for(let i = 0; i< spectrum.length; i++) {

      let rectX = map(i, 0, spectrum.length, 0, width);
      let rectY = height;
      let rectW = globeScale* 0.5;
      let rectH = -map(spectrum[i], 0, 255, 0, height);
      noStroke();
      fill(spectrum[i], 100, 100, 0.1);
      rect(rectX, rectY, rectW, rectH);

      let rectX2 = width - rectX - rectW;
      rect(rectX2, rectY, rectW, rectH);
      
      

    }
  }
}