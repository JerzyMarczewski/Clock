// UI
let tokyoColor = "#F92A82"; // pink
let newYorkColor = "#FF8C42"; // orange
let londonColor = "#7CEA9C"; // lightgreen
let warsawColor = "#FCFC62"; // yellow
let currentColor = "#FCFC62";

function changeLocation(city){
    let btn = document.getElementById("dropID");
    switch(city){
        case "tokyo":
            btn.innerHTML = "Tokyo";
            btn.style.backgroundColor = tokyoColor;
            document.getElementById("time").style.color = tokyoColor;
            document.getElementById("myDropdown").style.border = "1px solid " + tokyoColor;
            ctx.strokeStyle = tokyoColor;
            ctx.fillStyle = tokyoColor;
            currentColor = tokyoColor;
            currentCity = "tokyo";
            break;

        case "newYork":
            btn.innerHTML = "New York";
            btn.style.backgroundColor = newYorkColor;
            document.getElementById("time").style.color = newYorkColor;
            document.getElementById("myDropdown").style.border = "1px solid " + newYorkColor;
            ctx.strokeStyle = newYorkColor;
            ctx.fillStyle = newYorkColor;
            currentColor = newYorkColor;
            currentCity = "newYork";
            break;

        case "london":
            btn.innerHTML = "London";
            btn.style.backgroundColor = londonColor;
            document.getElementById("time").style.color = londonColor;
            document.getElementById("myDropdown").style.border = "1px solid " + londonColor;
            ctx.strokeStyle = londonColor;
            ctx.fillStyle = londonColor;
            currentColor = londonColor;
            currentCity = "london";
            break;

        case "warsaw":
            btn.innerHTML = "Warsaw";
            btn.style.backgroundColor = warsawColor;
            document.getElementById("time").style.color = warsawColor;
            document.getElementById("myDropdown").style.border = "1px solid " + warsawColor;
            ctx.strokeStyle = warsawColor;
            ctx.fillStyle = warsawColor;
            currentColor = warsawColor;
            currentCity = "warsaw";
            break;
    }
    document.getElementById("time").style.textShadow = "0 0 5px " + currentColor;
}

// dropdown
let isActive = false;


function glow(){
    if(!isActive){
        document.getElementById("dropID").style.boxShadow = "0 0 20px " + currentColor;
    }
}

function stopGlow(){document.getElementById("dropID").style.boxShadow = "none";}

function manipulateDropdown(){
    if(!isActive){
        document.getElementById("myDropdown").style.display = "block";
        isActive = true;
    }else{
        document.getElementById("myDropdown").style.display = "none";
        isActive = false;
    }
}
// Clock
let currentCity = "warsaw";
let ctx = document.getElementById("canvas").getContext("2d");
let middle = {x: 125, y: 125};
let r = 125;

ctx.translate(r, r);
r = r * 0.9;
ctx.strokeStyle = "#FCFC62";
ctx.fillStyle = "#FCFC62";

function drawNumbers(ctx, r){
    let angle, number;
    ctx.font = r * 1 + "px";
    ctx.fontWeight = "bold";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(number = 1; number <= 12; number++){
        angle = number * Math.PI / 6;
        ctx.rotate(angle);
        ctx.translate(0, -r * 0.85);
        ctx.rotate(-angle);
        ctx.fillText(number.toString(), 0, 0);
        ctx.rotate(angle);
        ctx.translate(0, r * 0.85);
        ctx.rotate(-angle); 
    }
}

function drawCircle(){
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0 * Math.PI, 2 * Math.PI);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.05, 0 * Math.PI, 2 * Math.PI);
    ctx.fill();

}

function drawHand(ctx, position, lenght, width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(position);
    ctx.lineTo(0, -lenght);
    ctx.stroke();
    ctx.rotate(-position);
}
function drawTime(ctx, radius){
    var now = new Date();

    switch(currentCity){
        case "tokyo":
            now.setHours(now.getHours() + 7);
            break;

        case "newYork":
            now.setHours(now.getHours() - 6);
            break;

        case "london":
            now.setHours(now.getHours() - 1);
            break;

        case "warsaw":
            break;
    }
  

    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    document.getElementById("time").innerHTML = now.toTimeString().substring(0, 8);

    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
  }

// Main
function clock(){
    ctx.translate(-r, -r);
    ctx.clearRect(0, 0, 250, 250);
    ctx.translate(r, r);
    drawCircle();
    drawNumbers(ctx, r);
    drawTime(ctx, r);
}

setInterval(clock, 1000/15);
