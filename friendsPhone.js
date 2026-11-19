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
  updateBalance();

  let shakeValue = calculateShake();

  if (frameCount % 30 === 0) {
    console.log("Shake value:", shakeValue.toFixed(2));
  }

  let balanceData = calculateBalance();

  drawVisuals(balanceData);

  // Display the shake value on the phone screen
  push();
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(14);
  text("SHAKE: " + shakeValue.toFixed(2), width / 2, 125);
  pop();

  drawVoice();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Update positions after screen resize
  resizeBalance();
  resizeVoice();

  startButton.position(width / 2 - 85, height - 130);
}
