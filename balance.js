let ballX;
let targetX;
let ballY;
let ballRadius = 22;

// Set up the balance system
function setupBalance() {
  ballX = width / 2;
  targetX = width / 2;
  ballY = height / 2;
}

// Read phone tilt and update ball position
function updateBalance() {
  if (orientationSensor.hasNewValue) {
    let gyro = orientationSensor.get();
    let gamma = gyro.gamma;

    targetX = map(gamma, -30, 30, 40, width - 40);
    targetX = constrain(targetX, 40, width - 40);
  }

  ballX = lerp(ballX, targetX, 0.08);
}

// Calculate the balance line and ball position
function calculateBalance() {
  let lineAngle = map(ballX, 0, width, 0.25, -0.25);
  let lineLength = width - 60;

  let leftX = width / 2 - cos(lineAngle) * lineLength / 2;
  let leftY = ballY + sin(lineAngle) * lineLength / 2;

  let rightX = width / 2 + cos(lineAngle) * lineLength / 2;
  let rightY = ballY - sin(lineAngle) * lineLength / 2;

  let ballYPosition =
    ballY - tan(lineAngle) * (ballX - width / 2);

  return {
    leftX,
    leftY,
    rightX,
    rightY,
    ballYPosition
  };
}

// Update balance when screen resizes
function resizeBalance() {
  ballY = height / 2;
}
