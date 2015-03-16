pizza.controller('BuildController', function($rootScope, $scope, $location, localStorageService) {
	var price = 0;
	var sizePrice = 0;

	$scope.sizeChange = function() {
		var s = document.getElementById('size');
		if (s.selectedIndex == 0)
			sizePrice = 4.99;
		else if (s.selectedIndex == 1)
			sizePrice = 7.99;
		else if (s.selectedIndex == 2)
			sizePrice = 9.99;
		setPrice(0);
	};

	$scope.add = function(id) {
		var state = document.getElementById(id).src;
		state = state.substring(state.length - 5);

		var overlay;

		if (state == "n.png") {
			setPrice(0.5);
			state = "h";
			overlay = document.createElement('img');
			overlay.id = id + "_overlay";
			overlay.src = "images/builder/" + id + "_" + state + ".png";
			document.getElementById('pizza').appendChild(overlay);
		} else if (state == "h.png") {
			setPrice(0.5);
			state = "f";
			overlay = document.getElementById(id + '_overlay');
			overlay.src = "images/builder/" + id + "_" + state + ".png";
		} else if (state == "f.png") {
			setPrice(-0.5);
			state = "o";
			overlay = document.getElementById(id + '_overlay');
			overlay.src = "images/builder/" + id + "_" + state + ".png";
		} else {
			setPrice(-0.5);
			state = "n";
			document.getElementById(id + '_overlay').remove();

		}
		document.getElementById(id).src = "images/builder/" + state + ".png";
	};

	function setPrice(p) {
		price += p;
		document.getElementById('price').innerHTML = "$" + (price + sizePrice);
	}


	$scope.addToCheckout = function() {
		$rootScope.orders[$rootScope.orders.length] = {
			name : "Custom Pizza",
			price : price + sizePrice
		};
		localStorageService.add("orders", $rootScope.orders);
		$location.path('checkout');
	};

	$scope.$on('$locationChangeStart', function(event) {
		if (!confirm("Are you sure you want to leave this page?"))
			event.preventDefault();
	});

	window.onbeforeunload = function() {
		return "Are you sure you want to leave?";
	};
});
