pizza.controller('HomeController', function($scope) {
	var slides = [{
		src : "oven.jpg",
		desc : "Pizzas cooked on a brick oven!",
		link : "#/"
	}, {
		src : "menu.jpg",
		desc : "Look at our menu!",
		link : "#/menu"
	}, {
		src : "build.jpg",
		desc : "Build Your Own!",
		link : "#/build"
	}, {
		src : "game.png",
		desc : "Play our game!",
		link : "#/game"
	}];
	var current = 0;

	var timer;

	function set() {
		clearTimeout(timer);
		document.getElementById('slider').src = "images/slider/" + slides[current].src;
		document.getElementById('desc').innerHTML = slides[current].desc;
		document.getElementById('link').href = slides[current].link;
		timer = setTimeout(function() {
			$scope.next();
		}, 5000);
	}

	set();

	$scope.prev = function() {
		current--;
		if (current < 0)
			current = slides.length - 1;
		set();
	};

	$scope.next = function() {
		current++;
		if (current >= slides.length)
			current = 0;
		set();
	};

	$scope.$on('$locationChangeStart', function(event) {
		clearTimeout(timer);
	});
});
