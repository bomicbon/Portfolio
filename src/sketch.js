var system;
var canvas;
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('sketch-holder');
	system = new ParticleSystem(createVector(width/2, height/2));
	for (i=0; i<500; i++) {
		system.addParticle();
	}
}
  
function draw() {
	background(235);
	//system.addParticle();
	if (system.particles.length < 499) {
		system.addParticle();
	}
	system.run();
}

// A simple Particle class
var Particle = function(position) {
	var xacc = random(-0.03, 0.03);
	var yacc = random(0, 0.03);
	var v = 0.3;
	var nv = -0.3;
	this.acceleration = createVector(xacc, yacc);
	this.velocity = createVector(random(nv, v), random(nv, 0));
	this.position = position.copy();
	this.length = random(12, 48);
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
	var wid1 = windowWidth * 0.325;
	var wid2 = windowWidth * 0.675;
	if (this.position.x < wid1 || this.position.x > wid2) {
		this.reverse();
	}
	var ht1 = windowHeight * 0.275;
	var ht2 = windowHeight * 0.65;
	if (this.position.y < ht1 || this.position.y > ht2) {
		this.reverse();
	}
	//this.lifespan -= 2;
};

Particle.prototype.reverse = function() {
	var drag = -0.99;
	//this.acceleration.x *= drag;
	//this.acceleration.y *= drag;
	//this.velocity.x *= drag;
	//this.velocity.y *= drag;
	this.velocity.x -= this.acceleration.x * 2;
	this.velocity.y -= this.acceleration.y * 2;
};

// Method to display
Particle.prototype.display = function() {
	stroke(235, this.lifespan);
	strokeWeight(2);
	fill(255, this.lifespan);
	//ellipse(this.position.x, this.position.y, 12, 12);
	rect(this.position.x, this.position.y, this.length, this.length);
};

// Is the particle still useful?
Particle.prototype.isDead = function() {
	if (this.lifespan < 0) {
		return true;
	}
	else if (Math.abs(this.velocity.x) < 0.0001 || Math.abs(this.velocity.y) < 0.0001) {
		return true;
	}
	else if (this.position.x < 0 || this.position.x > windowWidth) {
		return true;
	}
	else if (this.position.y < 0 || this.position.y > windowHeight) {
		return true;
	}
	else {
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
	//canvas.position(x, y);
	background(235);
}

function windowResized() {
	centerCanvas();
}
