noseX="";
noseY="";
leftwristX="";
rightwristX="";
difference=0;
//we don't need Y positions of the wrists as we don't move wrists vertically.

function setup(){
    canvas = createCanvas(500,350);
    canvas.position(750,200);

    video=createCapture(VIDEO);
    video.size(500,350);
    video.position(220,200);

    posenet=ml5.poseNet(video,modelLoaded)
    posenet.on('pose',gotResults)
}

function modelLoaded(){
    console.log("model loaded successfully.")
}

//results is an array because it stores more than one value
function gotResults(results){
    if(results.length>0){
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        leftwristX=results[0].pose.leftWrist.x;
        rightwristX=results[0].pose.rightWrist.x;
        difference=floor(leftwristX-rightwristX);
    }
}

function draw(){
    background("blueviolet");
    document.getElementById("size").innerHTML=difference+"pixels";
    t_input=document.getElementById("input_text").value;
    c_input=document.getElementById("input_colour").value;

    if(t_input.length==0){
        t_input="Purple";
    }
    fill(c_input);
    textSize(difference);
    text(t_input,noseX,noseY);

}