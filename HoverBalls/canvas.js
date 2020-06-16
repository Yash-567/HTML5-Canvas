var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c  = canvas.getContext('2d')
var maxRadius = 40
//var minRadius = 2
var mouse = {
    x: undefined,
    y: undefined
}
var colorArray = [
    '#7DEFFF',
    '#72E8D6',
    '#8AFFCC',
    '#72E893',
    '#7DFF7D'
]

window.addEventListener('mousemove',function(event){
    mouse.x = event.x
    mouse.y = event.y
    console.log(mouse)
})
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init()
})

function Circle(x,y,dx,dy,radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)]

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, 2* Math.PI,false)
        c.strokeStyle = 'blue'
        c.fillStyle = this.color
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
        if(mouse.x-this.x <50 && mouse.x- this.x > -50 && mouse.y-this.y <50 && mouse.y- this.y > -50){
            if(this.radius<maxRadius){
                this.radius +=1
            }
        }else if(this.radius>this.minRadius){
            this.radius-=1
        }
        this.draw()
    }
}
var circleArray = []
function init(){
    circleArray = []
    for(var i=0;i<400;i++){
        var radius = Math.random()*3 +1
        var x = Math.random()*(innerWidth- 2*radius)+ radius
        var y = Math.random()*(innerHeight- 2*radius)+ radius
        var dx = (Math.random()-0.5)*3
        var dy = (Math.random()-0.5)*3
        circleArray.push(new Circle(x,y,dx,dy,radius))
    }
}
var circle = new Circle(200,200,8,8,30)

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight)
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update()
    }
}
init()
animate()
