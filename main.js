status = "";
objects = [];
found = "";

function preload() {
  alarm = loadSound("alarm.mp3");
}

function setup() {
  canvas = createCanvas(420, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(420, 380);
  video.hide();

  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status: Object detecting";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = true;
  objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    objects = results;
  }
}

function draw() {
  image(video, 0, 0, 640, 420);

  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResults);
    document.getElementById("baby").innerHTML = "Baby not found";
    alarm.play();

    for (var i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status: Object Detected";
      percent = floor(objects[i].confidence * 100);

      noStroke();
      fill(r, g, b);
      text(
        `${objects[i].label} ${percent}%`,
        objects[i].x + 15,
        objects[i].y + 15
      );
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if (objects[i].label === "person") {
        document.getElementById("baby").innerHTML = "Baby found";
        alarm.stop();
      }
    }
  }
}
