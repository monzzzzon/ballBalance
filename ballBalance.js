let ballX;
let targetX;
let ballY;
let ballRadius = 22;
let startButton;

function setup() {
  createCanvas(windowWidth, windowHeight);

  ballX = width / 2;
  targetX = width / 2;
  ballY = height / 2;
  
  startButton = createButton("ENABLE PHONE TILT");

  startButton.position(width / 2 - 85, height - 80);

  startButton.mousePressed(function() {
  setupOrientation(2);
  startButton.html("SENSOR ACTIVATION REQUESTED");
  });
}

function draw() {
  background(20, 29, 42);

  // Read the phone's orientation
  if (orientationSensor.hasNewValue) {
    let gyro = orientationSensor.get();
    let gamma = gyro.gamma;

    // Convert phone tilt into a horizontal position
    targetX = map(gamma, -30, 30, 40, width - 40);
    targetX = constrain(targetX, 40, width - 40);
  }

  // Smooth ball movement
  ballX = lerp(ballX, targetX, 0.08);

  // Title
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(22);
  text("FRIEND'S PHONE", width / 2, 55);

  // Instruction
  textSize(15);
  fill(180);
  text("Keep the ball balanced!", width / 2, 90);

  // Balance line
  stroke(220);
  strokeWeight(3);
  line(30, ballY, width - 30, ballY);

  // Ball
  noStroke();
  fill(80, 220, 130);
  circle(ballX, ballY - ballRadius, ballRadius * 2);

  // Left and right labels
  fill(180);
  textSize(13);
  text("LEFT", 45, ballY + 40);
  text("RIGHT", width - 45, ballY + 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballY = height / 2;
}
