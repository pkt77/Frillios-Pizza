pizza.controller('CheckoutController', function($rootScope, $scope, localStorageService, $location) {
	if (!localStorageService.get("orders"))
		localStorageService.add("orders", []);

	$rootScope.orders = localStorageService.get("orders");

	$scope.total = 0;
	for (var i = 0; i < $rootScope.orders.length; i++)
		$scope.total += $rootScope.orders[i].price;

	$scope.order = function() {
		$rootScope.orders = [];
		localStorageService.add("orders", []);
		$location.path('/');
	};
});