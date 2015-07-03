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
        $scope.searchText = "";

        $scope.load = function () {
            $scope.page = 1;
            $scope.isEmpty = false;
            $scope.niches = [];
            $scope.scrollDown = 'Scroll down to see more items';
            var queryParams = {
                page: $scope.page,
                itemsPerPage: $scope.itemsPerPage,
                sortColumn: $scope.sortColumn,
                sortDimension: $scope.sortDimension,
                searchText: $scope.searchText
            };

            nichesService.query(queryParams, function (data) {
                if (data.length == 0) {
                    $scope.isEmpty = true;
                    return;
                }
                for (var i = 0; i < data.length; i++)
                    $scope.niches.push(data[i]);
            });
        };

        $scope.loadMore = function () {
            $scope.page = $scope.page + 1;
            var queryParams = {
                page: $scope.page,
                itemsPerPage: $scope.itemsPerPage,
                sortColumn: $scope.sortColumn,
                sortDimension: $scope.sortDimension,
                searchText: $scope.searchText
            };

            nichesService.query(queryParams, function (data) {
                if (data.length == 0) {
                    $scope.scrollDown = 'There\'s no more items';
                    return;
                }
                for (var i = 0; i < data.length; i++)
                    $scope.niches.push(data[i]);

            });
        }

        $scope.load();
    }]);

nicheModule.controller('NicheDetail', ['$scope',
    function ($scope) {
    }]);

nicheModule.factory("nichesService", function ($resource) {
    var api_url = "http://localhost:3000/niches";
    return $resource(api_url);
});