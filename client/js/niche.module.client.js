/**
 * Created by joehua on 7/1/15.
 */

var nicheModule = angular.module('nicheModule', []);

nicheModule.controller('NicheListCtrl', ['$scope', 'nichesService',

    function ($scope, nichesService) {
        $scope.page = 1;
        $scope.itemsPerPage = 10;
        $scope.sortColumn = "name";
        $scope.sortDimension = "asc";

        $scope.load = function () {
            var queryParams = {
                page: $scope.page,
                itemsPerPage: $scope.itemsPerPage,
                sortColumn: $scope.sortColumn,
                sortDimension: $scope.sortDimension
            };

            nichesService.query(queryParams, function (data) {
                $scope.niches = data;
            });
        };

        $scope.load();
    }]);

nicheModule.controller('NicheDetail', ['$scope',
    function ($scope) {
    }]);

nicheModule.factory("nichesService", function ($resource) {
    var api_url = "http://localhost:3000/niches";
    return $resource(api_url);
});