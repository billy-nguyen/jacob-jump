/*
    *TO DO:
    -Randomize obstacle spawning -DONE
    -Collision detection -DONE
    -Score keeping -NOT IMPORTANT AT THE MOMENT
    -Take a look into gravity simulation -DONE
*/
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

let start = false
let lose = false
const gravity = 1

const player = {
    x: 150,
    y: canvas.height - 91,
    width: 40,
    dy: 0
}

let enemies = []

let spawn, checkHit

console.log(Math.floor(Math.random()*100))


document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("click", mouseClick, false)

function keyDownHandler(event) {
    if(event.key == " " && player.y == canvas.height - 91 && start == true){    
         player.dy = -17
    }       
}

function mouseClick(event) {
    if(start == false) {
        start = true
        draw()
        spawn = setInterval(spawnEnemy, 1500)
        checkHit = setInterval(checkCollision)
    }
    if(lose == true && start == true) {
        enemies = []
        lose = false
        //eventually will be moved to a button
        clearInterval(spawn)
        clearInterval(checkHit)
        draw()
        spawn = setInterval(spawnEnemy, 1500)
        checkHit = setInterval(checkCollision)
    }
}

//fill play area
function drawPlayArea() {
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "lightgrey"
    ctx.fill()
    ctx.closePath()
    
    //ground line
    ctx.beginPath()
    ctx.moveTo(50, canvas.height - 50)
    ctx.lineTo(canvas.width - 50, canvas.height - 50)
    ctx.stroke()
    ctx.closePath()
}

//player
function drawPlayer() {
    if(player.y >= canvas.height - 91 && player.dy > 0) {
        player.dy = 0
        // player.y = canvas.height - 91
    }
    player.y += player.dy //BASICALLY A BELL CURVE I JUST FIGURED THIS OUT 
    player.dy += gravity

    ctx.beginPath()
    ctx.rect(player.x, player.y, player.width, player.width)
    ctx.fillStyle = "darkgrey"
    ctx.fill()
    ctx.closePath()
}

function drawEnemy() {
    enemies.forEach(enemy => {
        enemy.move()
        enemy.draw(ctx)
        //enemy.collisionDetection(drawId)
    })
}

function spawnEnemy() {
    //probability and distance
    let random = Math.floor(Math.random()*100) + 1
    //console.log(random)
    if(random < 60 && enemies.length == 0) {
        enemies.push(new Enemy())
    }
    else if(random < 60 && enemies.length > 0 && enemies[enemies.length - 1].startX < 800) {
        enemies.push(new Enemy())
    }
}

function checkCollision() {
    enemies.forEach(enemy => {
        enemy.collisionDetection(drawId)
    })
}

function clearEnemy() {
    if(enemies.length > 0 && enemies[0].startX < 0) {
        enemies.shift()
    }
}

let drawId
function draw() {
    //checkCollision()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayArea()
    drawPlayer()
    drawEnemy()
    clearEnemy()
    drawId = requestAnimationFrame(draw)
}

drawPlayArea()
drawPlayer()
// const spawnInterval = setInterval(spawnEnemy, 1500)
// const collisionInterval = setInterval(checkCollision)
//draw()



