// Voice recording variables
let speechRec;
let speech;
let isListening = false;
let transcript = "";

let recordButton;
let messageText = "";

// Set up voice recording
function setupVoice() {

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

// Draw voice-related information on screen
function drawVoice() {

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

    console.log("Complete message:", transcript);

    speechRec.stop();
    recordButton.html("RECORD MESSAGE");
  }
}

// Receive recognised speech
function gotSpeech() {

  if (speechRec.resultValue) {
    transcript += speechRec.resultString + " ";
    messageText = transcript;

    console.log("Friend's message:", speechRec.resultString);
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

// Reposition voice button when screen resizes
function resizeVoice() {
  recordButton.position(width / 2 - 85, height - 75);
}
