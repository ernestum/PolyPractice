
function beat_ring(beat, cycle_length, fraction, offset, radius, sound) {
  beat = beat % cycle_length;
  noFill();
  ellipse(0, 0, radius*2, radius*2);
  for (var i = 0; i < cycle_length; i++) {
    if (i == beat) { 
      stroke(255, 0, 0);
    } else { 
      stroke(0);
    }
    if (i % fraction == offset) { 
      fill(0);
    } else { 
      noFill();
    }
    if (i == beat && i % fraction == offset) {
      sound.play();
    }
    var alpha = map(i, 0, cycle_length, 0, TWO_PI) - HALF_PI;
    var x = cos(alpha) * radius;
    var y = sin(alpha) * radius;
    ellipse(x, y, radius/5, radius/5);
  }
}

var soundDict = {};

var sound_files = ['anna1', 'anna2', 'anna3', 'anna4', 'anna5']

function preload() {
  soundFormats('mp3', 'ogg');
  
  for(var i = 0; i < sound_files.length; i++) {
    soundDict[sound_files[i]] = loadSound('data/' + sound_files[i] + '.ogg');
    soundDict[sound_files[i]].playMode('restart')
  }  
}

var speed = 5;
var speedMin = 0.5;
var speedMax = 10;
var speedStep = 0.1;

var beats = 12;
var beatsMin = 2;
var beatsMax = 32;

var period1 = 3;
var period1Min = 1;
var period1Max = 32;

var period2 = 4;
var period2Min = 1;
var period2Max = 32;

var offset1 = 0;
var offset1Min = 0;
var offset1Max = 32;

var offset2 = 0;
var offset2Min = 0;
var offset2Max = 32;


var sound_file1 = sound_files 
var sound_file2 = sound_files


function setup() {
  createCanvas(500, 500);
  
  strokeWeight(3);
  
  background(255);
  smooth();
  var gui = createGui("MAIN");
  gui.addGlobals('speed', 'beats', 
                 'sound_file1', 'sound_file2', 
                 'period1', 'period2',
                 'offset1', 'offset2');
}

function draw() {
  frameRate(speed);
  background(255);
  translate(width/2, height/2);
  beat_ring(frameCount, beats, period1, offset1, 170, soundDict[sound_file1]);
  beat_ring(frameCount, beats, period2, offset2, 100, soundDict[sound_file2]);
}
