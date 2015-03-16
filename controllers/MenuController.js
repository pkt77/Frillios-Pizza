pizza.controller('MenuController', function($rootScope, $scope, localStorageService) {
	$scope.addToCheckout = function(n, p) {
		$rootScope.orders[$rootScope.orders.length] = {
			name : n,
			price : p
		};
		localStorageService.add("orders", $rootScope.orders);
	};
});
