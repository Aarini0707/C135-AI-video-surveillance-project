video = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {
        object_detector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected: " + objects.length;

            fill("#03fc24");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke("#03fc24");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Staus: Detecting Objects";
}

function pause() {
    video.pause();
}

function stop() {
    video.stop();
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}