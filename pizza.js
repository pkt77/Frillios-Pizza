var pizza = angular.module('pizza', ['ngRoute']).config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/home.html'
	});
	$routeProvider.when('/menu', {
		templateUrl : 'views/menu.html'
	});
	$routeProvider.when('/build', {
		templateUrl : 'views/build.html'
	});
	$routeProvider.when('/contact', {
		templateUrl : 'views/contact.html'
	});
	$routeProvider.when('/game', {
		templateUrl : 'views/game.html'
	});
	$routeProvider.when('/checkout', {
		templateUrl : 'views/checkout.html'
	});
});
