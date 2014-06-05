'use strict';

var ngOb = angular.module('ngOb', []);

ngOb.controller('App1Controller', ['$scope', 'ObserverService',
	function($scope, ObserverService) {
		$scope.notifications = ['nothing yet'];

		var myCB = function (notification) {
			$scope.$apply(function () {
				$scope.notifications.push('got ' + notification);
			});
		};

		ObserverService.subscribe(myCB);

		$scope.start = function() {
			ObserverService.start();
		};
	}
]);

ngOb.controller('App2Controller', ['$scope', 'ObserverService',
	function($scope, ObserverService) {
		$scope.notifications = ['longing for something'];

		var myCB = function (notification) {
			$scope.$apply(function () {
				$scope.notifications.push('recieved ' + notification);
			});
		};

		ObserverService.subscribe(myCB);

		$scope.update = function() {
			ObserverService.update('amazing info');
		}
	}
]);

ngOb.controller('App3Controller', ['$scope', 'ObserverService',
	function($scope, ObserverService) {
		$scope.notifications = ['ready for action'];

		var myCB = function (notification) {
			$scope.$apply(function () {
				$scope.notifications.push('was given ' + notification);
			});
		};

		ObserverService.subscribe(myCB);

		$scope.stop = function() {
			ObserverService.stop();
		};
	}
]);

ngOb.factory('ObserverService', function () {
	var observers = [];
	var myText = 'something special @';
	var interval = null;

	function twinkleToes() {
		for(var i = 0, j = observers.length; i < j; i++) {
			var observer = observers[i];

			observer(myText + ' ' + new Date());
		}
	}

	return {
		subscribe: function (cb) {
			observers.push(cb);
		},
		start: function() {
			interval = setInterval(twinkleToes, 1000);
		},
		stop: function() {
			clearInterval(interval);
		},
		update: function(text) {
			myText = text;
		}
	};
});
