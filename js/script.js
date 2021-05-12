var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ants = []
const bufferLength = 20

var score = document.querySelector("#score");
const TotalAnts = 30;
var antSmashed = 0;

function Ant(xpos, ypos, radius, xvel, yvel, img) {
    var self = this;
    self.xpos = xpos;
    self.ypos = ypos;
    self.radius = radius;
    self.xvel = xvel;
    self.yvel = yvel;


    self.display = function() {
        ctx.drawImage(img, self.xpos, self.ypos, self.radius + bufferLength, self.radius + bufferLength);
    };


    self.move = function() {

        if (self.xpos < 0 || self.xpos + self.radius + bufferLength > canvasWidth) {
            self.xvel = self.xvel * -1;

        }

        if (self.ypos < 0 || self.ypos + self.radius + bufferLength > canvasHeight) {
            self.yvel = self.yvel * -1;

        }

        self.xpos += self.xvel;
        self.ypos += self.yvel;
    }


    self.checkCollisionOtherAnt = function(objs) {
        objs.forEach(function(obj) {
            dx = self.xpos - obj.xpos
            dy = self.ypos - obj.ypos
            var distanceCenters = Math.sqrt(dx * dx + dy * dy)
            var sumRadius = self.radius + obj.radius;
            if (sumRadius > distanceCenters) {
                self.xvel = self.xvel * -1;
                self.yvel = self.yvel * -1;
            }


        });

    }

}

// initialize ants

for (let i = 0; i <= TotalAnts; i++) {
    var xpos = getRandomInt(30, canvasWidth - 50);
    var ypos = getRandomInt(30, canvasHeight - 50);
    var radius = getRandomInt(20, 25);


    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var xvel = plusOrMinus * getRandomInt(1, 2);
    var yvel = plusOrMinus * getRandomInt(1, 3);

    var images = document.querySelectorAll('.antImage');
    img = images[getRandomInt(0, images.length)]

    ant = new Ant(xpos, ypos, radius, xvel, yvel, img);
    ants.push(ant)
}

function removeAnt(ant, antLst) {
    nb = Array.from(antLst);
    var index = antLst.indexOf(ant);
    nb.splice(index, 1);
    return nb;
}

canvas.addEventListener('click', (event) => {

    // var x = event.clientX;
    // var y = event.clientY;

    var x = getMousePos(canvas, event).x;
    var y = getMousePos(canvas, event).y;

    for (let i = 0; i < ants.length; i++) {
        var ant = ants[i];
        if (x >= ant.xpos &&
            x <= ant.xpos + (ant.radius + bufferLength) &&
            y >= ant.ypos &&
            y <= ant.ypos + ((ant.radius + bufferLength) * 1.2)
        ) {
            ants.splice(i, 1);
            antSmashed++;
            score.innerHTML = antSmashed;
        }
    }

});

function animate() {
    ctx.clearRect(0, 0, 1500, 700);

    ants.forEach(function(ant) {
        ant.move();
        ant.checkCollisionOtherAnt(removeAnt(ant, ants))
        ant.display();
    });

    requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);