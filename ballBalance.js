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

  // Calculate how much the line should tilt
  // let lineAngle = map(ballX, width / 2 - width / 2, width / 2 + width / 2, -0.25, 0.25);
  let lineAngle = map(ballX, 0, width, 0.25, -0.25);

  // Calculate the line's endpoints
  let lineLength = width - 60;

  let leftX = width / 2 - cos(lineAngle) * lineLength / 2;
  let leftY = ballY + sin(lineAngle) * lineLength / 2;

  let rightX = width / 2 + cos(lineAngle) * lineLength / 2;
  let rightY = ballY - sin(lineAngle) * lineLength / 2;

  // Calculate the ball's vertical position on the line
  let ballYPosition = ballY - tan(lineAngle) * (ballX - width / 2);

  // Title
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(22);
  text("FRIEND'S PHONE2", width / 2, 55);

  // Instruction
  textSize(15);
  fill(180);
  text("Keep the ball balanced!", width / 2, 90);

  // Balance line
  stroke(220);
  strokeWeight(3);
  line(leftX, leftY, rightX, rightY);

  // Ball
  noStroke();
  fill(80, 220, 130);
  circle(ballX, ballYPosition - ballRadius, ballRadius * 2);

  // Left and right labels
  fill(180);
  textSize(13);
  text("LEFT", 45, ballY + 40);
  text("RIGHT", width - 45, ballY + 40);
}
