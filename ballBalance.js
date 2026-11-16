let ballX;
let targetX;
let ballY;
let ballRadius = 22;
let startButton;

// Voice recording
let speechRec;
let speech;
let isListening = false;
let transcript = "";

let recordButton;
let messageText = "";

function setup() {
  createCanvas(windowWidth, windowHeight);

  ballX = width / 2;
  targetX = width / 2;
  ballY = height / 2;

  // Tilt activation button
  startButton = createButton("ENABLE PHONE TILT");
  startButton.position(width / 2 - 85, height - 130);

  startButton.mousePressed(function() {
    setupOrientation(2);
    startButton.html("SENSOR ACTIVATION REQUESTED");
  });

  // Speech recognition
  speechRec = new p5.SpeechRec("en-US", gotSpeech);
  speechRec.continuous = true;
  speechRec.interimResults = false;
  speechRec.onEnd = speechEnded;

  // Text-to-speech
  speech = new p5.Speech();

  // Record message button
  recordButton = createButton("RECORD MESSAGE");
  recordButton.position(width / 2 - 85, height - 75);
  recordButton.mousePressed(toggleRecording);
}

function draw() {
  background(20, 29, 42);

  // Read phone orientation
  if (orientationSensor.hasNewValue) {
    let gyro = orientationSensor.get();
    let gamma = gyro.gamma;

    targetX = map(gamma, -30, 30, 40, width - 40);
    targetX = constrain(targetX, 40, width - 40);
  }

  // Smooth ball movement
  ballX = lerp(ballX, targetX, 0.08);

  // Calculate line angle
  let lineAngle = map(ballX, 0, width, 0.25, -0.25);

  let lineLength = width - 60;

  // Calculate line endpoints
  let leftX = width / 2 - cos(lineAngle) * lineLength / 2;
  let leftY = ballY + sin(lineAngle) * lineLength / 2;

  let rightX = width / 2 + cos(lineAngle) * lineLength / 2;
  let rightY = ballY - sin(lineAngle) * lineLength / 2;

  // Ball position on the tilted line
  let ballYPosition =
    ballY - tan(lineAngle) * (ballX - width / 2);

  // Title
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(22);
  text("FRIEND'S PHONE5", width / 2, 55);

  textSize(15);
  fill(180);
  text("Keep the ball balanced!", width / 2, 90);

  // Draw balance line FIRST
  stroke(220);
  strokeWeight(3);
  line(leftX, leftY, rightX, rightY);

  // Draw triangle support underneath the line
  noStroke();
  fill(120, 140, 160);

  triangle(
    width / 2 - 22, ballY + 48,
    width / 2 + 22, ballY + 48,
    width / 2, ballY
  );

  // Calculate distance from the centre
  let distanceFromCenter = abs(ballX - width / 2);
  
  // Calculate the colour based on the distance
  let redCol = map(distanceFromCenter, 0, width / 2, 80, 255);
  let greenCol = map(distanceFromCenter, 0, width / 2, 220, 0);
  let blueCol = map(distanceFromCenter, 0, width / 2, 130, 0);
  
  // Keep colours within valid RGB values
  redCol = constrain(redCol, 0, 255);
  greenCol = constrain(greenCol, 0, 255);
  blueCol = constrain(blueCol, 0, 255);
  
  // Draw ball
  fill(redCol, greenCol, blueCol);
  circle(ballX, ballYPosition - ballRadius, ballRadius * 2);

  // Left and right labels
  fill(180);
  textSize(13);
  text("LEFT", 45, ballY + 40);
  text("RIGHT", width - 45, ballY + 40);

  // Recording status
  fill(255);
  textSize(14);

  if (isListening) {
    text("LISTENING...", width / 2, height - 175);
  } else {
    text("Send your friend a voice message",
         width / 2, height - 175);
  }

  // Display recognised message
  textSize(12);
  fill(200);
  text(messageText, width / 2, height - 155,
       width - 40, 40);
}

// Start or stop recording
function toggleRecording() {
  if (!isListening) {
    transcript = "";
    messageText = "";
    isListening = true;

    speechRec.start();
    recordButton.html("STOP RECORDING");

  } else {
    isListening = false;
    speechRec.stop();
    recordButton.html("RECORD MESSAGE");
  }
}

// Receive recognised speech
function gotSpeech() {
  if (speechRec.resultValue) {
    transcript += speechRec.resultString + " ";
    messageText = transcript;
  }
}

// Called when speech recognition ends
function speechEnded() {
  isListening = false;
  recordButton.html("RECORD MESSAGE");

  if (transcript.trim() !== "") {
    speech.speak(transcript);
  }
}

// Resize screen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballY = height / 2;

  startButton.position(width / 2 - 85, height - 130);
  recordButton.position(width / 2 - 85, height - 75);
}
