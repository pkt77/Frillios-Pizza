var frillo = new Image();
frillo.src = "game/frillo.png";
var counter = new Image();
counter.src = "game/counter.png";
var door = new Image();
door.src = "game/door.png";
var door_open = new Image();
door_open.src = "game/door_open.png";
var exit = new Image();
exit.src = "game/exit.png";
var c1 = new Image();
c1.src = "game/c1.png";
var c1_leaving = new Image();
c1_leaving.src = "game/c1_leaving.png";
var ing = new Image();
ing.src = "game/ing.png";
var oven = new Image();
oven.src = "game/oven.png";
var oven_on = new Image();
oven_on.src = "game/oven_on.png";
var table = new Image();
table.src = "game/table.png";
var pepperoni = new Image();
pepperoni.src = "game/pepperoni.png";
var olive = new Image();
olive.src = "game/olive.png";
var pepper = new Image();
pepper.src = "game/pepper.png";
var bannana = new Image();
bannana.src = "game/bannana.png";
var jalapeno = new Image();
jalapeno.src = "game/jalapeno.png";
var sausage = new Image();
sausage.src = "game/sausage.png";
var mushroom = new Image();
mushroom.src = "game/mushroom.png";
var pineapple = new Image();
pineapple.src = "game/pineapple.png";
var thought = new Image();
thought.src = "game/thought.png";
var p = new Image();
p.src = "images/builder/pizza.png";

