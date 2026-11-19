function drawVisuals(balanceData) {
  // Background
  background(20, 29, 42);

  // Title
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(22);
  text("FRIEND'S PHONE2", width / 2, 55);

  textSize(15);
  fill(180);
  text("Keep the ball balanced!", width / 2, 90);

  // Support triangle
  noStroke();
  fill(120, 140, 160);

  triangle(
    width / 2 - 22, ballY + 48,
    width / 2 + 22, ballY + 48,
    width / 2, ballY
  );

  // Balance line
  stroke(220);
  strokeWeight(3);

  line(
    balanceData.leftX,
    balanceData.leftY,
    balanceData.rightX,
    balanceData.rightY
  );

  // Calculate distance from the centre
  let distanceFromCenter = abs(ballX - width / 2);

  // Calculate ball colour
  let redCol = map(distanceFromCenter, 0, width / 2, 80, 255);
  let greenCol = map(distanceFromCenter, 0, width / 2, 220, 0);
  let blueCol = map(distanceFromCenter, 0, width / 2, 130, 0);

  redCol = constrain(redCol, 0, 255);
  greenCol = constrain(greenCol, 0, 255);
  blueCol = constrain(blueCol, 0, 255);

  // Draw ball
  noStroke();
  fill(redCol, greenCol, blueCol);

  circle(
    ballX,
    balanceData.ballYPosition - ballRadius,
    ballRadius * 2
  );

  // Left and right labels
  fill(180);
  textSize(13);
  text("LEFT", 40, ballY + 85);
  text("RIGHT", width - 40, ballY + 85);
}
