
let startButton;
let shakeValue = 0;

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

  // Calculate the shake value
  shakeValue = calculateShake();

  // Print the shake value in the console every 30 frames
  if (frameCount % 30 === 0) {
    console.log("Shake value:", shakeValue.toFixed(2));
  }

  // Calculate the balance line and ball position
  let balanceData = calculateBalance();

  // Draw the screen
  drawVisuals(balanceData);

  // Display the shake value on the phone screen
  push();
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(14);
  text("SHAKE: " + shakeValue.toFixed(2), width / 2, 125);
  pop();

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
