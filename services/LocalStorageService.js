pizza.service('localStorageService', function($rootScope) {
	return {
		browserSupportsLocalStorage : function() {
			try {
				return ('localStorage' in window && window['localStorage'] !== null);
			} catch (e) {
				return false;
			}
		},

		add : function(key, value) {
			if (this.browserSupportsLocalStorage()) {
				if ( typeof value == "undefined") {
					value = null;
				}

				if (angular.isObject(value) || angular.isArray(value))
					value = angular.toJson(value);
				localStorage.setItem(key, value);
			}
		},

		get : function(key) {
			if (this.browserSupportsLocalStorage()) {
				var item = localStorage.getItem(key);
				if (item == null)
					return null;

				if (item.charAt(0) == "{" || item.charAt(0) == "[")
					return angular.fromJson(item);

				return item;
			}
		},
	};
});
