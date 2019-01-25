
function beat_ring(beat, cycle_length, fraction, offset, radius, sound, c) {
  beat = beat % cycle_length;
  noFill();
  stroke(c);
  strokeWeight(3);
  ellipse(0, 0, radius*2, radius*2);
  var playingNow = false;
  for (var i = offset; i < cycle_length + offset; i++) {
    var isLoadedBeat = (i-offset) % fraction == 0;
    var isCurrentBeat = (i%cycle_length) == beat
    
    if (isCurrentBeat) { stroke(0); } else { noStroke(); }
    if (isLoadedBeat) { fill(c); } else { noFill(); }
    
    var r = 30;
    if (isLoadedBeat && isCurrentBeat) {
      playingNow = true;
      if(!mute) {
        sound.play();
      }
    }
    var alpha = map(i, 0, cycle_length, 0, TWO_PI) - HALF_PI;
    var x = cos(alpha) * radius;
    var y = sin(alpha) * radius;
    ellipse(x, y, r, r);
  }
  return playingNow;
}

var soundDict = {};

var soundFiles = ['anna1', 'anna2', 'anna3', 'anna4', 'anna5']

function preload() {
  soundFormats('mp3', 'ogg');
  
  for(var i = 0; i < soundFiles.length; i++) {
    soundDict[soundFiles[i]] = loadSound('data/' + soundFiles[i] + '.ogg');
    soundDict[soundFiles[i]].playMode('restart')
  }  
}

/// Main control
var speed = 5;
var speedMin = 0.5;
var speedMax = 20;
var speedStep = 0.1;

var beats = 12;
var beatsMin = 2;
var beatsMax = 32;

var mute = false;
var clap_indicators = true;


/// Loop 1 Control
var color1 = '#1f78b4'

var period1 = 3;
var period1Min = 1;
var period1Max = 32;

var offset1 = 0;
var offset1Min = 0;
var offset1Max = 16;

var soundFile1 = soundFiles

var volume1 = 1;
var volume1Min = 0;
var volume1Max = 1;
var volume1Step = 0.01;

/// Loop 2 Control
var color2 = '#33a02c'
var period2 = 4;
var period2Min = 1;
var period2Max = 16;

var offset2 = 0;
var offset2Min = 0;
var offset2Max = 32;
 
var soundFile2 = soundFiles

var volume2 = 1;
var volume2Min = 0;
var volume2Max = 1;
var volume2Step = 0.01;

function setup() {
  createCanvas(1000, 500);
  
  background(255);
  smooth();
  var mainGui = createGui("MAIN", 500-100, 500);
  mainGui.addGlobals('speed', 'beats', 'mute', 'clap_indicators')
  
  var l1Gui = createGui("LOOP 1", 20, 500);
  l1Gui.addGlobals('color1', 'period1', 'offset1', 'soundFile1', 'volume1');
  
  var l2Gui = createGui("LOOP 2", width - 200, 500);
  l2Gui.addGlobals('color2', 'period2', 'offset2', 'soundFile2', 'volume2');  
}

function draw() {
  frameRate(speed);
  background(255);
  translate(width/2, height/2);
  soundDict[soundFile1].setVolume(volume1)
  soundDict[soundFile2].setVolume(volume2)
  var leftIsFiring = beat_ring(frameCount, beats, period1, offset1, 170, soundDict[soundFile1], color1);
  var rightIsFiring = beat_ring(frameCount, beats, period2, offset2, 100, soundDict[soundFile2], color2);
  
  noFill();
  if(leftIsFiring && clap_indicators) { stroke(color1); } else { noStroke(); }
  ellipse(-width/3, 0, 100, 100);
  
  if(rightIsFiring && clap_indicators) { stroke(color2); } else { noStroke(); }
  ellipse(width/3, 0, 100, 100);
}
