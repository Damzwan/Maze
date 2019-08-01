var blockAmount = 20;
var timeSpan = 0.5; 
var canvas;
var ctx;
var blockSize;
var grid;
var snakeLoc = [];
var direction = "right";
let interval;

function start(){
    interval = window.setInterval(function(){
        move()
    }, timeSpan*1000);
}

$(document).ready(function() {
    canvas = document.getElementById("grid")
    ctx = canvas.getContext("2d")
    createGrid(blockAmount);
    addSnake()
    addFruit()
});

function addFruit(){
    var spawnLoc = [getRandomInt(1, blockAmount-2), getRandomInt(1, blockAmount-2)]
    grid[spawnLoc[1]][spawnLoc[0]] = "fruit"
    ctx.fillStyle = "#d6000e"
    ctx.fillRect(spawnLoc[0]*blockSize, spawnLoc[1]*blockSize, blockSize, blockSize)
}

function addSnake(){
    var spawnLoc = [getRandomInt(1, blockAmount-2), getRandomInt(1, blockAmount-2)]
    grid[spawnLoc[1]][spawnLoc[0]] = "snake"
    snakeLoc.push(spawnLoc)
    ctx.fillStyle = "#0c15c2"
    ctx.fillRect(spawnLoc[0]*blockSize, spawnLoc[1]*blockSize, blockSize, blockSize)
}

function move(){
    var multiplier;

    if(direction == "left") {
        multiplier = [-1, 0]
    }
    else if(direction == "up") {
        multiplier = [0, -1]
    }
    else if(direction == "down") {
        multiplier = [0, 1]
    }
    else if(direction == "right") {
        multiplier = [1, 0]
    }

    newLoc = [ snakeLoc[snakeLoc.length - 1][0] + multiplier[0],  snakeLoc[snakeLoc.length - 1][1] + multiplier[1]]
    
    if (grid[newLoc[1]][newLoc[0]] == "fruit"){
        addBodyPart(newLoc);
        addFruit()
    }
    else if (grid[newLoc[1]][newLoc[0]] == "wall" || grid[newLoc[1]][newLoc[0]] == "snake"){
        reset()
    }
    else{
        removeOldestBodyPart();
        addBodyPart(newLoc)
    }
}

function removeOldestBodyPart() {
    oldLoc = snakeLoc.shift();
    grid[oldLoc[1]][oldLoc[0]] = "empty";
    ctx.fillStyle = "#ffe4c4";
    ctx.fillRect(oldLoc[0] * blockSize, oldLoc[1] * blockSize, blockSize, blockSize);
}

function addBodyPart(loc) {
    snakeLoc.push(loc);
    grid[loc[1]][loc[0]] = "snake";
    ctx.fillStyle = "#0c15c2";
    ctx.fillRect(loc[0] * blockSize, loc[1] * blockSize, blockSize, blockSize);
}

function createGrid(blockAmount) {
    blockSize = canvas.height / blockAmount;
    grid = new Array()

    for (let rows = 0; rows < blockAmount; rows++) {
        grid[rows] = new Array()
    }

    for (let i = 0; i < blockAmount; i++) {
        for (let j = 0; j < blockAmount; j++) {
            if (i == 0 || j == 0 || i == blockAmount-1 || j == blockAmount - 1) {grid[i][j] = "wall"}
            else{grid[i][j] = "empty"}
        }
    }

    ctx.fillStyle = "#ffe4c4"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = "#4a4a49";
    ctx.fillRect(0, 0, canvas.width, blockSize)
    ctx.fillRect(0, canvas.height - blockSize, canvas.width, blockSize)
    ctx.fillRect(0, 0, blockSize, canvas.height)
    ctx.fillRect(canvas.width - blockSize, 0, blockSize, canvas.height)
    ctx.stroke();
};

function reset(){
    window.clearInterval(interval) 
    createGrid(blockAmount);
    snakeLoc = []
    addSnake()
    addFruit()
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        if (direction != "right") direction = "left"
    }
    else if(event.keyCode == 38) {
        if (direction != "down") direction = "up"
    }
    else if(event.keyCode == 39) {
        if (direction != "left") direction = "right"
    }
    else if(event.keyCode == 40) {
        if (direction != "up") direction = "down"
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}