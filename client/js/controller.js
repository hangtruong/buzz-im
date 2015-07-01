/**
 * Created by joehua on 7/1/15.
 */
'use strict';

/* Controllers */
var loginModule = angular.module('loginModule', []);

loginModule.controller('LoginCtrl', ['$scope', '$location',
    function ($scope, $location) {

        $scope.login = function () {
            var result = checkLogin($scope.username, $scope.password);
            console.log(result);
            if (result) {
                $location.path('/dashboard');
            }
            else $scope.notification = "Error";
        }

        var validCredentials = [
            {"username": "abc", "password": "xyz"},
            {"username": "xyz", "password": "abc"},
            {"username": "cba", "password": "111"}];

        function checkLogin(username, password) {
            return _.some(validCredentials, function (credential) {
                return username === credential.username && password === credential.password;
            });
        };
    }
]);

var dashboardModule = angular.module('dashboardModule', []);

dashboardModule.controller('DashboardCtrl', ['$scope',
    function ($scope) {
        $scope.dashboard = '1';
    }]);