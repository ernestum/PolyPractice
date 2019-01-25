
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


function preload() {
  soundFormats('mp3');
  sound1 = loadSound('data/anna4.mp3');
  sound1.playMode('restart')
  
  sound2 = loadSound('data/anna3.mp3');
  sound2.playMode('restart')
}

function setup() {
  createCanvas(500, 500);
  
  strokeWeight(3);
  frameRate(5);
  background(255);
}

function draw() {
  
  translate(width/2, height/2);
  beat_ring(frameCount, 8, 3, 1, 170, sound1);
  beat_ring(frameCount, 8, 5, 0, 100, sound2);
}
