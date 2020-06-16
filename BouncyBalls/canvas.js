var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c  = canvas.getContext('2d')
function Circle(x,y,dx,dy,radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, 2* Math.PI,false)
        c.strokeStyle = 'blue'
        c.stroke()
        c.fill()
    }

    this.update = function(){
        this.x += this.dx
        this.y += this.dy
        if(this.x+this.radius> innerWidth || this.x-this.radius<0){
            this.dx = -this.dx
        }
        if(this.y+this.radius>innerHeight || this.y-this.radius<0){
            this.dy = -this.dy
        }
        this.draw()
    }
}
var circleArray = []
for(var i=0;i<200;i++){
    var radius = 30
    var x = Math.random()*(innerWidth- 2*radius)+ radius
    var y = Math.random()*(innerHeight- 2*radius)+ radius
    var dx = (Math.random()-0.5)*8
    var dy = (Math.random()-0.5)*8
    circleArray.push(new Circle(x,y,dx,dy,radius))
}

var circle = new Circle(200,200,8,8,30)

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight)
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update()
    }
}
animate()