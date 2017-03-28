var system;
var canvas;
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('sketch-holder');
	system = new ParticleSystem(createVector(width/2, 100));
	for (i=0; i<500; i++) {
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
	var yacc = random(0, 0.05);
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
		this.reverse();
	}
	else if (this.position.y < 0 || this.position.y > windowHeight) {
		this.reverse();
	}
	//this.lifespan -= 2;
};

Particle.prototype.reverse = function() {
	var drag = -1;
	//this.acceleration.x *= drag;
	//this.acceleration.y *= drag;
	this.velocity.x *= drag;
	this.velocity.y *= drag;
};

// Method to display
Particle.prototype.display = function() {
	stroke(200, this.lifespan);
	strokeWeight(2);
	fill(127, this.lifespan);
	//ellipse(this.position.x, this.position.y, 12, 12);
	rect(this.position.x, this.position.y, 12, 12);
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