pizza.controller('GameController', function($scope, $window, $document) {
	var can = document.getElementById('game');
	var ctx = can.getContext("2d");
	var width = can.width;
	var height = can.height;

	var mouseX, mouseY;
	var view = "front";
	var customers = [];
	var ovens = [{
		x : 150,
		y : 10,
		stage : 0, //0 = off, 1 = on, 2 = done
		pizza : {}
	}, {
		x : 360,
		y : 10,
		stage : 0,
		pizza : {}
	}, {
		x : 570,
		y : 10,
		stage : 0,
		pizza : {}
	}, {
		x : 780,
		y : 10,
		stage : 0,
		pizza : {}
	}];
	var selected = "null";
	var ingreds = [];
	var lines = [false, false, false, false, false, false, false];
	//true == in use
	var wants = ["pepperoni", "olive", "pepper", "bannana", "jalapeno", "sausage", "mushroom", "pineapple"];
	var holdingPizza = [];
	var ob = 0;
	var money = 0.00;

	can.addEventListener('mousemove', function(e) {
		var rect = can.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
		//console.log(mouseX + "\t" + mouseY);
	}, false);

	can.addEventListener('click', function(e) {
		if (view == "front") {
			if (mouseX >= width / 2 && mouseX <= (width / 2 ) + door.width && mouseY >= 0 && mouseY <= door.height) {
				view = "kitchen";
			}
			for (var c = 0; c < customers.length; c++) {
				if (mouseX > customers[c].x && mouseY > customers[c].y && mouseX < customers[c].x + c1.width && mouseY < customers[c].y + c1.height) {
					if (selected == "p") {
						var wantAmount = 0;
						for (var i = 0; i < holdingPizza.length; i++) {
							if (holdingPizza[i].type == customers[c].want) {
								wantAmount++;
							}
						}
						var given = 3.99;
						if (wantAmount < 5)
							given -= 2;
						else if (wantAmount < 10)
							given--;
						given += wantAmount * 0.05;
						money += given;
						selected = "null";
						holdingPizza = [];
						playSound("purchase.wav");
						customers[c].leaving = true;
					}
				}
			}
		} else if (view == "kitchen") {
			if (mouseX >= 940 && mouseY >= 510 && mouseX <= 1015 && mouseY <= 563) {
				view = "front";
				return;
			}
			if (mouseX >= 205 && mouseY >= 266 && mouseX <= 463 && mouseY <= 508) {
				placeIngredient();
				return;
			}
			for (var o = 0; o < ovens.length; o++) {
				if (mouseX >= ovens[o].x && mouseY >= ovens[o].y && mouseX <= ovens[o].x + oven.width && mouseY <= ovens[o].y + oven.height) {
					if (ovens[o].stage == 0) {
						ovens[o].pizza = ingreds;
						ovens[o].stage = 1;
						ingreds = [];
						cook(o);
						function cook(oven) {
							var o = oven;
							setTimeout(function() {
								holdingPizza = ovens[o].pizza;
								ovens[o].stage = 2;
								playSound("ding.wav");
							}, 30000);
						}

					} else if (ovens[o].stage == 2) {
						selected = "p";
						ovens[o].stage = 0;
					}
					return;
				}
			}

			if (mouseX >= 16 && mouseY >= 19 && mouseX <= 85 && mouseY <= 85) {
				selected = (selected == "pepperoni") ? "null" : "pepperoni";
			} else if (mouseX >= 25 && mouseY >= 105 && mouseX <= 75 && mouseY <= 152) {
				selected = (selected == "olive") ? "null" : "olive";
			} else if (mouseX >= 32 && mouseY >= 174 && mouseX <= 70 && mouseY <= 239) {
				selected = (selected == "pepper") ? "null" : "pepper";
			} else if (mouseX >= 23 && mouseY >= 253 && mouseX <= 75 && mouseY <= 304) {
				selected = (selected == "bannana") ? "null" : "bannana";
			} else if (mouseX >= 32 && mouseY >= 318 && mouseX <= 75 && mouseY <= 375) {
				selected = (selected == "jalapeno") ? "null" : "jalapeno";
			} else if (mouseX >= 34 && mouseY >= 398 && mouseX <= 70 && mouseY <= 435) {
				selected = (selected == "sausage") ? "null" : "sausage";
			} else if (mouseX >= 27 && mouseY >= 457 && mouseX <= 75 && mouseY <= 505) {
				selected = (selected == "mushroom") ? "null" : "mushroom";
			} else if (mouseX >= 30 && mouseY >= 514 && mouseX <= 75 && mouseY <= 560) {
				selected = (selected == "pineapple") ? "null" : "pineapple";
			}
		}
	});

	var nextCustomer = 200;

	function update() {
		can.style.cursor = "";
		if (view == "front") {
			ctx.clearRect(0, 0, width, height);
			if (mouseX >= width / 2 && mouseX <= (width / 2 ) + door.width && mouseY >= 0 && mouseY <= door.height) {
				ctx.drawImage(door_open, width / 2, 0);
				can.style.cursor = "pointer";
			} else
				ctx.drawImage(door, width / 2, 0);

			ctx.drawImage(frillo, 200, 10);
			ctx.drawImage(counter, 0, 150);

			nextCustomer--;
			if (nextCustomer <= 0) {
				if (Math.round(Math.random() * 30) == 1) {
					nextCustomer = 200;
					createCustomer();
				}
			}

			for (var c = 0; c < customers.length; c++) {
				if (customers[c].leaving) {
					customers[c].y++;
					ctx.drawImage(c1_leaving, customers[c].x, customers[c].y);
					if (customers[c].y > height) {
						lines[customers[c].line] = false;
						customers.splice(c, 1);
					}
				} else {
					if (customers[c].y > 100)
						customers[c].y--;
					else {
						ctx.drawImage(thought, customers[c].x + c1.width, thought.height - customers[c].y);
						ctx.drawImage(window[customers[c].want], customers[c].x + c1.width + 20, (thought.height - customers[c].y) + 20);
					}
					ctx.drawImage(c1, customers[c].x, customers[c].y);

				}
			}
			if (selected == "p")
				ctx.drawImage(p, mouseX - (75 / 2), mouseY - (75 / 2), 75, 75);
		} else if (view == "kitchen") {
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(ing, 5, 0);
			for (var o = 0; o < 4; o++) {
				if (ovens[o].stage == 1)
					ctx.drawImage(oven_on, ovens[o].x, ovens[o].y);
				else
					ctx.drawImage(oven, ovens[o].x, ovens[o].y);
			}
			ctx.drawImage(table, 150, 220);

			for (var i = 0; i < ingreds.length; i++)
				ctx.drawImage(window[ingreds[i].type], ingreds[i].x, ingreds[i].y);

			ctx.drawImage(exit, 940, 510);

			if (selected != "null") {
				if (selected == "p")
					ctx.drawImage(p, mouseX - (75 / 2), mouseY - (75 / 2), 75, 75);
				else
					ctx.drawImage(window[selected], mouseX - (window[selected].width / 2), mouseY - (window[selected].height / 2));
			}
		}
		ctx.font = "30px Arial";
		ctx.fillStyle = "#85BB65";
		ctx.fillText("$" + money, 700, 550);
		requestAnimationFrame(update);
	}

	function createCustomer() {
		var n = Math.floor(Math.random() * lines.length);
		if (!lines[n]) {
			customers[customers.length] = {
				line : n,
				x : n * (20 + c1.width),
				y : height,
				want : wants[Math.floor(Math.random() * wants.length)],
				leaving : false
			};
			lines[n] = true;
		}
	}

	function placeIngredient() {
		ingreds[ingreds.length] = {
			type : selected,
			x : mouseX - (window[selected].width / 2),
			y : mouseY - (window[selected].height / 2)
		};
	}

	var sounds = 0;
	function playSound(location, loop) {
		var audio = document.createElement('audio');
		audio.id = "sound" + sounds;
		audio.autoplay = "autoplay";
		if (loop)
			audio.loop = "loop";
		audio.addEventListener('ended', function() {
			document.getElementById(audio.id).remove();
		});
		var src = document.createElement('source');
		src.src = "game/" + location;
		audio.appendChild(src);
		document.body.appendChild(audio);
		sounds++;
	}

	playSound("Carefree.mp3", true);

	$scope.$on('$locationChangeStart', function(event) {
		document.getElementById("sound0").remove();
	});

	requestAnimationFrame(update);
});
