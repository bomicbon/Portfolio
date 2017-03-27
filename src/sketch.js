var system;
var canvas;
function setup() {
	canvas = createCanvas(windowWidth, windowHeight / 2);
	canvas.parent('sketch-holder');
	system = new ParticleSystem(createVector(width/2, 50));
	for (i=0; i<20; i++) {
		system.addParticle();
	}
}

function draw() {
	background("#fff");
	//system.addParticle();
	system.run();
}

// A simple Particle class
var Particle = function(position) {
	var xacc = random(-0.05, 0.05);
	var yacc = random(-0.05, 0.05);
	this.acceleration = createVector(xacc, yacc);
	this.velocity = createVector(random(-1, 1), random(-1, 0));
	this.position = position.copy();
	this.lifespan = 255.0;
};

Particle.prototype.run = function() {
	this.update();
	this.display();
};

// Method to update position
Particle.prototype.update = function(){
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	if (this.position.x < 0 || this.position.x > windowWidth) {
		this.acceleration.x *= -1;
		this.acceleration.y *= -1;
		this.velocity.x *= -1;
		this.velocity.y *= -1;
	}
	if (this.position.y < 0 || this.position.y > windowHeight /2) {
		this.acceleration.x *= -1;
		this.acceleration.y *= -1;
		this.velocity.x *= -1;
		this.velocity.y *= -1;
	}
	//this.lifespan -= 2;
}

// Method to display
Particle.prototype.display = function() {
	stroke(200, this.lifespan);
	strokeWeight(2);
	fill(127, this.lifespan);
	ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function() {
	if (this.lifespan < 0) {
		return true;
	} else {
		return false;
	}
};

var ParticleSystem = function(position) {
	this.origin = position.copy();
	this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
	this.particles.push(new Particle(this.origin));
};

// checks for death
ParticleSystem.prototype.run = function() {
	for (var i = this.particles.length-1; i >= 0; i--) {
		var p = this.particles[i];
		p.run();
		if (p.isDead()) {
			this.particles.splice(i, 1);
		}
	}
};

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y);
	background("#fff");
}

function windowResized() {
	centerCanvas();
}
