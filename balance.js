let ballX; // The ball's current horizontal position (left or right)
let targetX; // Where the ball is supposed to move
let ballY; // The ball's vertical position (up or down) 
let ballRadius = 22; // The size of the ball. The radius is 22 pixels.

// Set up the balance system
// width / 2 means the middle of the screen. The ball starts in the centre.
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

    targetX = map(gamma, -30, 30, 40, width - 40); // -30 to 30 to make the ball more
                                                   // sensitive to smaller phone movements.
    targetX = constrain(targetX, 40, width - 40);
  }

  ballX = lerp(ballX, targetX, 0.08); // smooth movement 
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

// Calculate how much the computer should shake
function calculateShake() {

  // Measure how far the ball is from the centre
  let distanceFromCenter = abs(ballX - width / 2);

  // Convert the distance into a value between 0 and 1
  let imbalance = distanceFromCenter / (width / 2 - 40);
  imbalance = constrain(imbalance, 0, 1);

  // Convert imbalance into a shake value between 0 and 10
  let shakeValue = imbalance * 10;

  return shakeValue;
}
