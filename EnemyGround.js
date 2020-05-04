/*
    TO DO: Enemies gets faster over time, speed will be calculated based on elapse time passed to the constructor
    ****Needs to refactor code into more organized files before continuing to write more "complex" stuff
    ****ESPECIALLY the collisionDetection function, lots of dirty code
*/
class Enemy {
    constructor() {
        this.startX = canvas.width - 150
        this.startY = canvas.height - 71
        this.width = 30
        this.height = 20
        this.dx = 7
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.startX, this.startY, this.width, this.height)
        ctx.fillStyle = "green"
        ctx.fill()
        ctx.closePath()
    }

    move() {
        this.startX -= this.dx
        //hello
    } 

    collisionDetection(drawId) {    
        if(this.startX < player.x + player.width &&
            this.startX + this.width > player.x &&
            this.startY < player.y + player.width &&
            this.startY + this.height > player.y) {
                lose = true //this  just feels super dirty => need to do some code refactoring on this
                ctx.beginPath()
                ctx.rect((canvas.width-100)/2,(canvas.height-100)/2, 100, 100)
                ctx.fillStyle = "black"
                ctx.fill()
                ctx.closePath()
                cancelAnimationFrame(drawId)
        }
    }
}