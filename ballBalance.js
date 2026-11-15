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

  // Set up speech recognition
  speechRec = new p5.SpeechRec("en-US", gotSpeech);
  speechRec.continuous = true;
  speechRec.interimResults = false;

  // Set up text-to-speech
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

  let leftX = width / 2 - cos(lineAngle) * lineLength / 2;
  let leftY = ballY + sin(lineAngle) * lineLength / 2;

  let rightX = width / 2 + cos(lineAngle) * lineLength / 2;
  let rightY = ballY - sin(lineAngle) * lineLength / 2;

  let ballYPosition = ballY - tan(lineAngle) * (ballX - width / 2);

  // Title
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(22);
  text("FRIEND'S PHONE6", width / 2, 55);

  textSize(15);
  fill(180);
  text("Keep the ball balanced!", width / 2, 90);
  
  // Triangle support directly underneath the balance line
  noStroke();
  fill(120, 140, 160);
  
  triangle(
    width / 2 - 22, ballY + 48,
    width / 2 + 22, ballY + 48,
    width / 2, ballY
  );
  // Ball
  noStroke();
  fill(80, 220, 130);
  circle(ballX, ballYPosition - ballRadius, ballRadius * 2);

  // Labels
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
    text("Send your friend a voice message", width / 2, height - 175);
  }

  // Show recognised message
  textSize(12);
  fill(200);
  text(messageText, width / 2, height - 155, width - 40, 40);
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

// Called when speech recognition stops
function speechEnded() {
  isListening = false;
  recordButton.html("RECORD MESSAGE");

  if (transcript.trim() !== "") {
    speech.speak(transcript);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballY = height / 2;

  startButton.position(width / 2 - 85, height - 130);
  recordButton.position(width / 2 - 85, height - 75);
}
