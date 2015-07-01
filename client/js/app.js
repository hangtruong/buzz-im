/**
 * Created by joehua on 7/1/15.
 */
'use strict';

/* App Module */
// buzzApp = name in html tag: ng-app
var buzzApp = angular.module('buzzApp', [
    'ngRoute',
    'loginModule'
]);

buzzApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            }).
            when('/dashboard', {
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
