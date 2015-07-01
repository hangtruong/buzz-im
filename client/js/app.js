/**
 * Created by joehua on 7/1/15.
 */
'use strict';

/* App Module */
// buzzApp = name in html tag: ng-app
var buzzApp = angular.module('buzzApp', [
    'ngRoute',
    'ngResource',
    'loginModule',
    'dashboardModule',
    'nicheModule'
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
            when('/niches', {
                templateUrl: 'partials/niche-list.html',
                controller: 'NicheListCtrl'
            }).
            when('/niches/:nicheCode', {
                templateUrl: 'partials/niche-detail.html',
                controller: 'NicheDetailController' +
                ''
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
