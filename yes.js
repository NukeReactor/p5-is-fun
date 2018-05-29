var x, y;
var dx, dy;
var rad;

var fire = [];
var enemy = [];

var enemyPos;

function setup() {
	createCanvas(600, 600);

	x = width / 10;
	y = height / 2;
	rad = 20;

	dx = 0;
	dy = 0;

	enemyPos = createVector(width, random(0, height))

	enemy.push(new Enemy(enemyPos.x, enemyPos.y));
}

function draw() {
	background(51);

	noStroke();
	fill(255);
	rect(x, y, rad, rad);

  y += dy;
  y = constrain(y, 0, height - rad);
  if(y <= 0 || y >= height - rad) {
  	dy = 0;
  }

  for(let i = fire.length - 1; i > 0; i--) {
  	fire[i].draw();
  	fire[i].move();
  	//fire[i].check();

  	if(fire[i].offscreen()) {
  		fire.splice(i, 1);
  	}
  }

  for(let i = enemy.length - 1; i > 0; i--) {
  	enemy[i].draw();
  	enemy[i].move();

  	if(enemy[i].offscreen()) {
  		enemy.splice(i, 1);
  	}
  }

  if(frameCount % 60 === 0) {
  	enemy.push(new Enemy(width, random(0, height)));
  }
}

function Projectile(x, y) {
	this.x = x;
	this.y = y;
	
	this.draw = function() {
		noStroke();
		fill(50, 150, 255);
		ellipse(this.x, this.y, 10, 10);
	}

	this.move = function() {
		this.x += 10;
	}

	/*this.check = function() {
		var d = dist(this.x, this.y, enemyPos.x, enemyPos.y);
		console.log(d);
		if(d <= 20) {
			console.log("hit");
		}
	}
*/
	this.offscreen = function() {
		if(this.x > width) {
			return true;
		} else {
			return false;
		}
	}
}

function Enemy(x, y) {
	this.x = x;
	this.y = y;

	this.draw = function() {
		noStroke();
		fill(255, 0, 0);
		rect(this.x, this.y, 20, 20);
	}

	this.move = function() {
		this.x -= 2;
	}

	this.offscreen = function() {
		if(this.x < 0) {
			return true;
		} else {
			return false;
		}
	}
}

function keyPressed() {
	if(keyCode === UP_ARROW) {
		if(dy >= -2) {
			dy -= 2;
		}
	} else if(keyCode === DOWN_ARROW) {
		if(dy <= 2) {
			dy += 2;
		}
	}

	if(keyCode === 90) {
		var proj = new Projectile(x, y);
		fire.push(proj);
	}
}
