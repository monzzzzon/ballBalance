let startButton;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set up the balance mechanic
  setupBalance();

  // Set up voice recording
  setupVoice();

  // Create the phone tilt activation button
  startButton = createButton("ENABLE PHONE TILT");
  startButton.position(width / 2 - 85, height - 130);

  startButton.mousePressed(function() {
    setupOrientation(2);
    startButton.html("SENSOR ACTIVATION REQUESTED");
  });
}

function draw() {
  // Update the ball according to phone movement
  updateBalance();
  let shakeValue = calculateShake();

  if (frameCount % 30 === 0) {
  console.log("Shake value:", shakeValue.toFixed(2));
}

  // Calculate the balance line and ball position
  let balanceData = calculateBalance();

  // Draw the screen
  drawVisuals(balanceData);

  // Draw the voice recording interface
  drawVoice();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Update positions after screen resize
  resizeBalance();
  resizeVoice();

  startButton.position(width / 2 - 85, height - 130);
}
