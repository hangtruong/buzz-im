/**
 * Created by joehua on 7/1/15.
 */

var nicheModule = angular.module('nicheModule', []);

nicheModule.controller('NicheListCtrl', ['$scope', 'nichesService',
    function ($scope, nichesService) {
        nichesService.query(function (data) {
            $scope.niches = data;
        });
    }]);

nicheModule.controller('NicheDetail', ['$scope',
    function ($scope) {
    }]);

nicheModule.factory("nichesService", function ($resource) {
    return $resource("http://localhost:3000/niches");
});