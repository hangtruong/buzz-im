/**
 * Created by joehua on 7/1/15.
 */
'use strict';

/* Controllers */
var loginModule = angular.module('loginModule', []);

loginModule.controller('LoginCtrl', ['$scope', '$location',
    function ($scope, $location) {
        //$scope.username = "abc";
        //$scope.password = "xyz";

        $scope.login = function () {
            if ($scope.username == "abc" && $scope.password == "xyz") {
                $location.path('/dashboard');
            }
            else $scope.notification = "Error";
        }
    }]);