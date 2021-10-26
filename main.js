video = "";
status = "";

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
}

function start(){
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Staus: Detecting Objects";
}

function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}